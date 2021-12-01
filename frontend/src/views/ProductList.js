import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { listUsers, deleteUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Table, Button, Container,Row, Col } from "react-bootstrap";
import SideBar from "../components/SideBar.js";
import DashNav from "../components/DashNav.js";
import {listProducts} from '../actions/productActions';
const ProductList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList; 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listProducts());
    }else{
      navigate('/login')
    }
  }, [dispatch, userInfo]);

  const deleteProductHandler = (id) => {
    if(window.confirm('Are you sure')){
    //   dispatch(deleteUser(id))
    }
  };

  const createProductHandler = (product) => {
      //create product
  }

  return (
    <>
      <DashNav />
      <SideBar />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          

      <Row className='align-items-center'>
              <Col>
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Product List</h1>
      </div>
              </Col>
              <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i>  Create Product
                </Button>
              </Col>
          </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    ${product.price}
                  </td>
                  <td>
                   {product.category}
                  </td>
                  <td>
                      {product.brand}
                  </td>
                  <td>
                    <Link to={`/dashboard/product/${product._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </main>
    </>
  );
};

export default ProductList;
