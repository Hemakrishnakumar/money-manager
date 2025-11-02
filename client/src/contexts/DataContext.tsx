import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense' | 'investment';
  category: string;
  description: string;
  date: string;
  accountId: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  color: string;
}

interface DataContextType {
  transactions: Transaction[];
  accounts: Account[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const MOCK_ACCOUNTS: Account[] = [
  { id: '1', name: 'Main Checking', type: 'checking', balance: 4250.50, color: 'blue' },
  { id: '2', name: 'Savings', type: 'savings', balance: 12000, color: 'green' },
  { id: '3', name: 'Credit Card', type: 'credit', balance: -850, color: 'orange' },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', amount: 3200, type: 'income', category: 'Salary', description: 'Monthly salary', date: '2025-10-25', accountId: '1' },
  { id: '2', amount: -45.50, type: 'expense', category: 'Food', description: 'Grocery shopping', date: '2025-10-28', accountId: '1' },
  { id: '3', amount: -120, type: 'expense', category: 'Entertainment', description: 'Netflix subscription', date: '2025-10-29', accountId: '3' },
  { id: '4', amount: -65, type: 'expense', category: 'Transport', description: 'Uber rides', date: '2025-10-30', accountId: '1' },
  { id: '5', amount: 500, type: 'investment', category: 'Stocks', description: 'ETF purchase', date: '2025-10-27', accountId: '2' },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedAccounts = localStorage.getItem('accounts');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(MOCK_TRANSACTIONS);
    }
    
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      setAccounts(MOCK_ACCOUNTS);
    }
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    const updated = transactions.map(t => t.id === id ? { ...t, ...transaction } : t);
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = { ...account, id: Date.now().toString() };
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    localStorage.setItem('accounts', JSON.stringify(updated));
  };

  const updateAccount = (id: string, account: Partial<Account>) => {
    const updated = accounts.map(a => a.id === id ? { ...a, ...account } : a);
    setAccounts(updated);
    localStorage.setItem('accounts', JSON.stringify(updated));
  };

  const deleteAccount = (id: string) => {
    const updated = accounts.filter(a => a.id !== id);
    setAccounts(updated);
    localStorage.setItem('accounts', JSON.stringify(updated));
  };

  return (
    <DataContext.Provider value={{
      transactions,
      accounts,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addAccount,
      updateAccount,
      deleteAccount,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
