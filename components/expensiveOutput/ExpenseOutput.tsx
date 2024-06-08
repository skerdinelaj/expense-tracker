import { StyleSheet, View, Text } from "react-native";
import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import { GlobalStyles } from "../../constant/styles";
import { ExpenseItems } from "../../store/redux/expensesSlice";

export type ExpenseOutputProps = {
  expenses: ExpenseItems[];
  periodExpensive: string;
  fallBackText: string;
};

const ExpensiveOutput = ({
  expenses,
  periodExpensive,
  fallBackText,
}: ExpenseOutputProps) => {
  let content = <Text style={styles.fallBackText}>{fallBackText}</Text>;

  if (expenses.length > 0) {
    content = (
      <ExpenseList
        fallBackText={fallBackText}
        expenses={expenses}
        periodExpensive={periodExpensive}
      />
    );
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary
        fallBackText={fallBackText}
        expenses={expenses}
        periodExpensive={periodExpensive}
      />
      {content}
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
  fallBackText: {
    color: GlobalStyles.colors.primary200,
    fontSize: 16,
    textAlign: "center",
  },
});
