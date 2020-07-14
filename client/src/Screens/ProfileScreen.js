import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  Row, Col, Form, FormGroup,
    Label, Input, Button, Table } from 'reactstrap';
import { logout, update } from '../actions/userAction';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const dispatch = useDispatch();

const userSignin = useSelector(state => state.userSignin);
const { userInfo } = userSignin;
const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
}
const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
}
const userUpdate = useSelector(state => state.userUpdate);
const { loading, success, error } = userUpdate;

const myOrderList = useSelector(state => state.myOrderList);
const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
useEffect(() => {
    if (userInfo) {
        console.log(userInfo.name)
        setEmail(userInfo.email);
        setName(userInfo.name);
        setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
}, [userInfo])

return  (
    <Row>
        <Col xl='4' lg='4' md='3' sm='8' xs='10'>
            <h3> User Profile</h3>
            <Form onSubmit={submitHandler}>
                <div>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    {success && <div>Profile Saved Successfully.</div>}
                </div>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input value={name} type="name" name="name" id="name" 
                    onChange={(e) => setName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input value={email} type="email" name="email" id="email"
                    onChange={(e) => setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input value={password} type="password" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
                <Button type="submit" outline color="primary" className='mr-2'>Update</Button>
                <Button outline color="danger" onClick={handleLogout}>Log out</Button>
            </Form>
        </Col>
        <Col xl='8' lg='8' md='9' sm='12' xs='12'>
        {
        loadingOrders ? <div>Loading...</div> :
            errorOrders ? <div>{errorOrders} </div> :
            <Table >
                <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid}</td>
                    <td>
                    <Link to={"/order/" + order._id}>DETAILS</Link>
                    </td>
                </tr>)}
                </tbody>
            </Table>
        }
        </Col>
    </Row>
)
}

export default ProfileScreen; 