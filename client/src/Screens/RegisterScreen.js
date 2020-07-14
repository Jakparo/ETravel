import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  Row, Col, Form, FormGroup,
    Label, Input, Button } from 'reactstrap';

import { register } from '../actions/userAction';

function RegisterScreen(props){
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister);
    const {loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
        return () => {
            // 
        }
    }, [userInfo]);

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(register(name, email,password));
    }
    return (
        <Row>
            <Col className='mx-auto' xl='3' xs='8' md='5' lg='5' sm='6' >
                <h3> Create account</h3>
                {loading && <div>Loading..</div>}
                {error && <div>{error}</div>}
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input value={name} type="name" name="name" id="name" 
                        onChange={(e) => setName(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input value={email} type="email" name="email" id="email"
                        onChange={(e)=> setEmail(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input value={password} type="password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="rePassword">Re-enter Password</Label>
                        <Input value={rePassword} type="password" name="rePassword" id="rePassword"
                        onChange={(e) => setRePassword(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit" outline color="success" className='mr-2'>Register</Button>
                    <div>Already have an account ?</div>
                    <Button color="dark">
                        <Link to={redirect === "/"? "signin" : "signin?redirect=" + redirect}>
                            Sign In
                        </Link>
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default RegisterScreen;