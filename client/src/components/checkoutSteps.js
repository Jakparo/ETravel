import React from 'react';
import {Row, Col}   from 'reactstrap'
function CheckoutSteps(props){
    return <Row>
    <div className="checkout-steps col">
        <div className={props.step1 ? 'active' : ''}>Sign in</div>
        <div className={props.step2 ? 'active' : ''}>Shipping</div>
        <div className={props.step3 ? 'active' : ''}>Payment</div>
        <div className={props.step4 ? 'active' : ''}>Place Order</div>
    </div>
    </Row>
}

export default CheckoutSteps;