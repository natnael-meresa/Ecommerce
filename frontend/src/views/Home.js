import React, { useEffect} from "react";
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Container } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Home = () => {

  const dispatch = useDispatch()

  const producetList = useSelector(state => state.producetList)

  const {loading, error, products} = producetList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
    <Header />
    <Container>
      <h1>Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :  <Row>
        {products.map((product) => (
          <Col key={product._id} sm="12" md="6" lg="4" xl="3">
            <Product product={product} ></Product>
          </Col>
        ))}
      </Row> }
      </Container>
      <Footer />
    </>
  );
};

export default Home;
