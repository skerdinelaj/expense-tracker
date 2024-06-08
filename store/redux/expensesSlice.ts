import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: "2021-12-19",
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: "2022-01-05",
  },
  {
    id: "e3",
    description: "Some Bananas",
    amount: 5.99,
    date: "2021-12-01",
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: "2022-02-14",
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: "2024-06-07",
  },
];

export type ExpenseItems = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

export type ExpenseItemsList = {
  data: ExpenseItems[];
};

const initialState: ExpenseItemsList = {
  data: [...DUMMY_EXPENSES],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseItems>) => {
      state.data.push(action.payload);
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateExpense: (state, action: PayloadAction<ExpenseItems>) => {
      const expenseIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (expenseIndex > -1) {
        state.data[expenseIndex] = action.payload;
      }
    },
  },
});

export const { addExpense, deleteExpense, updateExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
