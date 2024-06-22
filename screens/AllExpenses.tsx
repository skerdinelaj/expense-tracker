import { useEffect } from "react";
import ExpensiveOutput from "../components/expensiveOutput/ExpenseOutput";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";
import { AppDispatch } from "../store/redux/store";
import { fetchExpensesThunk } from "../store/redux/expensesSlice";
import { useDispatch } from "react-redux";

const AllExpenses = () => {
  const expensesSelector = useSelector(
    (state: RootState) => state.expenses.data
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExpensesThunk());
  }, [dispatch]);

  return (
    <ExpensiveOutput
      fallBackText="No expenses registered"
      expenses={expensesSelector}
      periodExpensive="All"
    />
  );
};

export default AllExpenses;
