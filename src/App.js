import React, { useContext } from "react";
import AuthForm from "./Pages/AuthForm";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthContext from "./Store/AuthContext";

const App = () => {
  const authCxt = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          {authCxt.isLoggedIn ? <HomePage/> : <Redirect to='/auth'/>}
        </Route>
        {!authCxt.isLoggedIn && (
          <Route path="/auth">
            <AuthForm />
          </Route>
        )}
      </Switch>
    </>
  );
};

export default App;
