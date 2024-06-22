import axios from "axios";
import { ExpenseItems } from "../store/redux/expensesSlice";

export const BACKEND_URL =
  "https://expense-app-56f88-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (
  expenseData: ExpenseItems
): Promise<ExpenseItems> => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  return { ...expenseData, id: response.data.id };
};

export const getExpenses = async (): Promise<ExpenseItems[]> => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses: ExpenseItems[] = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      description: response.data[key].description,
      amount: response.data[key].amount,
      date: response.data[key].date,
    };
    expenses.push(expenseObj);
  }
  return expenses;
};

export const updateExpenseHelper = async (
  expenseData: ExpenseItems
): Promise<ExpenseItems> => {
  const { id, ...data } = expenseData;
  await axios.put(BACKEND_URL + `/expenses/${id}.json`, data);
  return expenseData;
};

export const deleteExpenseHelper = async (id: string): Promise<string> => {
  await axios.delete(BACKEND_URL + `/expenses/${id}.json`);
  return id;
};
