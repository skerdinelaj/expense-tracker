import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensiveOutput from "../components/expensiveOutput/ExpenseOutput";

const AllExpenses = () => {
  return <ExpensiveOutput expenses={[]} periodExpensive="All" />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
