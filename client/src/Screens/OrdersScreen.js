import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  Row, Col, Button, Table } from 'reactstrap';

import { saveOrder, listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
    console.log("dd")
    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
        return () => {
            //
        };
    }, [successDelete]);

    const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
    }
    return loading ? <div>Loading...</div> :
    <div>
        <div>
            <h3>Orders</h3>
        </div>
    
    <Row>
        <Col sm='12'>
            <Table dark>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>USER</th>
                        <th>PAID</th>
                        <th>PAID AT</th>
                        <th>DELIVERED</th>
                        <th>DELIVERED AT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (<tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.user.name}</td>
                        <td>{order.isPaid.toString()}</td>
                        <td>{order.paidAt}</td>
                        <td>{order.isDelivered.toString()}</td>
                        <td>{order.deliveredAt}</td>
                        <td>
                        <Button color="warning" outline type="submit">
                            <Link to={"/order/" + order._id}>Details</Link>
                            {' '}
                        </Button>
                        <Button color="danger" outline onClick={() => deleteHandler(order)}>
                            Delete
                        </Button>
                        </td>
                    </tr>))}
                </tbody>
            </Table>
        </Col>
    </Row>
    </div>
}
export default OrdersScreen;