import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  Row, Col, Form, FormGroup,
    Label, Input, Button } from 'reactstrap';

import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/checkoutSteps';

function ShippingScreen(props){
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    
    const dispatch = useDispatch();

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(saveShipping({address, city, postalCode, country}));
        props.history.push('payment');
    }

    return (
    <Row>
        <Col className='mx-auto' xl='4' xm='6' >
            <CheckoutSteps step1 step2></CheckoutSteps>
            <h3> Shipping </h3>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" id="address" 
                    onChange={(e) => setAddress(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" id="city" 
                    onChange={(e)=> setCity(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="postalCode">Postal Code</Label>
                    <Input type="text" name="postalCode" id="postalCode" 
                    onChange={(e)=> setPostalCode(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="country">Country</Label>
                    <Input type="text" name="country" id="country" 
                    onChange={(e)=> setCountry(e.target.value)}/>
                </FormGroup>
                <Button color="primary" type="submit">
                    Continue
                </Button>
            </Form>
        </Col>
    </Row>)
}

export default ShippingScreen;