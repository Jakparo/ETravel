import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle ,Spinner, Row, Container, Col } from 'reactstrap';
    

import { listProducts } from '../actions/productAction';

function HomeScreen(props){
    
    const productList =  useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {
            //
        };
    }, [])

    return loading? <div><Spinner color="primary" /></div> : 
    error ? <div> {error}</div> :
                <Row>
                    {
                    products.map(product => 
                        <Col lg='3' md='4' sm='6' key={product._id}>
                            <Card>
                                <Link to={'/product/'+ product._id}>
                                    <CardImg top width="100%" src={product.image} alt="product" />
                                    <CardBody>
                                        <CardTitle className="font-weight-bold">{product.name}</CardTitle>
                                        <CardSubtitle>{product.continent}</CardSubtitle>
                                        <CardSubtitle className="font-weight-bold">${product.price}</CardSubtitle>
                                        <CardSubtitle>{product.rating} stars</CardSubtitle>
                                    </CardBody>
                                </Link>
                            </Card>
                        </Col>
                    )
                }

                </Row>

}

export default HomeScreen;