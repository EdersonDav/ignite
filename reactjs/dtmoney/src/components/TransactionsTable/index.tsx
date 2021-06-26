import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './style';

interface TransactionsProps {
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
  id: string;
}

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.get('transactions');
      setTransactions(transactions.data.transactions);
    };
    getTransactions();
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Date(transaction.createdAt).toLocaleDateString('pt-BR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
