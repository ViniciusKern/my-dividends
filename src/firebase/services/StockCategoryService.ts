import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

import { StockCategory } from '../../types/stocks.types';
import { db } from '../firebase-config';

const CURRENCIES_BY_COUNTRY: Record<string, string> = {
  BR: 'R$',
  US: 'U$',
};

const EMOJIS: Record<string, string> = {
  BR: '🇧🇷',
  US: '🇺🇸',
};

class StockCategoryService {
  async list(): Promise<StockCategory[]> {
    const categoriesQuery = query(collection(db, 'stock_categories'), orderBy('country'));
    const data = await getDocs(categoriesQuery);

    return data.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        country: data.country,
        emoji: EMOJIS[data.country],
      };
    });
  }

  async create(name: string, country: StockCategory['country']) {
    const newCategory = await addDoc(collection(db, 'stock_categories'), { name, country });
    return newCategory;
  }

  async update(category: StockCategory) {
    const categoryDoc = doc(db, 'stock_categories', category.id);
    await updateDoc(categoryDoc, category);
  }

  async delete(id: string) {
    const categoryDoc = doc(db, 'stock_categories', id);
    await deleteDoc(categoryDoc);
  }

  currency(country: StockCategory['country']) {
    return CURRENCIES_BY_COUNTRY[country];
  }
}

export default new StockCategoryService();
