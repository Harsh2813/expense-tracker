import React, { useState, useRef, useContext, useEffect } from "react";
import { Form, Row, Col, Button, Nav } from "react-bootstrap";
import AuthContext from "../Store/AuthContext";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  let initialProfileState = localStorage.getItem("profileCompleted");
  const [profileCompleted, setProfileCompleted] = useState(initialProfileState);
  const [userDetails, setUserDetails] = useState([]);

  const authCxt = useContext(AuthContext);
  const token = authCxt.token;

  const nameRef = useRef("");
  const photoRef = useRef("");

  const profileFormSubmitHandler = async (event) => {
    event.preventDefault();

    const newName = nameRef.current.value;
    const newPhoto = photoRef.current.value;

    setLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD1QTiD2WAjTJB-k-WnIHq5acACBf5EVko",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: newName,
            photoUrl: newPhoto,
            returnSecureToken: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        let errorMessage = await response.json();
        console.log("error response", errorMessage);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setProfileCompleted(true);
      localStorage.setItem("profileCompleted", "true");
      console.log(data);
    } catch (error) {
      console.log(error);
      setProfileCompleted(false);
      localStorage.setItem("profileCompleted", "false");
      alert("Error Occurred", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD1QTiD2WAjTJB-k-WnIHq5acACBf5EVko",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          const errorMessage = await response.json();
          console.log("errorMessage", errorMessage);
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("data", data);
        // Check if 'users' array exists in the data
        if (data && Array.isArray(data.users)) {
          // Update state with the 'users' array
          setUserDetails(data.users);
        } else {
          console.log("Invalid data format from Firebase");
        }
        //console.log(cartItems);
      } catch (error) {
        console.log("failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    if (authCxt.isLoggedIn) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [authCxt.isLoggedIn]);
  console.log("userdetails", userDetails);

  return (
    <>
      <Nav className="justify-content-between">
        <p style={{ padding: "20px" }}>
          Winners never quit, quitters never win.
        </p>
        {!profileCompleted ? (
          <p className="ml-auto" style={{ padding: "20px" }}>
            Your Profile is InComplete. Profile with 100%
            <br />
            complete have higher chances of getting job.
          </p>
        ) : (
          <p style={{ padding: "20px" }}>Your Profile is Completed</p>
        )}
      </Nav>
      <div className="container text-center mt-5">
        <h3>Contact Details</h3>

        {loading && <p>Loading...</p>}

        <Form
          onSubmit={profileFormSubmitHandler}
          style={{
            width: "auto",
            margin: "20px 250px",
            padding: "20px 20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Row className="justify-content-md-center mb-3">
            <Col md={6}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                ref={nameRef}
              />
            </Col>
            <Col md={6}>
              <label>Profile Photo URL</label>
              <input
                type="url"
                placeholder="Enter the photo URL"
                ref={photoRef}
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={9}>
              <Button variant="primary" type="submit" className="mr-2">
                Submit
              </Button>
              <Button variant="Danger" type="button">
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
        <ul>
          {userDetails.map((detail) => (
            <li key={detail.id}>
              email: {detail.email} - displayName: {detail.displayName} - photoUrl:
              {detail.photoUrl} - emailVerified: {detail.emailVerified} - lastLoginAt: 
              {detail.lastLoginAt}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;
