import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  Row, Col, Form, FormGroup,
    Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userAction';

function SigninScreen(props){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const {loading, userInfo, error} = userSignin;
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
        dispatch(signin(email,password));
    }
    return (
        <Row>
            <Col className='mx-auto' xl='4' xm='6' >
                <h3> ETravel</h3>
                {loading && <div>Loading..</div>}
                {error && <div>{error}</div>}
                <Form onSubmit={submitHandler}>
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
                    <Button type="submit" outline color="primary" className='mr-2'>Log in</Button>
                    <div>New to ETravel?</div>
                    <Button color="dark">
                        <Link to={redirect === "/"? "register" : "register?redirect=" + redirect}>
                            Create your Etravel account now
                        </Link>
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default SigninScreen;