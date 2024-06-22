import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
