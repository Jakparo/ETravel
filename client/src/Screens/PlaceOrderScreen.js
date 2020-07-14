import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps';
import {createOrder} from '../actions/orderActions';
import {  Row, Col, Button, CardImg, Media} from 'reactstrap';


function PlaceOrderScreen(props) {
    
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const { cartItems, shipping, payment } = cart;
    if(!shipping.address){
        props.history.push("/shipping");
    } else if(!payment.paymentMethod){
        props.history.push("/payment");
    }
    const itemsPrice =cartItems.reduce((a,c)=> a+c.price*c.qty,0)
    const shippingPrice = itemsPrice > 200?0 : 10;
    const taxPrice = 0.10 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    
    const dispatch = useDispatch();

    const placeOrderHandler = () =>{
        //create an order
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
            taxPrice, totalPrice
        }));
    }
    useEffect(() => {
        if (success) {
            props.history.push("/order/" + order._id);
        }
    }, [success]);
    
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    return (
        <Row>
            <Col xl='6' md='6' lg='6' sm='6' className='border border-secondary'>
                <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
                <div className='border'>
                    <h3>Shipping</h3>
                    {cart.shipping.address}, {cart.shipping.city},
                    {cart.shipping.postalCode}, {cart.shipping.country},
                </div>
                <div className='border'>
                    <h3>Payment</h3>
                    Payment Method: {cart.payment.paymentMethod}
                </div>
                <h3> Shopping Cart</h3>
                {
                cartItems.length === 0 ?
                <div>
                Cart is empty
                </div>
                :
                cartItems.map(item =>
                    <Media className={'mb-2'}>
                        <CardImg className={'h-25', 'w-25'}  src={item.image} alt="product" />
                        <Media body className='ml-2'>
                            <Media heading>
                                <Link to={"/product/" + item.product}>
                                {item.name}
                                </Link>
                            </Media>
                            <div> Qty {item.qty}</div>
                            <div>
                                Price ${item.price}
                            </div>
                            </Media>
                    </Media>
                )
            }
            </Col>
            <Col xl='6' md='6' lg='6' sm='6' className='border border-primary'>
                <h3>Order Summary</h3>
                <div>Items: ${itemsPrice}</div>
                <div>Shipping: ${shippingPrice}</div> 
                <div>Tax: ${taxPrice}</div>
                <div className={'text-danger font-weight-bold'} >Order total:${totalPrice}</div>
                <Button color='info' outline onClick={placeOrderHandler}>Place Order</Button>
            </Col>
        </Row>
    )
}

export default PlaceOrderScreen;