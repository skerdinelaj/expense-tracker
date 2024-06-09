import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import { ManageExpenseProps } from "./navigateTypes";
import { useDispatch } from "react-redux";
import {
  deleteExpense,
  updateExpense,
  addExpense,
} from "../store/redux/expensesSlice";
import { AppDispatch } from "../store/redux/store";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";

export type ExpenseData = {
  amount: number;
  date: string;
  description: string;
};

const ManageExpense = ({ route, navigation }: ManageExpenseProps) => {
  const expenseId = route.params?.expenseId;
  const isEdditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdditing]);
  const dispatch = useDispatch<AppDispatch>();
  function deleteExpenseHandler() {
    if (expenseId === undefined) {
      return;
    } else {
      dispatch(deleteExpense(expenseId));
    }
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  const selectedExpense = useSelector((state: RootState) => {
    return state.expenses.data.find((expense) => {
      return expense.id === expenseId;
    });
  });

  function confirmHandler(expenseData: ExpenseData) {
    if (isEdditing) {
      dispatch(updateExpense({ id: expenseId, ...expenseData }));

      console.log("update expense", expenseId, expenseData);
    } else {
      dispatch(addExpense({ ...expenseData, id: Math.random().toString() }));
      console.log("add expense", expenseData, Math.random().toString());
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEdditing={isEdditing}
        onsubmit={confirmHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedExpense || {}}
      />
      {isEdditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            onPress={deleteExpenseHandler}
            name="trash"
            size={24}
            color={GlobalStyles.colors.error500}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
