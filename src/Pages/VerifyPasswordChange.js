import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const VerifyPasswordChange = () => {
  const [isLoading, setIsLoading] = useState();
  const [userMail, setUserMail] = useState("");

  const history = useHistory();

  const mailHandler = (event) => {
    setUserMail(event.target.value);
  };

  const passwordChangeHandler = async () => {

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD1QTiD2WAjTJB-k-WnIHq5acACBf5EVko",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: userMail,
          }),
        }
      );
      if (!response.ok) {
        let errorMsg = await response.json();
        throw new Error(errorMsg);
      }
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      setTimeout(() => {
        history.push('/auth');
      }, 10000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container text-center mt-5">
        <h3>Reset Password? Enter you registered Mail Id</h3>
        {isLoading && <p>Loading...</p>}
        <label style={{ marginTop: "100px" }}>Enter Your mail</label>
        <input type="email" style={{ width: "500px" }} onChange={mailHandler} />
        <button onClick={passwordChangeHandler} style={{ width: "100px" }}>
          Submit
        </button>
        <p style={{ marginTop: "50px" }}>
          Note: You would recieve a password reset link in your mail id which
          you entered above. Open the link and change the password. Now try
          logging the new password.
        </p>
      </div>
    </>
  );
};

export default VerifyPasswordChange;
