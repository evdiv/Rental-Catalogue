import React from 'react'
import {Container, Nav, Navbar, Badge} from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Rental Catalogue</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/products">Products</Nav.Link>
                        <Nav.Link href="/return">Return Policy</Nav.Link>
                        <Nav.Link href="/support">Support</Nav.Link>
                        <Nav.Link href="/location">Store Location</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/signin"><i className="fas fa-user"></i> Sign In</Nav.Link>
                        <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> View Cart &nbsp;
                            <Badge pill bg="danger"> 0 </Badge>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header