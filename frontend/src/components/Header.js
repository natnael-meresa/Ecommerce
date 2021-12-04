import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions.js";
import SearchBox  from "./SearchBox.js";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Link to="/" className="link">
            <Navbar.Brand>Ecommerce</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          
          <Navbar.Collapse id="responsive-navbar-nav">
            <SearchBox />
            <Nav className="me-auto">
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Link to="/cart" className="link">
                  <li className="fas fa-shopping-cart"></li> CART
                </Link>
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    <Link to="/profile" className="link">
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown.Item>
                      <Link to="/dashboard" className="link">
                        Dashboard
                      </Link>
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link>
                  <Link to="/login" className="link">
                    <li className="fas fa-user"></li> SING IN
                  </Link>{" "}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
