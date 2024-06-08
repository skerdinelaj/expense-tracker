import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import { GlobalStyles } from "../../constant/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some Bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-14"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

export type ExpenseItems = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export type ExpenseOutputProps = {
  expenses: ExpenseItems[];
  periodExpensive: string;
};

const ExpensiveOutput = ({ expenses, periodExpensive }: ExpenseOutputProps) => {
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={periodExpensive} />
      <ExpenseList
        expenses={DUMMY_EXPENSES}
        periodExpensive={periodExpensive}
      />
    </View>
  );
};

export default ExpensiveOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
