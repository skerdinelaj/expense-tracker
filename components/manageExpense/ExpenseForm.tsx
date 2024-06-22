import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../../UI/Button";
import { formatedDate } from "../../util/date";
import { ExpenseItems } from "../../store/redux/expensesSlice";

type InputValueType = {
  amount: string;
  date: string;
  description: string;
};

type InputField = {
  value: string;
  isValid: boolean;
};

type InputValueWithValidation = {
  amount: InputField;
  date: InputField;
  description: InputField;
};

type ExpenseFormProps = {
  cancelHandler: () => void;
  isEditing: boolean;
  onSubmit: (data: ExpenseItems) => void;
  defaultValues: InputValueType | {};
};

const ExpenseForm = ({
  cancelHandler,
  isEditing,
  onSubmit,
  defaultValues,
}: ExpenseFormProps) => {
  const [inputValues, setInputValues] = useState<InputValueWithValidation>({
    amount: {
      value: defaultValues?.hasOwnProperty("amount")
        ? (defaultValues as InputValueType).amount.toString()
        : "",
      isValid: true,
    },
    date: {
      value: defaultValues?.hasOwnProperty("date")
        ? formatedDate(new Date((defaultValues as InputValueType).date)).slice(
            0,
            10
          )
        : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.hasOwnProperty("description")
        ? (defaultValues as InputValueType).description
        : "",
      isValid: true,
    },
  });

  function inputChangedHandler(
    inputIdentifier: keyof InputValueType,
    enteredText: string
  ) {
    setInputValues((prevState) => {
      const updatedField = {
        ...prevState[inputIdentifier],
        value: enteredText,
        isValid: true,
      };
      return { ...prevState, [inputIdentifier]: updatedField };
    });
  }

  function submitHandler() {
    const expenseData: ExpenseItems = {
      amount: +inputValues.amount.value,
      date: inputValues.date.value, // Ensure date is a string
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      new Date(expenseData.date).toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((prevState) => ({
        amount: { ...prevState.amount, isValid: amountIsValid },
        date: { ...prevState.date, isValid: dateIsValid },
        description: { ...prevState.description, isValid: descriptionIsValid },
      }));
      Alert.alert("Invalid Input", "Please check your entered data.", [
        { text: "Okay" },
      ]);
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={inputChangedHandler.bind(this, "amount")}
          value={inputValues.amount.value}
          style={[
            styles.rowInput,
            !inputValues.amount.isValid && styles.invalidInput,
          ]}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={inputChangedHandler.bind(this, "date")}
          value={inputValues.date.value}
          style={[
            styles.rowInput,
            !inputValues.date.isValid && styles.invalidInput,
          ]}
        />
      </View>
      <Input
        label="Description"
        multiline={true}
        onChangeText={inputChangedHandler.bind(this, "description")}
        value={inputValues.description.value}
        style={!inputValues.description.isValid && styles.invalidInput}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button onPress={submitHandler}>{isEditing ? "Update" : "Add"}</Button>
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
  invalidInput: {
    borderColor: "red",
    borderBottomWidth: 2,
  },
});
