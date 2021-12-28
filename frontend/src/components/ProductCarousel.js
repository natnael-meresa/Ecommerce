import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from "react-redux";
const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated
    let product = {_id: '1', name:'name'}
    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
    
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='true' className='bg-dark carsoual carousel-content'>
                <Carousel.Item key={product._id}>
                        <Image src="./images/slid3.jpg" alt={product.name} />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>we provide the best products with cheepest prices</h2> 
                        </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item key={product._id}>

                        <Image src="./images/slid4.jpg" alt={product.name} />
                        <Carousel.Caption className='carousel-caption'>
                        <h2>we provide the best products with cheepest prices</h2> 
                        </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item key={product._id}>

                        <Image src="./images/slid5.jpg" alt={product.name} />
                        <Carousel.Caption className='carousel-caption'>
                        <h2>we provide the best products with fastest delivery</h2>  
                        </Carousel.Caption>
                </Carousel.Item>
        </Carousel>
    )
}

export default ProductCarousel
