import { StyleSheet, FlatList } from "react-native";
import { ExpenseOutputProps } from "./ExpenseOutput";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }: ExpenseOutputProps) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <ExpenseItem item={item} />}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({});
