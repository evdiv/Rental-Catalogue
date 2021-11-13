import React from 'react'
import { useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, Badge} from 'react-bootstrap'

const Header = () => {
    const {cartProducts} = useSelector(state => state.cart)
    const qty = cartProducts.reduce((total, p) => total + p.qty, 0)

    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Rental Catalogue</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="me-auto">
                        <LinkContainer to="/products">
                            <Nav.Link>Products</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/return">
                            <Nav.Link>Return Policy</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/support">
                            <Nav.Link>Support</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/location">
                            <Nav.Link>Store Location</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    <Nav>
                        <LinkContainer to="/login">
                            <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to="/cart">
                            <Nav.Link><i className="fas fa-shopping-cart"></i> View Cart &nbsp;
                                <Badge pill bg="danger"> {qty} </Badge>
                            </Nav.Link>
                        </LinkContainer>                        
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header