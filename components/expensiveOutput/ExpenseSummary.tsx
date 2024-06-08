import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";

const ExpenseSummary = ({ expenses, periodName }: any) => {
  const expensesTotal = expenses.reduce((acc: number, cur: any) => {
    return acc + cur.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesTotal.toFixed(2)}</Text>
    </View>
  );
};

export default ExpenseSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 6,
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
