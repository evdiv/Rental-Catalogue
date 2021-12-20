import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, Badge} from 'react-bootstrap'
import { LogoutAccount } from '../actions/accountActions'

const Header = () => {
    const { cartProducts } = useSelector(state => state.cart)
    const { details } = useSelector(state => state.account)
    const qty = cartProducts.reduce((total, p) => total + p.qty, 0)

    const dispatch = useDispatch()
    const logOutHandler = () => {
        dispatch(LogoutAccount())
    }
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Rental Catalogue</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="me-auto">
                        <LinkContainer to="/departments">
                            <Nav.Link>Departments</Nav.Link>
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
                        { details.accountsID 
                            ? <>
                            <LinkContainer to="/account">
                                <Nav.Link><i className="fas fa-user"></i> My Account</Nav.Link>
                            </LinkContainer>
                                <Nav.Link onClick={logOutHandler}><i className="fa-solid fa-right-from-bracket"></i> Log Out</Nav.Link>
                            </>
                            :
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-sign-out"></i> Log In</Nav.Link>
                            </LinkContainer>
                        }
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