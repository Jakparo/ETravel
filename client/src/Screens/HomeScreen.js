import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle ,Spinner, Row, Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import { listProducts } from '../actions/productAction';
import search from '../icons/search.svg';

function HomeScreen(props){
    const [searchKeyword, setSearchKeyword] = useState('');
    const name = props.match.params.id ? props.match.params.id : '';
    const productList =  useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(listProducts(name));
        return () => {
            //
        };
    }, [name])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(name, searchKeyword))
    }

    return <>
        {name && <h2>{name}</h2>}
        <Row>
            <Col className="mx-auto" xl="4" md="6" sm="6">
                <Form onSubmit={submitHandler}>
                    <FormGroup className="d-flex">
                        <Input className="border border-dark"  name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                        <Button color="light" className="border border-dark"><img src={search} width={22} height={22}/></Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
            {loading? <div><Spinner color="primary" /></div> : 
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
    </>
}

export default HomeScreen;