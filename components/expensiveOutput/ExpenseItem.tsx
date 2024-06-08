import { Pressable, StyleSheet, Text, View } from "react-native";
import { ExpenseItems } from "../../store/redux/expensesSlice";
import { GlobalStyles } from "../../constant/styles";
import { useNavigation } from "@react-navigation/native";
import { ExpensesOverviewNavigationProp } from "../../screens/navigateTypes";
import { formatedDate } from "../../util/date";

type ExpenseItemProps = {
  item: ExpenseItems;
};

const ExpenseItem = ({ item }: ExpenseItemProps) => {
  const navigation = useNavigation<ExpensesOverviewNavigationProp>();
  function expensePressHandler() {
    navigation.navigate("ManageExpense", { expenseId: item.id });
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.description, styles.textBase]}>
            {item.description}
          </Text>
          <Text style={styles.textBase}>{item.date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
