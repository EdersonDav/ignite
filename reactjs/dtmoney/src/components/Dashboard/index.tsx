import { Sumary } from '../Sumary';
import { TransactionsTable } from '../TransactionsTable';
import { Container } from './style';

export const Dashboard = () => {
  return (
    <Container>
      <Sumary />
      <TransactionsTable />
    </Container>
  );
};
