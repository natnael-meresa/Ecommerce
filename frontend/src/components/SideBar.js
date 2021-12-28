import { Link } from "react-router-dom";
import React from "react";
import { Navbar } from "react-bootstrap";
import { NavDropdown, Nav } from "react-bootstrap";

const SideBar = () => {
  return (
    <>
      <Nav className="dash-sidebar flex-column">
        <Link to="/" className="link sidebar-brand">
          <Navbar.Brand>Ecommerce</Navbar.Brand>
        </Link>

        <hr class="sidebar-divider" />
        <Nav.Link className="nav-item">
          <Link class="link nav-link" to="/dashboard/">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </Nav.Link>
        <hr class="sidebar-divider" />
        <Nav.Link className="nav-item">
          <Link to="/dashboard/userlist" className="link nav-link">
          <i class="fas fa-users"></i>
            <span>User List</span>
          </Link>
        </Nav.Link>
        <hr class="sidebar-divider" />
        <Nav.Link className="nav-item">
          <Link to="/dashboard/productlist" className="link nav-link">
          <i class="fas fa-list-ol"></i>
            <span>Product List</span>
          </Link>
        </Nav.Link>
        <hr class="sidebar-divider" />
        <Nav.Link className="nav-item">
          <Link to="/dashboard/orderlist" className="link nav-link">
          <i class="fas fa-luggage-cart"></i>
            <span>Order List</span>
          </Link>
        </Nav.Link>
        <hr class="sidebar-divider" />
      </Nav>
    </>
  );
};

export default SideBar;
