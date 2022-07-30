import {
  collection,
  addDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  getDocs,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { Stock, StockCategory } from '../../types/stocks.types';
import { db, storage } from '../firebase-config';
import StockCategoryService from './StockCategoryService';

class StockService {
  private stocksCache: Stock[] | null = null;

  async list(): Promise<Stock[]> {
    if (!this.stocksCache) {
      this.stocksCache = await this.loadStocks();
    }

    return this.stocksCache;
  }

  async search(searchTerm: string): Promise<Stock[]> {
    const stocks = await this.list();

    return stocks.filter(
      stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async get(id: string): Promise<Stock | null> {
    const docSnap = await getDoc(doc(db, 'stocks', id));
    const data = docSnap.data();

    if (!data) {
      return null;
    }

    const categories = await StockCategoryService.list();
    return this.mapToStock(docSnap.id, data, categories);
  }

  async create(name: string, ticker: string, categoryId: string, logo: string | File) {
    if (logo instanceof File) {
      logo = await this.uploadLogo(logo);
    }

    const newCategory = await addDoc(collection(db, 'stocks'), {
      name,
      ticker: ticker.toUpperCase(),
      logo,
      category: doc(db, `stock_categories/${categoryId}`),
    });

    this.stocksCache = null;

    return newCategory;
  }

  async update(
    id: string,
    stock: {
      name: string;
      ticker: string;
      categoryId: string;
      logo: string | File;
    }
  ) {
    if (stock.logo instanceof File) {
      stock.logo = await this.uploadLogo(stock.logo);
    }

    const stockDoc = doc(db, 'stocks', id);

    await updateDoc(stockDoc, {
      name: stock.name,
      ticker: stock.ticker.toUpperCase(),
      logo: stock.logo,
      category: doc(db, 'stock_categories', stock.categoryId),
    });

    this.stocksCache = null;
  }

  async uploadLogo(image: File) {
    const imageRef = ref(storage, `stock_logos/${v4()}`);

    const snapshot = await uploadBytes(imageRef, image);

    return getDownloadURL(snapshot.ref);
  }

  private async loadStocks(): Promise<Stock[]> {
    const stocksQuery = query(collection(db, 'stocks'), orderBy('name'));
    const data = await getDocs(stocksQuery);

    const categories = await StockCategoryService.list();

    return data.docs.map(doc => this.mapToStock(doc.id, doc.data(), categories));
  }

  private mapToStock(id: string, data: DocumentData, categories: StockCategory[]): Stock {
    return {
      id,
      name: data.name,
      ticker: data.ticker,
      logo: data.logo && data.logo.length ? data.logo : null,
      category: categories.find(category => category.id === data.category.id),
    };
  }
}

export default new StockService();
