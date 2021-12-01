import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Product from "./views/Product";
import Cart from "./views/Cart";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Shipping from "./views/Shipping.js";
import Payment from "./views/Payment.js";
import PlaceOrder from "./views/PlaceOrder.js";
import Order from "./views/Order.js";
import UserList from "./views/UserList.js";
import Dashboard from "./views/Dashboard.js";
import UserEdit from "./views/UserEdit";
import ProductList from './views/ProductList'
function App() {
  return (
    <Router>

      <main className="">
          <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path={"product/:id"} element={<Product/>} />
            <Route path={"/cart/:id"} element={<Cart/>} />
            <Route path={"/cart"} element={<Cart/>} />
            <Route path={"/login"} element={<Login/>} />
            <Route path={"/register"} element={<Register/>} />
            <Route path={"/profile"} element={<Profile/>} />
            <Route path={"/shipping"} element={<Shipping/>} />
            <Route path={"/payment"} element={<Payment/>} />
            <Route path={"/placeorder"} element={<PlaceOrder/>} />
            <Route path={"/order/:id"} element={<Order/>} />
            <Route path={"/dashboard/userlist"} element={<UserList/>} />
            <Route path={"/dashboard"} element={<Dashboard/>} />
            <Route path={"/dashboard/user/:id/edit"} element={<UserEdit/>} />
            <Route path={"/dashboard/productlist"} element={<ProductList/>} />
          </Routes>
      </main>
    </Router>
  );
}

export default App;
