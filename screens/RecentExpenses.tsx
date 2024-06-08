import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensiveOutput from "../components/expensiveOutput/ExpenseOutput";

const RecentExpenses = () => {
  return <ExpensiveOutput expenses={[]} periodExpensive="Last 7 days" />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
