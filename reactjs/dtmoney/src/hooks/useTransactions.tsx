import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import { api } from '../services/api';

interface Transactions {
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
  id: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<Transactions, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transactions[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.get('transactions');
      setTransactions(transactions.data.transactions);
    };
    getTransactions();
  }, []);

  const createTransaction = async (transactionInput: TransactionInput) => {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  return context;
};
