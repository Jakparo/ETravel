import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import CheckoutSteps from '../components/checkoutSteps';
import { createOrder, detailsOrder } from '../actions/orderActions';
import {  Row, Col, Button, CardImg, Media} from 'reactstrap';

function OrderScreen(props) {

    const dispatch = useDispatch();
        useEffect(() => {
        dispatch(detailsOrder(props.match.params.id));
        return () => {
        };
    }, []);

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;
    const payHandler = () => { };
    console.log(orderDetails)

    return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
        <Row>
            <Col xl='6' md='6' lg='6' sm='6' className='border border-secondary'>
                <div className='border'>
                    <h3>Shipping</h3>
                    {order.shipping.address}, {order.shipping.city},
                    {order.shipping.postalCode}, {order.shipping.country},
                    <div>
                        {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
                    </div>
                </div>
                <div className='border'>
                    <h3>Payment</h3>
                    Payment Method: {order.payment.paymentMethod}
                    <div>
                        {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
                    </div>
                </div>
                <h3> Shopping Cart</h3>
                {
                order.orderItems.length === 0 ?
                <div>
                Cart is empty
                </div>
                :
                order.orderItems.map(item =>
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
                <div>Items: ${order.itemsPrice}</div>
                <div>Shipping: ${order.shippingPrice}</div> 
                <div>Tax: ${order.taxPrice}</div>
                <div className={'text-danger font-weight-bold'} >Order total:${order.totalPrice}</div>
                <Button color='primary' outline onClick={payHandler} >Pay Now</Button>
            </Col>
        </Row>

}

export default OrderScreen; 