import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle ,Spinner} from 'reactstrap';
    

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
        <ul className="products">
        {
            products.map(product => 
            <li key={product._id}>
                <div className="product">
                    <Card>
                        <Link to={'/product/'+ product._id}>
                            <CardImg className="product-image" top width="100%" src={product.image} alt="product" />
                            <CardBody>
                                <CardTitle className="product-name">{product.name}</CardTitle>
                                <CardSubtitle>{product.continent}</CardSubtitle>
                                <CardSubtitle className="product-price">${product.price}</CardSubtitle>
                                <CardSubtitle>{product.rating} stars</CardSubtitle>
                            </CardBody>
                        </Link>
                    </Card>
                </div>
            </li>
            )
        }
    </ul>
}

export default HomeScreen;