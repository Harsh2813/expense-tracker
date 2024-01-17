import React, {useState} from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    email: '',
    login: (token) => {},
    logout: () => {},
})

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const initialEmail = localStorage.getItem('email');
    const [token, setToken] = useState(initialToken);
    const [userEmail, setUserEmail] = useState(initialEmail);

    const userIsLoggedIn = !!token;

    const userLoginHandler = (token, userEmail) => {
        setToken(token);
        setUserEmail(userEmail);
        localStorage.setItem('token', token);
        localStorage.setItem('email', userEmail);
    }

    const userLogoutHandler = () => {
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    const contextValue = {
        token: token,
        email: userEmail,
        isLoggedIn: userIsLoggedIn,
        login: userLoginHandler,
        logout: userLogoutHandler,
    }

    return(
        <>
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
        </>
    )
}

export default AuthContext;