import { timeZoneCurrencies } from './constants';
declare global {
  type Mapped<T> = T extends object ? { [Key in keyof T]: Mapped<T[Key]> } : T;

  type Children = Readonly<{
    children: React.ReactNode;
  }>;

  type TransactionType = 'income' | 'expense';
  type ChartTabs = 'month' | 'year';
  type ChartType = 'area' | 'bar';

  type Period = {
    month: number;
    year: number;
  };

  type Transaction = {
    id: string;
    category: string;
    description: string;
    date: string;
    type: TransactionType;
    amount: string;
  };
}

export type TimeZoneCurrencies = keyof typeof timeZoneCurrencies;

export {};
