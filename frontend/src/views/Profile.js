import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions"
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Row,
  Table,
  Col,
  Navbar,
  Button,
  Nav,
  Form,
  Container
} from "react-bootstrap";


const Profile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error:errorOrders, orders} = orderListMy

    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({id: user._id, name, email, password}))

        }
    }
    return <>
    <Header />
    <Container>
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Order</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'></Message> :(
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order._totalPrice}</td>
                                <td>{ order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>{ order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
    </Container>
    <Footer/>
    </>
}

export default Profile
