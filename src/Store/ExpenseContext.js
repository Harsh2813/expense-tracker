import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (data) => {},
  deleteExpense: () => {},
  isLoading: false,
  deleteParticularExpense: (id) => {},
  editExpense: (id, newData) => {},
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
        return [...prevExpense, {id: data.name, ...item}];//don't depend on response [..prevExp, data] data is response was creating err and we taken id as name which we getting in response for deleting perticular item
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
        console.log(data);
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

  const deleteParticularExpenseHandler = async(id) => {
    try{
        const response = await fetch(`https://expense-tracker-bd985-default-rtdb.firebaseio.com/expense/${id}.json`, {
            method: 'DELETE',
        })
        if(!response.ok){
            const errorMessage = await response.json();
            throw new Error(errorMessage);
        }
        setExpense((prevExpense) => prevExpense.filter((item) => item.id !== id));
    }catch(error){
        console.log(error);
        alert('cant delete this');
    }
  };

  const editExpenseHandler = async (id, newData) => {
    try {
      const response = await fetch(
        `https://expense-tracker-bd985-default-rtdb.firebaseio.com/expense/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(newData),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        let err = await response.json();
        throw new Error(err);
      }
      setExpense((prevExpense) =>
        prevExpense.map((item) => (item.id === id ? { ...item, ...newData } : item))
      );
    } catch (error) {
      alert("failed To Edit!!");
      console.log(error);
    }
  };

  const ExpContextValue = {
    expenses: expense,
    isLoading: isLoading,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    deleteParticularExpense: deleteParticularExpenseHandler,
    editExpense: editExpenseHandler,
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
