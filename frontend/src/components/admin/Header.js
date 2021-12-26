import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar } from 'react-bootstrap'
import { LogoutAccount } from '../../actions/accountActions'

const Header = () => {
    const { details } = useSelector(state => state.admin)

    const dispatch = useDispatch()
    const logOutHandler = () => {
        dispatch(LogoutAccount())
    }
    return (
        <header>
            <Navbar bg="info" variant="dark">
                <Container>
                    <LinkContainer to="/admin">
                        <Navbar.Brand>Admin Panel</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="me-auto">
                        {details.adminID && 
                            <>
                            <LinkContainer to="/admin/orders">
                                <Nav.Link>Orders</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/admin/users">
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/admin/products">
                                <Nav.Link>Products</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/admin/departments">
                                <Nav.Link>Departments</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/admin/brands">
                                <Nav.Link>Brands</Nav.Link>
                            </LinkContainer>
                            </>
                        }
                    </Nav>

                    <Nav>
                        { details.adminID &&
                            <>
                            <LinkContainer to="/admin/account">
                                <Nav.Link><i className="fas fa-user"></i> My Account</Nav.Link>
                            </LinkContainer>
                                <Nav.Link onClick={logOutHandler}><i className="fa-solid fa-right-from-bracket"></i> Log Out</Nav.Link>
                            </>
                        }                     
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header