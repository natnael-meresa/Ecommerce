import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import SideBar from "../components/SideBar.js";
import DashNav from "../components/DashNav.js";
import { USER_UPDATE_RESET } from "../constants/userConstants";

import {
  Button,
  Form,
} from "react-bootstrap";

const UserEdit = () => {
    const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);


  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  const navigate = useNavigate();

  useEffect(() => {
      if(successUpdate){
          dispatch({type: USER_UPDATE_RESET })
          navigate('/dashboard/userlist')
      }else{
        if(!user.name || user._id !== id){
            dispatch(getUserDetails(id))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
      }
  }, [user, id, dispatch, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:id, name, email, isAdmin}))
  };
  return (
    <>
      <DashNav />
      <SideBar />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <FormContainer>
          <h1>Edit User</h1>
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
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="isadmin">
                <Form.Check
                  type="checkbox"
                  label= "Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
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

export default UserEdit
