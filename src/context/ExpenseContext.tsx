import React, { createContext, useContext, useState, useEffect } from "react";
import { TOTAL_INCOME } from "@/lib/statsConstants";

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
}

interface ExpenseContextType {
  totalIncome: number;
  setTotalIncome: (amount: number) => void;
  totalExpenseManual: number | null;
  setTotalExpenseManual: (amount: number | null) => void;
  expenses: Expense[];
  updateExpense: (id: string, amount: number, description: string) => void;
  resetExpenses: () => void;
  getTotalExpense: () => number;
  getSubtotal: () => number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

const DEFAULT_EXPENSES: Expense[] = [
  { id: "1", category: "অন্যান্য", description: "", amount: 0 },
];

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalIncome, setTotalIncome] = useState<number>(TOTAL_INCOME);
  const [totalExpenseManual, setTotalExpenseManual] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>(DEFAULT_EXPENSES);

  // Load from localStorage on mount
  useEffect(() => {
    // Clear any old manual expense values to ensure clean calculation
    localStorage.removeItem("total_expense_manual");
    setTotalExpenseManual(null);
    
    // Always use DEFAULT_EXPENSES to avoid accumulating old data
    setExpenses(DEFAULT_EXPENSES);
  }, []);

  // Save manual expense when it changes
  useEffect(() => {
    if (totalExpenseManual === null) {
      localStorage.removeItem("total_expense_manual");
    } else {
      localStorage.setItem("total_expense_manual", totalExpenseManual.toString());
    }
  }, [totalExpenseManual]);

  const updateExpense = (id: string, amount: number, description: string) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === id ? { ...exp, amount, description } : exp
      )
    );
  };

  const resetExpenses = () => {
    setExpenses(DEFAULT_EXPENSES);
  };

  const getTotalExpense = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getSubtotal = () => {
    const expenseToUse = totalExpenseManual !== null ? totalExpenseManual : getTotalExpense();
    return totalIncome - expenseToUse;
  };

  return (
    <ExpenseContext.Provider
      value={{
        totalIncome,
        setTotalIncome,
        totalExpenseManual,
        setTotalExpenseManual,
        expenses,
        updateExpense,
          resetExpenses,
        getTotalExpense,
        getSubtotal,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within ExpenseProvider");
  }
  return context;
};
