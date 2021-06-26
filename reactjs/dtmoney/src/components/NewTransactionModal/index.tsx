import { useState, FormEvent, ChangeEvent } from 'react';
import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './style';
import closeImage from '../../assets/close.svg';
import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import { api } from '../../services/api';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isNewTransationModalOpen: boolean;
  onRequestClose: () => void;
}

interface TransactionsInformations {
  title: string;
  amount: number;
  category: string;
  type: string;
}

export const NewTransactionModal = ({
  isNewTransationModalOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const [transactionsInformations, setTransactionsInformations] =
    useState<TransactionsInformations>({
      title: '',
      category: '',
      amount: 0,
      type: 'deposit',
    });

  const handleTransactionsInformations = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === value) {
      setTransactionsInformations({
        ...transactionsInformations,
        [name]: Number(value),
      });
    } else {
      setTransactionsInformations({
        ...transactionsInformations,
        [name]: value,
      });
    }
  };

  const handleCreateNewTransactions = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      ...transactionsInformations,
      createdAt: new Date().toJSON(),
    };
    api.post('transactions', data);
  };

  return (
    <Modal
      isOpen={isNewTransationModalOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImage} alt="fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransactions}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          name="title"
          value={transactionsInformations.title}
          onChange={handleTransactionsInformations}
        />

        <input
          type="number"
          placeholder="Valor"
          name="value"
          value={transactionsInformations.amount}
          onChange={handleTransactionsInformations}
        />

        <TransactionTypeContainer>
          <RadioBox
            onClick={() => {
              setTransactionsInformations({
                ...transactionsInformations,
                type: 'deposit',
              });
            }}
            type="button"
            isActive={transactionsInformations.type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImage} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            onClick={() => {
              setTransactionsInformations({
                ...transactionsInformations,
                type: 'withdraw',
              });
            }}
            type="button"
            isActive={transactionsInformations.type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImage} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          name="category"
          value={transactionsInformations.category}
          onChange={handleTransactionsInformations}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
