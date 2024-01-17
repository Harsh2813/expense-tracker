import React, { useState, useRef, useContext } from "react";
import ErrorModal from "../Components/UI/ErrorModal";
import "./AuthForm.css";
import AuthContext from "../Store/AuthContext";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const [login, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const authCxt = useContext(AuthContext);
  const history = useHistory();

  const passwordRef = useRef("");
  const emailRef = useRef("");
  const confirmPassRef = useRef("");

  const switchAuthModeHandler = () => {
    setLogin((prevState) => !prevState);
  };
  const closeErrorHandler = () => {
    setError(null);
  };

  const validateInputs = (password, confirmPass, isLogin) => {
    if (isLogin && password.trim().length < 6) {
      return {
        title: "Invalid input",
        message: "Please enter a password with a minimum of 6 characters",
      };
    }
    if (!isLogin && password.trim().length < 6) {
      return {
        title: "Invalid input",
        message: "Please enter a password with a minimum of 6 characters",
      };
    }
    if (!isLogin && password !== confirmPass) {
      return {
        title: "Invalid password",
        message: "Password should be the same as confirm password",
      };
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPass = confirmPassRef.current.value;

    const inputError = validateInputs(
      enteredPassword,
      enteredConfirmPass,
      login
    );

    if (inputError) {
      setError(inputError);
      return;
    }
    closeErrorHandler();

    setIsLoading(true);
    try {
      let url;
      if (login) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1QTiD2WAjTJB-k-WnIHq5acACBf5EVko";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1QTiD2WAjTJB-k-WnIHq5acACBf5EVko";
      }
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        let errorMessage = "Authentication Failed!";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      authCxt.login(data.idToken, data.email);
      history.replace('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
      if(!login){
        console.log("User has Successfully Signed Up!")
      }
    }
  };

  return (
    <>
      <section>
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onConfirm={closeErrorHandler}
          />
        )}
        <h1 className="heading">{login ? "LogIn" : "SignUp"}</h1>
        <form onSubmit={formSubmitHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" ref={emailRef} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" ref={passwordRef} required />
          </div>
          {!login && (
            <div>
              <label htmlFor="confirmPass"> Confirm password</label>
              <input
                id="confirmPass"
                type="password"
                ref={confirmPassRef}
                required
              />
            </div>
          )}
          {!isLoading && (
            <button type="submit">
              {login ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending Request...</p>}
        </form>
        <button
          className="switch"
          type="button"
          onClick={switchAuthModeHandler}
        >
          {login ? "Don't have Account? SignUp" : "Have an Account? Login"}
        </button>
      </section>
    </>
  );
};

export default AuthForm;
