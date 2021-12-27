import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table } from 'react-bootstrap'
import { AlertMsg } from '../../components/AlertMsg'
import { Loader } from '../../components/Loader'
import DateConverter from '../../components/DateConverter'
import { getAllOrders } from '../../actions/admin/ordersActions'


const OrdersView = () => {

    const { loading, error, orders } = useSelector(state => state.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <h3>Recently placed Orders</h3>
                {loading ? <Loader /> : error && <AlertMsg msg={error} variant="danger" />}
                { orders &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Order Date</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City / Province</th>
                                <th>Total</th>
                                <th>Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o.ordersID}>
                                    <td>{o.ordersID}</td>
                                    <td><DateConverter orderDate={o.orderDate} /></td>
                                    <td>{o.firstName} {o.lastName}</td>
                                    <td>{o.email}</td>
                                    <td>{o.homePhone}</td>
                                    <td>{o.homeCity}/{o.provinceName}</td>
                                    <td>{o.orderTotal}</td>
                                    <td>{o.transAmount > 0 
                                        ? <i style={{color: 'green'}} class="fa fa-check-circle" aria-hidden="true"></i> 
                                        : <i style={{color: 'red'}} class="fa fa-exclamation-circle" aria-hidden="true"></i>}</td>
                                </tr>)
                            )}
                        </tbody>
                    </Table>
                }
            </Col>
        </Row>
    )
}

export default OrdersView
