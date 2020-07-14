import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Row, Col, Button, Table, Form, FormGroup,
    Label, Input } from 'reactstrap';

import { saveProduct, listProducts, deleteProduct } from '../actions/productAction';

const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" }
]

function ProductsScreen(props){
    
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [continent, setContinent] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();
    

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
        //
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setContinent(product.continent);
        setCountInStock(product.countInStock);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name, price, image, continent,
            countInStock, description
        }));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    return (
        <Row>
            <Col xl='12'> 
                <Button color="success" outline onClick={() => openModal({})}>
                    Create Product
                </Button>
            </Col>
            { modalVisible && 
            <Col className='mx-auto' sm='10' xl='4' lg='4' md='4' xs='10'>
                <Form onSubmit={submitHandler}>
                    <h3>Create Product</h3>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input value={name} type="text" name="name" id="name" 
                        onChange={(e) => setName(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input value={price} type="text" name="price" id="price"
                        onChange={(e)=> setPrice(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input value={image} type="text" name="image" id="image"
                        onChange={(e) => setImage(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="countInStock">Count in Stock</Label>
                        <Input value={countInStock} type="text" name="countInStock" id="countInStock"
                        onChange={(e) => setCountInStock(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="continent">Continent</Label>
                        <Input type="select" name="continent" value={continent} id="continent" 
                            onChange={(e) => setContinent(e.target.value)}>
                                {Continents.map(item => (
                                        <option key={item.key} value={item.value}>{item.value} </option>
                                    ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" value={description} id="description" 
                        style={{ padding:'0 1rem 5rem '}} onChange={(e) => setDescription(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit" outline color="success" className='mr-2'>                 
                        {id ? "Update" : "Create"}
                    </Button>
                    <Button color="dark" onClick={() => setModalVisible(false)}>
                        Back
                    </Button>
                </Form>
            </Col>
            }
            <Col className='mx-auto' sm='10' xl='8' lg='8' md='8'>
            <h3>Product List </h3>
            <Table dark>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Continent</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.continent}</td>
                        <td>
                            <Button color="primary" outline onClick={() => openModal(product)} >Edit</Button>
                            {' '}
                            <Button color="danger" outline onClick={() => deleteHandler(product)} >Delete</Button>
                        </td>
                    </tr>))
                }
                </tbody>
            </Table>
            </Col>
        </Row>
)
}
export default ProductsScreen; 
