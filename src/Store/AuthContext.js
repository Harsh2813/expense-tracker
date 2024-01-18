import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    email: '',
    login: (token, mail) => {},
    logout: () => {},
    sendVerification: () => {},
})

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const initialEmail = localStorage.getItem('email');
    const [token, setToken] = useState(initialToken);
    const [userEmail, setUserEmail] = useState(initialEmail);

    const history = useHistory();

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

    // let oobCode;
    // useEffect(() => {
    //     const sendVerificationHandler = async() => {
    //         try{
    //             const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD1QTiD2WAjTJB-k-WnIHq5acACBf5EVko', {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     requestType: 'VERIFY_EMAIL',
    //                     idToken: token,
    //                 }),
    //                 headers: {'Content-Type' : 'application/json'}
    //             })
    //             if(!response.ok){
    //                 let errorMessage = response.json();
    //                 console.log(errorMessage);
    //                 throw new Error('response was not ok', errorMessage);
    //             }
    //             const data = await response.json();
    //             oobCode = data.oobCode;
    //             <p>Verification Pending</p>
    
    //         }catch(error){console.log(error)}
    //     }
    // }, [history, userIsLoggedIn]);

    // useEffect(() => {
    //     const confirmVerificationHandler = async () => {
    //       try {
    //         // Extract oobCode from URL parameters
    //         const urlSearchParams = new URLSearchParams(window.location.search);
    //         const oobCode = urlSearchParams.get('oobCode');
    
    //         if (!oobCode) {
    //           // Handle the case where oobCode is missing
    //           console.error("oobCode is missing in the URL parameters.");
    //           return;
    //         }
    
    //         const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD1QTiD2WAjTJB-k-WnIHq5acACBf5EVko', {
    //           method: 'POST',
    //           body: JSON.stringify({
    //             oobCode: oobCode,
    //           }),
    //           headers: { 'Content-Type': 'application/json' }
    //         });
    
    //         if (!response.ok) {
    //           let errorMessage = await response.json();
    //           throw new Error('response was not ok', errorMessage);
    //         }
    
    //         const data = await response.json();
    
    //         if (data.emailVerified) {
    //           console.log("Email has been verified successfully!");
    //           // Redirect to the home page or any other page
    //           history.replace('/');
    //         }
    //       } catch (error) {
    //         console.error('Error confirming email verification:', error);
    //         // Handle the error (e.g., show an error message)
    //       } finally {
    //         // Cleanup or additional actions if needed
    //       }
    //     };
    
    //     // Check if the user is logged in before confirming verification
    //     if (userIsLoggedIn) {
    //       confirmVerificationHandler();
    //     }
    //   }, [history, userIsLoggedIn]);
    

    const contextValue = {
        token: token,
        email: userEmail,
        isLoggedIn: userIsLoggedIn,
        login: userLoginHandler,
        logout: userLogoutHandler,
        //sendVerification: sendVerificationHandler,
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