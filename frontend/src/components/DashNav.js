import { Navbar, Nav, Container,Dropdown  } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import { useDispatch,useSelector } from "react-redux";
import SearchBox from "./SearchBox.js";
const DashNav = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      
            <Container>
              <Navbar.Collapse id="basic-navbar-nav" className='topbar'>
                <Nav className="me-auto meyou">
                <SearchBox />

                </Nav>
                <Nav className="navbar-nav dash-navbar-nav ml-auto">
              
                  <Dropdown  class="nav-item dropdown no-arrow">
                    <Dropdown.Toggle
                      class="nav-link dropdown-toggle"
                      id="userDropdown"
                      as={'a'}
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="mr-2 d-none d-lg-inline text-gray-600">
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
                </Nav>
              </Navbar.Collapse>
            </Container>

    </>
  );
};

export default DashNav;
