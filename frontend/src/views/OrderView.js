import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Alert, Row, Col, Button} from 'react-bootstrap'
import { getAccount } from '../actions/accountActions'
import { stageOrder, completeOrder, updateShippingInsurance } from '../actions/orderActions'
import RentalTerm from '../components/RentalTerm'

const OrderView = (props) => {

    const { details } = useSelector(state => state.account)
    const { cartProducts } = useSelector(state => state.cart)
    const { orderDetails } = useSelector(state => state.order)

    const [shippingInsurance, setShippingInsurance] = useState(orderDetails.shippingInsurance)
    const [paymentMethod, setPaymentMethod] = useState('cc')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAccount())
        dispatch(stageOrder())
    }, [])

    useEffect(() => { 
        if (details.email === undefined) {
            props.history.push('/login')
        }
    }, [details.email])

    const submitOrderHandler = () => {
        //*********************************** */
        //In the production app there should be callbacks from payment providers
        //Paypal
        //Stripe, Chase etc...
        // 
        // In the production app the transAmount will be received by server directly from the Payment providers
        const transaction = {
            status: 'success',
            transAmount: paymentMethod !== 'etransfer' ? orderDetails.orderTotal : 0,
            paymentMethod
        }
        dispatch(completeOrder(transaction))
        props.history.push(`/receipt/${orderDetails.ordersID}`)
    }

    const paymentMethodHandler = (paymentMethod) => {
        setPaymentMethod(paymentMethod)
    }

    const shippingInsuranceHandler = (shippingInsurance)=> {
        setShippingInsurance(shippingInsurance)
        dispatch(updateShippingInsurance(shippingInsurance))
    }

   return (
    <>
       <Row className="justify-content-md-center">
            <Col md={8}>
               <h3>Confirm your order</h3>

               <Alert variant="light">
                   <b>Shipping Name:</b><br />
                   {details.firstName} {details.lastName}<br /><br />

                   <b>Shipping Address:</b> <br/>
                   {details.homeAddress}, {details.homeCity}<br/>
                   {details.provinceName}, {details.postalCode}
               </Alert>
            </Col>
            <Col md={4}>
                <h3>Payment Details</h3>

                <Alert variant="light">
                    <Form>
                       <Form.Check
                            onChange={() => paymentMethodHandler('cc')}
                            type="radio"
                            checked={paymentMethod === 'cc'}
                            label="Visa/MasterCard/American Express"
                       />
                       <Form.Check
                            onChange={() => paymentMethodHandler('paypal')}
                            type="radio"
                            checked={paymentMethod === 'paypal'}
                            label="PayPal"
                       />
                       <Form.Check
                            onChange={() => paymentMethodHandler('etransfer')}
                            type="radio"
                            checked={paymentMethod === 'etransfer'}
                            label="Email Money Transfer"
                       />
                    </Form>
                </Alert>
            </Col>
        </Row>

        <Row>
           <Col>
               {cartProducts.length === 0
                   ? <p>Your Cart is empty</p>
                   : (
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
                               {cartProducts.map(p => (
                                   <tr key={`${p.productsID}-${p.days}-${p.qty}`}>
                                       <td>{p.productSku}</td>
                                       <td><Link to={`/products/${p.productsID}`}>
                                           {p.brandName} / {p.productName}
                                       </Link>
                                       </td>
                                       <td>{p.qty}</td>
                                       <td><RentalTerm term={p.days} /></td>
                                   </tr>
                               ))}
                           </tbody>
                       </Table>
                   )
               }
           </Col>
        </Row>

        <Row className="justify-content-md-center">
            <Col>
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
                        <Col className="text-end" md={10}>
                            <Form.Check 
                                   checked={shippingInsurance}
                                   onChange={() => shippingInsuranceHandler(!shippingInsurance)}
                                type="checkbox" 
                                style={{float: "right"}} 
                                label="YES, I would like Shipping Insurance - 100% Coverage for Damage or Loss" />
                        </Col>
                           <Col md={2}>{orderDetails.shippingInsurance ? '$' + orderDetails.shippingInsurance : 'No insurance'}</Col>
                        <Col className="text-end" md={10}>Total:</Col>
                           <Col md={2}>{orderDetails.orderTotal ? '$' + orderDetails.orderTotal : 'free'}</Col>
                    </Row>
                </Alert>
            </Col>
        </Row>


        <Row className="justify-content-md-center" style={{ marginTop: '50px' }}>
            <Col>
                <Link to="/cart">
                    <Button variant="primary" size="lg">
                        Edit Order Details
                    </Button>
                </Link>
            </Col>
            
            <Col className="text-end">
                <Button
                    onClick={() => submitOrderHandler()}
                    variant="success"
                    size="lg"
                    type="submit">
                    Process Payment
                </Button>
            </Col>
        </Row>
    </>
   )
}

export default OrderView