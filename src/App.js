import React, { useContext } from "react";
import AuthForm from "./Pages/AuthForm";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthContext from "./Store/AuthContext";
import UserProfile from "./Pages/UserProfile";
import VerifyPasswordChange from "./Pages/VerifyPasswordChange";
import ExpenseTrack from "./Components/ExpenseList.js/ExpenseTrack";

const App = () => {
  const authCxt = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          {authCxt.isLoggedIn ? <HomePage/> : <Redirect to='/auth'/>}
        </Route>
        <Route path='/profile'>
          {authCxt.isLoggedIn ? <UserProfile/> : <Redirect to='/auth'/>}
        </Route>
        <Route path='/trackExpense'>
          {authCxt.isLoggedIn ? <ExpenseTrack/> : <Redirect to='/auth'/>}
        </Route>
        {!authCxt.isLoggedIn && (
          <Route path="/auth">
            <AuthForm />
          </Route>
        )}
        {!authCxt.isLoggedIn && (
          <Route path="/verifyPasswordChange">
            <VerifyPasswordChange />
          </Route>
        )}
      </Switch>
    </>
  );
};

export default App;
