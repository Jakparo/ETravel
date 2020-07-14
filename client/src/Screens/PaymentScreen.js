import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  Row, Col, Form, FormGroup,
    Label, Input, Button } from 'reactstrap';
    
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/checkoutSteps';

function PaymentScreen(props){
    const [paymentMethod, setPaymentMethod] = useState('');
    
    const dispatch = useDispatch();

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('placeorder');
    }

    return (
        <Row>
            <Col className='mx-auto' xl='4' lg='5' md='6'  sm='7' xs='8' >
                <CheckoutSteps step1 step2 step3></CheckoutSteps>
                <h3> Payment </h3>
                <Form onSubmit={submitHandler}>
                    <FormGroup tag="fieldset">
                        <legend>Choose payment method</legend>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="paymentMethod" id="paymentMethod" value="paypal"
                            onChange={(e)=> setPaymentMethod(e.target.value)} />{' '}
                            Paypal
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="paymentMethod" id="paymentMethod" value="COD"
                            onChange={(e)=> setPaymentMethod(e.target.value)}/>{' '}
                            Ship COD
                        </Label>
                        </FormGroup>
                        <Button color="primary" type="submit">
                            Continue
                        </Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>)
}

export default PaymentScreen;