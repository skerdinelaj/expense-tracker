import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AllExpenses from "./AllExpenses";
import ManageExpense from "./ManageExpense";
import RecentExpenses from "./RecentExpenses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from "../constant/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../UI/IconButton";
import {
  RootStackParamList,
  BottomTabsParamList,
  ExpensesOverviewNavigationProp,
} from "./navigateTypes";

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

const Root = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  function ExpensesOverview() {
    return (
      <BottomTabs.Navigator
        screenOptions={({
          navigation,
        }: {
          navigation: ExpensesOverviewNavigationProp;
        }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
              name="add"
              size={24}
              color={tintColor}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: "All expenses",
            tabBarLabel: "All",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({});
