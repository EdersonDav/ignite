import { Container } from './style';
import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import totalImage from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export const Sumary = () => {
  const { transactions } = useTransactions();

  const balance = transactions.reduce(
    (acumulator, transaction) => {
      console.log(transaction);

      if (transaction.type === 'deposit') {
        acumulator.deposits += transaction.amount;
        acumulator.total += transaction.amount;
      } else {
        acumulator.withdraws += transaction.amount;
        acumulator.total -= transaction.amount;
      }
      return acumulator;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    },
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImage} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImage} alt="Saidas" />
        </header>
        <strong>
          -{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImage} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.total)}
        </strong>
      </div>
    </Container>
  );
};
