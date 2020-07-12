import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart, removeFromCart} from '../actions/cartActions'
import { Link } from 'react-router-dom';
import {  CardImg, Row, Col,
        FormGroup,  Input, Button, Media } from 'reactstrap';

function CartScreen(props) {
    
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);
    
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    return (
        <Row>
            <Col xl='8' lg='6'>
                <Row>
                    <Col>
                        <h3>Shopping Cart</h3>
                        {
                            cartItems.length === 0 ?
                            <div>
                                Cart is empty
                            </div>
                            :
                            cartItems.map(item =>
                                <Row style={{marginTop: '2rem'}}>
                                    <Col xl='8'>
                                    <Media>
                                        <Media href="#">
                                            <CardImg className={'h-50', 'w-50'}  src={item.image} alt="product" />
                                        </Media>
                                        <Media body>
                                            <Media heading>
                                                <Link to={"/product/" + item.product}>{item.name}</Link>
                                            </Media>
                                            <FormGroup row>
                                                {/* <Label for="exampleSelect" sm={4}>Select</Label> */}
                                                <Col sm='4' xm='2'>
                                                    <Input type="select" name="select" id="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                                        {[...Array(item.countInStock).keys()].map(x =>
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )}
                                                    </Input>
                                                </Col>
                                                <Col sm='4' xm='2'>
                                                    <Button onClick={() => removeFromCartHandler(item.product)} outline color="danger">Delete</Button>
                                                </Col>
                                                <div >
                                                    ${item.price}
                                                </div>
                                            </FormGroup>
                                        </Media>
                                    </Media>
                                    </Col>
                                </Row>
                            )
                        }
                    </Col>
                </Row>
            </Col>
            <Col xl='4' lg='6'>
                <h3>
                    Total :
                     $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <Button onClick={checkoutHandler} disabled={cartItems.length === 0} outline color="success">
                Proceed to Checkout</Button>
            </Col>
        </Row>
    )
}


export default CartScreen;