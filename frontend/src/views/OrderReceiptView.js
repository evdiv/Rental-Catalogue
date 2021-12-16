import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Alert, Row, Col, Button} from 'react-bootstrap'
import { getAccount } from '../actions/accountActions'
import { getOrder } from '../actions/orderActions'
import RentalTerm from '../components/RentalTerm'

const OrderReceiptView = (props) => {

    const { details } = useSelector(state => state.account)
    const { orderDetails } = useSelector(state => state.order)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAccount())
        dispatch(getOrder(props.match.params.id))
    }, [])

    useEffect(() => { 
        if (details.email === undefined) {
            props.history.push('/login')
        }
    }, [details.email])


   return (
    <>
       <Row className="justify-content-md-center">
            <Col md={6}>
                <h3>Order {orderDetails.ordersID} Receipt</h3>

               <Alert variant="light">
                   <b>Shipping Name:</b><br />
                   {details.firstName} {details.lastName}<br /><br />

                   <b>Shipping Address:</b> <br/>
                   {details.homeAddress}, {details.homeCity}<br/>
                   {details.provinceName}, {details.postalCode}
               </Alert>
            </Col>
            <Col md={6}>
                <h3>Payment Details</h3>

                   <Alert variant="light">
                       <Row>
                           <Col className="text-end" md={10}>Sub Total:</Col>
                           <Col md={2}>{orderDetails.orderSubTotal ? '$' + orderDetails.orderSubTotal : 'free'}</Col>

                           {orderDetails.taxValue1 > 0 &&
                               <>
                                   <Col className="text-end" md={10}>Taxes {orderDetails.taxCode1}:</Col>
                                   <Col md={2}>${orderDetails.taxValue1}</Col>
                               </>
                           }

                           {orderDetails.taxValue2 > 0 &&
                               <>
                                   <Col className="text-end" md={10}>Taxes {orderDetails.taxCode2}:</Col>
                                   <Col md={2}>${orderDetails.taxValue2}</Col>
                               </>
                           }

                           <Col className="text-end" md={10}>Shipping:</Col>
                           <Col md={2}>{orderDetails.shipping ? '$' + orderDetails.shipping : 'free'}</Col>
                           <Col md={2}>{orderDetails.shippingInsurance ? '$' + orderDetails.shippingInsurance : 'No insurance'}</Col>
                           <Col className="text-end" md={10}>Total:</Col>
                           <Col md={2}>{orderDetails.orderTotal ? '$' + orderDetails.orderTotal : 'free'}</Col>
                       </Row>
                   </Alert>
            </Col>

        </Row>

        <Row>
           <Col>
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
                        
                    </tbody>
                </Table>
           </Col>
        </Row>

        <Row className="justify-content-md-center" style={{ marginTop: '50px' }}>          
            <Col className="text-end">
                <Button variant="success" size="lg">Back to My Account</Button>
            </Col>
        </Row>
    </>
   )
}

export default OrderReceiptView