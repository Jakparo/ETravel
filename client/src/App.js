import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import { useSelector } from 'react-redux';

function App() {

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
                    <Link to="/">ETravel</Link>
                </div>
                <div className="header-links">
                    <Link to ="/cart">Cart</Link>
                    {
                        userInfo ? <Link to="/profile">{userInfo.name}</Link>:
                        <Link to ="/signin">Login</Link>
                    }
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
                    <Route path="/signin" component={SigninScreen}/>
                    <Route path="/register" component={RegisterScreen}/>
                    <Route path="/product/:id" exact component={ProductScreen}/>
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/" exact component={HomeScreen}/>
                </div>
            </main>
            <footer className="footer">
                All right reserved.
            </footer>
        </div>
    </BrowserRouter>
    );
}

export default App;
