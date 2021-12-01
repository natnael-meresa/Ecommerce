import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
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

import Rating from "../components/Rating";

const Product = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  const producetDetails = useSelector((state) => state.producetDetails);
  const { loading, error, product } = producetDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const navigate = useNavigate();
  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Header />
      <Container>
        <Link activeClassName="current" className="btn btn-light my-3" to="/">
          Go Back
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>

                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {" "}
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <div className="d-grid gap-2">
                      <Button
                        onClick={addToCart}
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add Cart
                      </Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Product;
