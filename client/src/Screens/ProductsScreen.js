import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

    return <div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" 
                onClick={() => openModal({})}>Create Product
            </button>
        </div>
        { modalVisible &&
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>Create Product</h2>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>

                        <li>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input type="text" name="name" value={name} id="name" 
                            onChange={(e) => setName(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="price">
                                Price
                            </label>
                            <input type="text" name="price" value={price} id="price"
                            onChange={(e) => setPrice(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="image">
                                Image
                            </label>
                            <input type="text" name="image" value={image} id="image" 
                            onChange={(e) => setImage(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="countInStock">
                                CountInStock
                            </label>
                            <input type="text" name="countInStock" value={countInStock} id="countInStock" 
                            onChange={(e) => setCountInStock(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="continent">
                                Continent
                            </label>
                            <select name="continent" value={continent} id="continent" 
                                onChange={(e) => setContinent(e.target.value)} style={{ padding:'1rem 0rem'}}>
                                    {Continents.map(item => (
                                            <option key={item.key} value={item.value}>{item.value} </option>
                                        ))}
                            </select>
    
                        </li>
                        
                        <li>
                            <label htmlFor="description">
                                Description
                            </label>
                            <textarea name="description" value={description} id="description" style={{ padding:'0 1rem 8rem '}}
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                        </li>
                        <li>
                            <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
                        </li>
                    </ul>
                </form>
            </div>
        }

        <div className="product-list">

        <table className="table">
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
                        <button className="button" onClick={() => openModal(product)} >Edit</button>
                        {' '}
                        <button className="button" onClick={() => deleteHandler(product)} >Delete</button>
                    </td>
                </tr>))
            }
            </tbody>
        </table>

        </div>
    </div>

}
export default ProductsScreen; 
