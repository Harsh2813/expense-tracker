import React, { useRef, useState } from "react";
import { Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";

const ExpenseTrack = () => {
  const [expense, setExpense] = useState([]);
  const moneyRef = useRef();
  const descriptionRef = useRef("");
  const categoryRef = useRef("");

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
    setExpense((prevExpense) => {
      return [...prevExpense, data];
    });
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
        <ul>
          {expense.map((item) => (
            <li key={item.id}>
              In {item.category} : Money Spent = {item.money} - Description = 
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ExpenseTrack;
