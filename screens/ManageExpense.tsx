import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import Button from "../UI/Button";
import { ManageExpenseProps } from "./navigateTypes";

const ManageExpense = ({ route, navigation }: ManageExpenseProps) => {
  const expenseId = route.params?.expenseId;
  const isEdditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdditing]);

  function deleteExpenseHandler() {
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button onPress={confirmHandler}>
          {isEdditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});