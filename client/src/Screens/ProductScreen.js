import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle ,Spinner, Row, Col,
FormGroup, Label, Input, Button } from 'reactstrap';

import { detailsProduct } from '../actions/productAction';
import  url  from '../icons/return.svg'
function ProductScreen(props){

    const[ qty, setQty ] = useState(1);
    const productDetails = useSelector(state => state.productDetails );
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            // 
        }
    }, []);

    const handleAddToCart = ()=>{
        props.history.push("/cart/"+ props.match.params.id + "?qty=" + qty);
    }

    return (
    <div>
        <div>
            <p className="back-to-home">
                <span>
                    <Link to="/"> <img src={url} width={32} height={32}/></Link>
                </span>
            </p>
        </div>
        {loading?<div><Spinner color="primary" /></div> :
        error? <div>{error}</div>:
        (
            <Row>
                <Col lg='4' sm='6' xs='12'>
                    <Card>
                        <CardImg top width="100%" src={product.image} alt="product" />
                    </Card>
                </Col>
                <Col lg='4' sm='6' xs='12'>
                    <Card>
                        <CardBody>
                            <CardTitle className="font-weight-bold">{product.name}</CardTitle>
                            <CardSubtitle className="font-weight-bold">{product.continent}</CardSubtitle>
                            {/* <CardSubtitle>{product.rating} stars</CardSubtitle> */}
                            <label className="font-weight-bold">
                                Description
                            </label>
                            <CardSubtitle>{product.description}</CardSubtitle>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg='4' sm='6' xs='12'>
                    <Card style={{backgroundColor: '#f2fcfe'}}>
                        <CardBody>
                            <CardTitle>Price: ${product.price}</CardTitle>
                            <CardTitle>Status: {product.countInStock > 0? "In Stock":"Unavailable"}</CardTitle>
                            {/* <CardSubtitle>{product.rating} stars</CardSubtitle> */}
                            <CardSubtitle>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={4}>Select</Label>
                                    <Col sm={8}>
                                        <Input type="select" name="select" id="select" value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                                            {[...Array(product.countInStock).keys()].map(x=>
                                                <option key={x+1} value={x+1}>{x+1}</option>    
                                            )}
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </CardSubtitle>
                        </CardBody>
                        {  product.countInStock> 0 && 
                            <Button onClick={handleAddToCart}color="primary">
                                Add to Cart
                            </Button>
                        } 
                    </Card>
                </Col>
            </Row>
        )}
    </div>
    )  
}

export default ProductScreen;