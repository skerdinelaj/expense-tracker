import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

// Define types for the bottom tabs
export type BottomTabsParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

// Define types for the root stack
export type RootStackParamList = {
  ExpensesOverview: NavigatorScreenParams<BottomTabsParamList>;
  ManageExpense: { expenseId?: string } | undefined;
};

// Define navigation prop types
export type ExpensesOverviewNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

type ManageExpenseRouteProp = RouteProp<RootStackParamList, "ManageExpense">;

// Props for ManageExpense component
export type ManageExpenseProps = {
  route: ManageExpenseRouteProp;
  navigation: ExpensesOverviewNavigationProp;
};
