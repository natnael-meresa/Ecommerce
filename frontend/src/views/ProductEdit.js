import React, { useState, useEffect } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import { listProductDetails , updateProduct} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import SideBar from "../components/SideBar.js";
import DashNav from "../components/DashNav.js";
import axios from "axios";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

import {
  Button,
  Form,
} from "react-bootstrap";

const ProductEdit = () => {
    const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);


  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  const navigate = useNavigate();

  useEffect(() => {
      if(successUpdate){
          dispatch({type: PRODUCT_UPDATE_RESET })
          navigate('/dashboard/productlist')
      }else{
        if(!product.name || product._id !== id){
            dispatch(listProductDetails(id))
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }
      
  }, [product, id, dispatch, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({_id:id, name, price, image, brand, category, description, countInStock}))
  };
  const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)

      try{
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
          const { data } = await axios.post('/api/upload', formData, config)
          setImage(data)
          setUploading(false)
      } catch (error){
          console.error(error)
          setUploading(false)
      }
  }
  return (
    <>
      <DashNav />
      <SideBar />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
              <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
              type="file"
              name="file"
              onChange={uploadFileHandler}
            />
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter CountInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
  
          ) }
        </FormContainer>
      </main>
    </>
  );
};

export default ProductEdit
