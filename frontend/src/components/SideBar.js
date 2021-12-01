import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
    Button,
    NavDropdown
  } from "react-bootstrap";

const SideBar = () => {
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <nav
            id="sidebarMenu"
            class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div class="position-sticky pt-3">
              <ul class="nav flex-column">
              <li class="nav-item">
                  <NavDropdown.Item>
                    <Link to="/admin/userlist" className="link">
                      Dashboard
                    </Link>
                  </NavDropdown.Item>
                </li>
                <li class="nav-item">
                  <NavDropdown.Item>
                    <Link to="/dashboard/userlist" className="link">
                      User List
                    </Link>
                  </NavDropdown.Item>
                </li>
                <li class="nav-item">
                  <NavDropdown.Item>
                    <Link to="/dashboard/productlist" className="link">
                      Product List
                    </Link>
                  </NavDropdown.Item>
                </li>
                <li class="nav-item">
                  <NavDropdown.Item>
                    <Link to="/admin/userlist" className="link">
                      Dashboard
                    </Link>
                  </NavDropdown.Item>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
