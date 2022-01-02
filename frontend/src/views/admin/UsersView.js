import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Table } from 'react-bootstrap'
import { AlertMsg } from '../../components/AlertMsg'
import { Loader } from '../../components/Loader'
import { getAllUsers } from '../../actions/admin/usersActions'


const UsersView = () => {

    const { loading, error, users } = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <h3>Registered users</h3>
                {loading ? <Loader /> : error && <AlertMsg msg={error} variant="danger" />}
                {users &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Accound Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>City/Province</th>
                                <th>Postal Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.accountsID}>
                                    <td><Link to={`/admin/users/${u.accountsID}`}>{u.accountsID}</Link></td>
                                    <td>{u.firstName}</td>
                                    <td>{u.lastName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.homeAddress}</td>
                                    <td>{u.homeCity}/{u.provinceName}</td>
                                    <td>{u.postalCode}</td>
                                </tr>)
                            )}
                        </tbody>
                    </Table>
                }
            </Col>
        </Row>
    )
}

export default UsersView
