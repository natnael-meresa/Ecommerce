import React, { useEffect } from "react";
import Product from "../components/Product";
import {Helmet} from "react-helmet";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel"
const Home = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;
  const dispatch = useDispatch();

  const producetList = useSelector((state) => state.productList);

  const { loading, error, products , page, pages} = producetList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
    <Helmet>
      <title>Welcom To Ecommerce </title>
      <meta name='description' content='We sell quality products'/>
      <meta name='keywords' content='electronics, buy electronics, cheep electronics' />
    </Helmet>
      <Header />
      {!keyword && <ProductCarousel />}

      <Container>
        <div className='mt-3'>
        </div>
        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm="12" md="6" lg="4" xl="3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Home;
