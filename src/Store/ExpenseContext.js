import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (data) => {},
  deleteExpense: () => {},
  isLoading: false,
});

export const ExpenseContextProvider = (props) => {
  const [expense, setExpense] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addExpenseHandler = async (item) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://expense-tracker-bd985-default-rtdb.firebaseio.com/expense.json",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        let errorMessage = await response.json();
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setExpense((prevExpense) => {
        return [...prevExpense, item];//don't depend on response [..prevExp, data] data is response was creating err
      });
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-bd985-default-rtdb.firebaseio.com/expense.json"
        );
        if (!response.ok) {
          let errorMessage = await response.json();
          throw new Error(errorMessage);
        }
        const data = await response.json();
        let expenseArr = [];
        for (let key in data) {
          expenseArr.push({
            id: key,
            ...data[key],
          });
        }
        setExpense(expenseArr);
        setIsLoading(false);
      } catch (error) {
        alert("error Occurred!!");
        console.log(error);
      }
    };
    fetchExpenses();
  }, []);

  const deleteExpenseHandler = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-bd985-default-rtdb.firebaseio.com/expense.json",
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        let err = await response.json();
        throw new Error(err);
      }
      setExpense([]);
    } catch (error) {
      alert("failed To Delete!!");
      console.log(error);
    }
  };

  const ExpContextValue = {
    expenses: expense,
    isLoading: isLoading,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
  };
  return (
    <>
      <ExpenseContext.Provider value={ExpContextValue}>
        {props.children}
      </ExpenseContext.Provider>
    </>
  );
};

export default ExpenseContext;
