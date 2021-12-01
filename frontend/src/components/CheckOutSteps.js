import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import { Link } from "react-router-dom";


const CheckOutSteps = ({step1, step2,step3, step4}) => {
    return (
        <Nav className="mb-4">
            <Nav.Item>
                {step1 ? (
                    <Navbar.Brand as={Link} to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </Navbar.Brand>
                ) : <Nav.Link disabled>Sign In</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <Navbar.Brand as={Link} to='/shipping'>
                        <Nav.Link>Shipping</Nav.Link>
                    </Navbar.Brand>
                ) : <Nav.Link disabled>Shipping</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <Navbar.Brand as={Link} to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </Navbar.Brand>
                ) : <Nav.Link disabled>Payment</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <Navbar.Brand as={Link} to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </Navbar.Brand>
                ) : <Nav.Link disabled>Place Order</Nav.Link>}
            </Nav.Item>
        </Nav>
    )
}

export default CheckOutSteps
