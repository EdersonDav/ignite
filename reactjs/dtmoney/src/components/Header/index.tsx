import logo from '../../assets/logo.svg';
import { Container, Content } from './style';

interface HeaderProps {
  onOpenNewTransationModal: () => void;
}

export const Header = ({ onOpenNewTransationModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="dt money" />
        <button type="button" onClick={onOpenNewTransationModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};
