import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Button, Form, Col, Container } from "react-bootstrap";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeorder");
  };
  return (
    <>
      <Header />
      <Container>
        <FormContainer>
          <CheckOutSteps step1 step2 step3 />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  value="PayPal"
                  checked
                  name="paymentMethod"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Payment;
