import React, {  useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Table, Button, Navbar, Container } from "react-bootstrap";
import SideBar from "../components/SideBar.js";
import DashNav from "../components/DashNav.js";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants"
import Paginate from "../components/Paginate";
const ProductList = () => {
  const dispatch = useDispatch();
  const { pageNumber } = useParams() || 1;
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  
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


  useEffect(() => {
      dispatch({type: PRODUCT_CREATE_RESET})
    if (!userInfo.isAdmin) {
        navigate("/login");
    } 

    if(successCreate) {
        navigate(`/dashboard/product/${createdProduct._id}/edit`)
    }else{
        dispatch(listProducts('', pageNumber));
    }

    window.addEventListener("resize", detectSize);

    if (windowDimention.winWidth > 768) {
      setToggler(true);
    }
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [dispatch, userInfo, successDelete, createdProduct,successCreate, pageNumber, navigate, windowDimention]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct())
  };
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
                  <h1 class="h3 mb-0 text-gray-800">Product List</h1>

                  <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
                </div>
                {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/dashboard/product/${product._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
              </div>
            </Container>
          </div>
        </div>
      </>
  );
};

export default ProductList;

