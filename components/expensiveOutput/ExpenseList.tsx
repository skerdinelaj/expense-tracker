import { StyleSheet, FlatList } from "react-native";
import { ExpenseOutputProps } from "./ExpenseOutput";
import ExpoenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }: ExpenseOutputProps) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpoenseItem item={item} />}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({});
