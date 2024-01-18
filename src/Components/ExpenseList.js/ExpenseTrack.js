import React, { useRef, useContext } from "react";
import {
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import ExpenseContext from "../../Store/ExpenseContext";

const ExpenseTrack = () => {
  const moneyRef = useRef();
  const descriptionRef = useRef("");
  const categoryRef = useRef("");

  const expenseCxt = useContext(ExpenseContext);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredMoney = moneyRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;

    const data = {
      id: Math.random().toString(),
      money: enteredMoney,
      description: enteredDescription,
      category: enteredCategory,
    };
    expenseCxt.addExpense(data);

    moneyRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "select";
  };

  return (
    <>
      <div className="container text-center mt-5">
        <h3 className="text-content-center">Track Your Expenses Daily</h3>
      </div>
      <Row className="g-2 mt-3 p-4">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Money Spent">
            <Form.Control
              type="number"
              placeholder="name@example.com"
              ref={moneyRef}
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Description">
            <Form.Control
              type="text"
              placeholder="name@example.com"
              ref={descriptionRef}
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingSelectGrid" label="Category">
            <Form.Select
              aria-label="Floating label select example"
              ref={categoryRef}
            >
              <option>Select</option>
              <option>Food</option>
              <option>Rent</option>
              <option>Petrol</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Button
        type="submit"
        onClick={formSubmitHandler}
        style={{ width: "100px", display: "block", margin: "auto" }}
      >
        Submit
      </Button>

      <div className="container text-center mt-5">
        {expenseCxt.isLoading && <Spinner animation="border" />}
        <ul style={{ width: "70%", marginLeft: "11rem" }}>
          {expenseCxt.expenses.map((item) => (
            <Card
              key={item.id}
              className="text-center"
              style={{ marginTop: "20px", marginBottom: "50px" }}
            >
              <Card.Header>Rs.{item.money}</Card.Header>
              <Card.Body>
                <Card.Title>{item.category}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">This Year</Card.Footer>
            </Card>
          ))}
          ;
        </ul>
        <Button
          onClick={expenseCxt.deleteExpense}
          variant="outline-danger"
          style={{ width: "60%" }}
        >
          Delete Expenses
        </Button>
      </div>
    </>
  );
};

export default ExpenseTrack;
