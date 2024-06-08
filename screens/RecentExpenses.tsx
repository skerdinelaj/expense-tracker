import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensiveOutput from "../components/expensiveOutput/ExpenseOutput";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";

const RecentExpenses = () => {
  const expensesSelector = useSelector(
    (state: RootState) => state.expenses.data
  );

  const lastSevenDaysExpenses = expensesSelector.filter((item) => {
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
