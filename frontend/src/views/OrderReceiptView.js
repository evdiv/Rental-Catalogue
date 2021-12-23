import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Alert, Row, Col, Button} from 'react-bootstrap'
import { getAccount } from '../actions/accountActions'
import { getReceipt } from '../actions/orderReceiptActions'
import { AlertMsg } from '../components/AlertMsg'
import { Loader } from '../components/Loader'
import DateConverter from '../components/DateConverter'
import RentalTerm from '../components/RentalTerm'
import PaymentType from '../components/PaymentType'


const OrderReceiptView = (props) => {

    const { details } = useSelector(state => state.account)
    const { orderReceipt: { orderDetails, orderProducts }, loading, error } = useSelector(state => state.receipt)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAccount())
        dispatch(getReceipt(props.match.params.id))
    }, [])

    useEffect(() => {
        if (details.email === undefined) {
            props.history.push('/login')
        }
    }, [details.email])

   return (
    <>
    {loading ? <Loader /> : error ? <AlertMsg msg={error} variant="danger" /> : ''}
    {orderDetails &&
       <Row className="justify-content-md-center">
            <Col md={6}>
                <h3>Order Receipt</h3>

                <Alert variant="light">
                    <b>Order Date:</b> {orderDetails.orderDate && <DateConverter orderDate={orderDetails.orderDate} />} <br /><br />

                    <b>Shipping Name:</b><br />
                    {orderDetails.firstName} {orderDetails.lastName}<br /><br />

                    <b>Shipping Address:</b> <br/>
                    {orderDetails.homeAddress}, {orderDetails.homeCity}, {orderDetails.provinceName}, {orderDetails.postalCode}
                </Alert>
            </Col>

            <Col md={6}>
                <h3>Payment Details</h3>

                <Alert variant="light">
                    <Row>
                        <Col md={12}>
                            <b>Payment Method:</b> <PaymentType payment={orderDetails.paymentMethod} />
                        </Col>

                        <Col className="text-end" md={10}>Sub Total:</Col>
                        <Col md={2}>{orderDetails.orderSubTotal ? '$' + orderDetails.orderSubTotal : 'free'}</Col>

                        {+orderDetails.taxValue1 > 0 &&
                            <>
                                <Col className="text-end" md={10}>Taxes {orderDetails.taxCode1}:</Col>
                                <Col md={2}>${orderDetails.taxValue1}</Col>
                            </>
                        }

                        {+orderDetails.taxValue2 > 0 &&
                            <>
                                <Col className="text-end" md={10}>Taxes {orderDetails.taxCode2}:</Col>
                                <Col md={2}>${orderDetails.taxValue2}</Col>
                            </>
                        }

                        <Col className="text-end" md={10}>Shipping:</Col>
                        <Col md={2}>{orderDetails.shipping ? '$' + orderDetails.shipping : 'free'}</Col>

                        {+orderDetails.shippingInsurance > 0 &&
                            <>
                                <Col className="text-end" md={10}>Shipping Insurance:</Col>
                                <Col md={2}>${orderDetails.shippingInsurance}</Col>
                            </>
                        }

                        <Col className="text-end" md={10}>Total:</Col>
                        <Col md={2}>{orderDetails.orderTotal ? '$' + orderDetails.orderTotal : 'free'}</Col>
                    </Row>
                </Alert>
            </Col>

            <Col md={12}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Brand/Product name</th>
                            <th>Qty</th>
                            <th>Rent term</th>
                        </tr>
                    </thead>
                    <tbody>
                           {orderProducts.map(p => (
                                <tr key={p.shoppingCartID}>
                                    <td>{p.productSku}</td>
                                    <td>{p.brandName}/{p.productName}</td>
                                    <td>{p.qty}</td>
                                    <td>{p.days && <RentalTerm term={p.days} />}</td>
                                </tr>)
                           )}
                    </tbody>
                </Table>
            </Col>

            <Col md={12} className="text-end">
                <Link to='/account'>
                    <Button variant="success" size="lg">Back to My Account</Button>
                </Link>
            </Col>
        </Row>
    }
    </>
   )
}

export default OrderReceiptView