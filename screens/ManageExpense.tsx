import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import { ManageExpenseProps } from "./navigateTypes";
import { AppDispatch, RootState } from "../store/redux/store";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import {
  addExpenseThunk,
  deleteExpenseThunk,
  updateExpenseThunk,
  fetchExpensesThunk,
  ExpenseItems,
} from "../store/redux/expensesSlice";

const ManageExpense = ({ route, navigation }: ManageExpenseProps) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const dispatch = useDispatch<AppDispatch>();
  const expenses = useSelector((state: RootState) => state.expenses.data);

  useEffect(() => {
    dispatch(fetchExpensesThunk());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    if (expenseId) {
      dispatch(deleteExpenseThunk(expenseId));
      navigation.goBack();
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  const confirmHandler = (expenseData: ExpenseItems) => {
    if (isEditing) {
      dispatch(updateExpenseThunk({ id: expenseId, ...expenseData }));
    } else {
      dispatch(addExpenseThunk(expenseData));
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onSubmit={confirmHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedExpense || {}}
      />
      {isEditing && (
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
