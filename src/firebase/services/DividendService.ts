import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Dividend } from '../../types/dividends.type';
import { Stock } from '../../types/stocks.types';
import { stringToDate } from '../../utils/dateUtils';
import { auth, db } from '../firebase-config';
import StockCategoryService from './StockCategoryService';
import StockService from './StockService';

class DividendService {
  async list(): Promise<Dividend[]> {
    const dividendsQuery = query(
      collection(db, 'dividends'),
      where('userId', '==', auth.currentUser?.uid)
    );

    const data = await getDocs(dividendsQuery);

    const stocks = await StockService.list();

    return data.docs.map(doc => this.mapToDividend(doc.id, doc.data(), stocks));
  }

  async get(id: string): Promise<Dividend | null> {
    const docSnap = await getDoc(doc(db, 'dividends', id));
    const data = docSnap.data();

    if (!data) {
      return null;
    }

    const stocks = await StockService.list();
    return this.mapToDividend(docSnap.id, data, stocks);
  }

  async create(stock: Stock, paymentDateValue: string, cashAmount: number) {
    const newDividend = await addDoc(collection(db, 'dividends'), {
      paymentDate: stringToDate(paymentDateValue),
      cashAmount,
      currency: StockCategoryService.currency(stock.category?.country ?? 'BR'),
      stock: doc(db, `stocks/${stock.id}`),
      userId: auth.currentUser?.uid,
    });
    return newDividend;
  }

  async update(id: string, paymentDateValue: string, cashAmount: number) {
    const dividendDoc = doc(db, 'dividends', id);

    await updateDoc(dividendDoc, {
      paymentDate: stringToDate(paymentDateValue),
      cashAmount: cashAmount,
    });
  }

  async delete(id: string) {
    const dividendDoc = doc(db, 'dividends', id);
    await deleteDoc(dividendDoc);
  }

  private mapToDividend(id: string, data: DocumentData, stocks: Stock[]): Dividend {
    return {
      id,
      paymentDate: data.paymentDate.toDate(),
      cashAmount: Number(data.cashAmount).toFixed(2),
      currency: data.currency,
      stock: stocks.find(stock => stock.id === data.stock.id),
    };
  }
}

export default new DividendService();
