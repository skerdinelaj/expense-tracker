import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  storeExpense,
  getExpenses,
  deleteExpenseHelper,
  updateExpenseHelper,
} from "../../util/http";

export type ExpenseItems = {
  id?: string;
  description: string;
  amount: number;
  date: string;
};

export type ExpenseItemsList = {
  data: ExpenseItems[];
};

const initialState: ExpenseItemsList = {
  data: [],
};

export const fetchExpensesThunk = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await getExpenses();
    return response;
  }
);

export const addExpenseThunk = createAsyncThunk(
  "expenses/addExpenseAsync",
  async (expenseData: ExpenseItems) => {
    const response = await storeExpense(expenseData);
    return response;
  }
);

export const deleteExpenseThunk = createAsyncThunk(
  "expenses/deleteExpenseAsync",
  async (id: string) => {
    const response = await deleteExpenseHelper(id);
    return response;
  }
);

export const updateExpenseThunk = createAsyncThunk(
  "expenses/updateExpenseAsync",
  async (expenseData: ExpenseItems) => {
    const response = await updateExpenseHelper(expenseData);
    return response;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addExpenseThunk.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteExpenseThunk.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(updateExpenseThunk.fulfilled, (state, action) => {
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      });
  },
});

export default expensesSlice.reducer;
