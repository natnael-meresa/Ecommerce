import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Table, Button, Container, Navbar } from "react-bootstrap";
import SideBar from "../components/SideBar.js";
import DashNav from "../components/DashNav.js";
const OrderList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }

    window.addEventListener("resize", detectSize);

    if (windowDimention.winWidth > 768) {
      setToggler(true);
    }
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [dispatch, userInfo, navigate, windowDimention]);

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
                <h1 class="h3 mb-0 text-gray-800">Order List</h1>
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
                      <th>USER</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name} </td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order._totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <Link to={`/order/${order._id}`}>
                            <Button className="btn-sm" variant="light">
                              Details
                            </Button>
                          </Link>
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

export default OrderList;
