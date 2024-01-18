import React, {useState, useRef, useContext} from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import AuthContext from "../Store/AuthContext";

const UserProfile = () => {

    const [loading, setLoading] = useState(false);
    const authCxt = useContext(AuthContext);
    const token = authCxt.token;
    const nameRef = useRef('');
    const photoRef = useRef('');

    const profileFormSubmitHandler = async(event) => {
        event.preventDefault();

        const newName = nameRef.current.value;
        const newPhoto = photoRef.current.value;

        setLoading(true);
        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD1QTiD2WAjTJB-k-WnIHq5acACBf5EVko', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                    displayName: newName,
                    photoUrl: newPhoto,
                    returnSecureToken: false,
                }),
                headers: {'Content-Type' : 'application/json'}
            })
            if(!response.ok){
                let errorMessage = await response.json();
                console.log('error response',errorMessage);
                throw new Error(errorMessage);
            }
            const data = await response.json();
            console.log(data);
        }catch(error){
            console.log(error);
            alert('Error Occurred', error);
        }finally{
            setLoading(false);
        }
    }

  return (
    <>
      <header className="mb-4">
        <p>Winners never quit, quitters never win.</p>
      </header>
      <div className="container text-center mt-5">
        <h3>Contact Details</h3>

        {loading && <p>Loading...</p>}

        <Form onSubmit={profileFormSubmitHandler}
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
              <input type="text" placeholder="Enter your full name" ref={nameRef}/>
            </Col>
            <Col md={6}>
              <label>Profile Photo URL</label>
              <input type="url" placeholder="Enter the photo URL" ref={photoRef}/>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={9}>
              <Button variant="primary" type="submit" className="mr-2">Submit</Button>
              <Button variant="Danger" type="button">Cancel</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default UserProfile;
