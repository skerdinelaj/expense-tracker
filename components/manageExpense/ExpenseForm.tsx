import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "./Input";
import Button from "../../UI/Button";
import { ExpenseData } from "../../screens/ManageExpense";
import { formatedDate } from "../../util/date";
import { useState } from "react";

type InputValueType = {
  amount: string;
  date: string;
  description: string;
};

type ExpenseFormProps = {
  cancelHandler: () => void;
  isEdditing: boolean;
  onsubmit: (data: ExpenseData) => void;
  defaultValues: InputValueType | {};
};

const ExpenseForm = ({
  cancelHandler,
  isEdditing,
  onsubmit,
  defaultValues,
}: ExpenseFormProps) => {
  const [inputValue, setInputValue] = useState<InputValueType>({
    amount: defaultValues?.hasOwnProperty("amount")
      ? (defaultValues as InputValueType)?.amount.toString()
      : "",
    date: defaultValues?.hasOwnProperty("date")
      ? formatedDate(new Date((defaultValues as InputValueType)?.date)).slice(
          0,
          10
        )
      : "",
    description: defaultValues?.hasOwnProperty("description")
      ? (defaultValues as InputValueType)?.description
      : "",
  });

  function inputChangedHandler(inputIdentifier: string, enteredText: string) {
    setInputValue((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredText };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: formatedDate(new Date(inputValue.date)),
      description: inputValue.description,
    };

    const amounntIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amounntIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid Input", "Please check your entered data.", [
        { text: "Okay" },
      ]);
      return;
    }
    onsubmit(expenseData);
  }

  console.log(inputValue);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={inputChangedHandler.bind(this, "amount")}
          value={inputValue.amount}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={inputChangedHandler.bind(this, "date")}
          value={inputValue.date}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        multiline={true}
        onChangeText={inputChangedHandler.bind(this, "description")}
        value={inputValue.description}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button onPress={submitHandler}>{isEdditing ? "Update" : "Add"}</Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
  inputValidation: {
    borderColor: "red",
    borderBottomWidth: 2,
    borderRadius: 6,
  },
});
