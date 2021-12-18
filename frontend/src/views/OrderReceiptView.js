import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Alert, Row, Col, Button} from 'react-bootstrap'
import { getAccount } from '../actions/accountActions'
import { getReceipt } from '../actions/orderReceiptActions'
import RentalTerm from '../components/RentalTerm'

const OrderReceiptView = (props) => {

    const { orderReceipt } = useSelector(state => state.receipt)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAccount())
        dispatch(getReceipt(props.match.params.id))
    }, [])

    useEffect(() => { 
        if (orderReceipt.email === undefined) {
            props.history.push('/login')
        }
    }, [orderReceipt.email])


   return (
    <>
       <Row className="justify-content-md-center">
            <Col md={6}>
                <h3>Order {orderReceipt.ordersID} Receipt</h3>

               <Alert variant="light">
                   <b>Shipping Name:</b><br />
                   {orderReceipt.firstName} {orderReceipt.lastName}<br /><br />

                   <b>Shipping Address:</b> <br/>
                   {orderReceipt.homeAddress}, {orderReceipt.homeCity}<br/>
                   {orderReceipt.provinceName}, {orderReceipt.postalCode}
               </Alert>
            </Col>
            <Col md={6}>
                <h3>Payment Details</h3>

                   <Alert variant="light">
                       <Row>
                           <Col className="text-end" md={10}>Sub Total:</Col>
                           <Col md={2}>{orderReceipt.orderSubTotal ? '$' + orderReceipt.orderSubTotal : 'free'}</Col>

                           {orderReceipt.taxValue1 > 0 &&
                               <>
                                   <Col className="text-end" md={10}>Taxes {orderReceipt.taxCode1}:</Col>
                                   <Col md={2}>${orderReceipt.taxValue1}</Col>
                               </>
                           }

                           {orderReceipt.taxValue2 > 0 &&
                               <>
                                   <Col className="text-end" md={10}>Taxes {orderReceipt.taxCode2}:</Col>
                                   <Col md={2}>${orderReceipt.taxValue2}</Col>
                               </>
                           }

                           <Col className="text-end" md={10}>Shipping:</Col>
                           <Col md={2}>{orderReceipt.shipping ? '$' + orderReceipt.shipping : 'free'}</Col>
                           <Col md={2}>{orderReceipt.shippingInsurance ? '$' + orderReceipt.shippingInsurance : 'No insurance'}</Col>
                           <Col className="text-end" md={10}>Total:</Col>
                           <Col md={2}>{orderReceipt.orderTotal ? '$' + orderReceipt.orderTotal : 'free'}</Col>
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