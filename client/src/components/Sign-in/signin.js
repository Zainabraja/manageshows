import React, { useState } from "react";
import "./signin.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const findFormErrors = () => {
    const { name, email } = user;
    const newErrors = {};
    if (!name || name === "") newErrors.name = "Please enter you name";
    if (!email || email === "") newErrors.email = "Please enter your email!";

    return newErrors;
  };

  const submitData = async (e) => {
    e.preventDefault();
    const { name, email } = user;

    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      console.log(data);

      if (data.errors || !data) {
        console.log("Signin failed!");
      } else {
        console.log(data);
        navigate("/manage");
      }
    }
  };

  return (
    <div className="signin">
      <Card
        className="p-3 shadow-lg"
        style={{ width: "30rem", borderRadius: "2.5rem" }}
      >
        <Card.Body>
          <Card.Title
            className="text-center mb-5"
            style={{ fontSize: "30px", fontWeight: "bold" }}
          >
            SIGN IN
          </Card.Title>
          <Form method="POST">
            <Form.Group className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={user.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="col-12" variant="dark" onClick={submitData}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signin;
