import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import ProductsScreen from './Screens/ProductsScreen';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import airplane from './icons/airplane.svg'
import OrdersScreen from './Screens/OrdersScreen';


function App() {
    const url = airplane;
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu = () =>{
        document.querySelector(".sidebar").classList.remove("open");
    }
    
    return (
    <BrowserRouter>
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to="/">ETravel <img src={url} width={32} height={32}/> </Link>
                </div>
                <div className="header-links">
                    <Link to ="/cart">Cart</Link>
                    {
                        userInfo ? <Link to="/profile">{userInfo.name}</Link>:
                        <Link to ="/signin">Log in</Link>
                    }
                    {userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <a>Manage</a>
                            <ul className="dropdown-content">
                            <li>
                                <Link to="/orders">Orders</Link>
                                <Link to="/products">Products</Link>
                            </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <aside className="sidebar">
                <h3>Continent</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul>
                    <li>
                        <a href="index.html">Africa</a>
                    </li>
                    <li>
                        <a href="index.html">Europe</a>
                    </li>
                    <li>
                        <a href="index.html">Asia</a>
                    </li>
                    <li>
                        <a href="index.html">North America</a>
                    </li>
                    <li>
                        <a href="index.html">South America</a>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                    <Route path="/orders" component={OrdersScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/order/:id" component={OrderScreen}/>
                    <Route path="/products" component={ProductsScreen} />
                    <Route path="/shipping" component={ShippingScreen}/>
                    <Route path="/payment" component={PaymentScreen}/>
                    <Route path="/placeorder" component={PlaceOrderScreen}/>
                    <Route path="/signin" component={SigninScreen}/>
                    <Route path="/register" component={RegisterScreen}/>
                    <Route path="/product/:id" exact component={ProductScreen}/>
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/" exact component={HomeScreen}/>
                </div>
            </main>
            <footer className="footer">
            Copyright © 2020 ETravel.
            </footer>
        </div>
    </BrowserRouter>
    );
}

export default App;
