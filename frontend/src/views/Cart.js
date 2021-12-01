import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions.js";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  Container,
} from "react-bootstrap";
const Cart = ({}) => {
  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const qty = searchParams.get("qty") || [1];
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("cartItems");
  console.log(cartItems);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkout = () => {
    if (!userInfo) {
      navigate("/login");
    }

    console.log(userInfo);
    navigate("/shipping");
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup Variant="flush">
                {cartItems.map((item) => (
                  <ListGroupItem key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.naem} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>
                          {" "}
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {" "}
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0)})
                    items
                  </h2>
                  $
                  {cartItems
                    .reduce(
                      (acc, cur) => acc + Number(cur.qty) * Number(cur.price),
                      0
                    )
                    .toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    type="button"
                    className="btn-block"
                    onClick={checkout}
                    disabled={cartItems.length === 0}
                  >
                    {" "}
                    Proceed To Checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
