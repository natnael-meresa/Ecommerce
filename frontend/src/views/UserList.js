import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listUsers, deleteUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Table, Button, Navbar, Container  } from "react-bootstrap";
import SideBar from "../components/SideBar.js";
import DashNav from "../components/DashNav.js";
const UserList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const [toggler, setToggler] = useState(true);

  const [windowDimention, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers());
    }else{
      navigate('/login')
    }

    window.addEventListener("resize", detectSize);

    if (windowDimention.winWidth > 768) {
      setToggler(true);
    }
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [dispatch, successDelete,userInfo, navigate,windowDimention]);

  const deleteUserHandler = (id) => {
    if(window.confirm('Are you sure')){
      dispatch(deleteUser(id))
    }
  };



  return (
    <>
      <div id="wrapper">
        {toggler && <SideBar></SideBar>}

        <div id="content-wrapper">
          <Navbar bg="light">
            <button
              id="sidebarToggleTop"
              onClick={() => setToggler(!toggler)}
              class="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i class="fa fa-bars"></i>
            </button>
            <DashNav />
          </Navbar>
          <Container>
            <div class="container-fluid">
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">User List</h1>
              </div>
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
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto: ${user.email}`}> {user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/dashboard/user/${user._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default UserList;
