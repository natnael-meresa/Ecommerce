import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions.js";
import SearchBox from "./SearchBox.js";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";

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
            <Nav className="me-auto">
              <SearchBox />
            </Nav>
            <Nav>
              <Nav.Link>
                <Link to="/cart" className="link">
                  <li className="fas fa-shopping-cart"></li> CART
                </Link>
              </Nav.Link>
              {userInfo ? (
                <Dropdown class="nav-item dropdown no-arrow">
                  <Dropdown.Toggle
                    class="nav-link dropdown-toggle"
                    id="userDropdown"
                    as={"a"}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                      {userInfo.name}
                    </span>
                    <img
                      class="img-profile rounded-circle"
                      src="/images/undraw_profile.svg"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <Link class="dropdown-item" to="/profile">
                      <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </Link>
                    {userInfo && userInfo.isAdmin && (
                      <Link class="dropdown-item" to="/dashboard">
                     <i class="fas fa-fw fa-tachometer-alt"></i>
                      Dashboard
                    </Link>
                  )}
                    <div class="dropdown-divider"></div>
                    <a
                      class="dropdown-item"
                      href="#"
                      data-toggle="modal"
                      data-target="#logoutModal"
                      onClick={logoutHandler}
                    >
                      <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </a>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link>
                  <Link to="/login" className="link">
                    <li className="fas fa-user"></li> SING IN
                  </Link>
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
