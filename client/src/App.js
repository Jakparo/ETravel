import React, { useState } from 'react';
import{ Collapse, Navbar, NavbarToggler,
        NavbarBrand, Nav, NavItem,
        UncontrolledDropdown, DropdownToggle, 
        DropdownMenu, DropdownItem, Container
} from 'reactstrap';  
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// Import Screen Components
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

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    
    return (
    <BrowserRouter>
        <div>
            <Navbar light expand="sm" style={{backgroundColor: 'ffffff'}}>
                <Container fluid>
                    <NavbarBrand href="/" className="brand">
                        <Link to="/">ETravel <img src={url} width={32} height={32}/> </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar className="ml-sm-auto">
                            <NavItem className='header-links'>
                                <Link to ="/cart">Cart</Link>
                                {
                                    userInfo ? <Link to="/profile">{userInfo.name}</Link>:
                                    <Link to ="/signin">Log in</Link>
                                }
                                { userInfo && userInfo.isAdmin && (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Manage
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <Link to="/orders">Orders</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link to="/products">Products</Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown> 
                                )}
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem> */}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            <main>
                <Container fluid style={{marginTop: '2rem'}} className='h-75'>
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
                </Container>
            </main>
            {/* <footer>
                <div className='b-0'>
                    Copyright © 2020 ETravel
                </div>
            </footer> */}
                
        </div>
    </BrowserRouter>
    );
}

export default App;
