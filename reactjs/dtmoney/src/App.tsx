import { useState } from 'react';
import { GlobalStyle } from './styles/global';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

export const App = () => {
  const [isNewTransationModalOpen, setIsNewTransationModalOpen] =
    useState(false);

  const handleOpenNewTransationModal = () => {
    setIsNewTransationModalOpen(true);
  };

  const handleCloseNewTransationModal = () => {
    setIsNewTransationModalOpen(false);
  };
  return (
    <TransactionsProvider>
      <Header onOpenNewTransationModal={handleOpenNewTransationModal} />
      <Dashboard />
      <NewTransactionModal
        isNewTransationModalOpen={isNewTransationModalOpen}
        onRequestClose={handleCloseNewTransationModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
};
