import React from "react";
import { Link } from "react-router-dom";
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Form,
    Tooltip,
    NavDropdown,

  } from "react-bootstrap";
const DashNav = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className=" p-0 shadow">
        <Navbar.Brand className="navbar-brands col-lg-2">
          <Link to="/" className="link">
            Ecommerce
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default DashNav;
