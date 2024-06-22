import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import ExpensiveOutput from "../components/expensiveOutput/ExpenseOutput";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/redux/store";
import { fetchExpensesThunk } from "../store/redux/expensesSlice";
import { RootState } from "../store/redux/store";

const RecentExpenses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const expenses = useSelector((state: RootState) => state.expenses.data);

  useEffect(() => {
    dispatch(fetchExpensesThunk());
  }, [dispatch]);

  const lastSevenDaysExpenses = expenses.filter((item) => {
    const today = new Date();
    const date7DaysAgo = new Date(today.setDate(today.getDate() - 7));
    const itemDate = new Date(item.date);
    return itemDate >= date7DaysAgo && itemDate >= today;
  });
  return (
    <ExpensiveOutput
      fallBackText="No expenses registered for the last 7 days"
      expenses={lastSevenDaysExpenses}
      periodExpensive="Last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
