import React from "react";
import ExpensiveOutput from "../components/expensiveOutput/ExpenseOutput";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";

const AllExpenses = () => {
  const expensesSelector = useSelector(
    (state: RootState) => state.expenses.data
  );

  return (
    <ExpensiveOutput
      fallBackText="No expenses registered"
      expenses={expensesSelector}
      periodExpensive="All"
    />
  );
};

export default AllExpenses;
