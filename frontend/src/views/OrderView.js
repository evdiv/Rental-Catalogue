import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Alert, Row, Col, Button} from 'react-bootstrap'
import { getAccount } from '../actions/accountActions'
import { stageOrder, completeOrder, setShippingInsurance } from '../actions/orderActions'
import RentalTerm from '../components/RentalTerm'

const OrderView = (props) => {

    const { details } = useSelector(state => state.account)
    const { cartProducts } = useSelector(state => state.cart)
    const { orderDetails } = useSelector(state => state.order)

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
        dispatch(completeOrder())
    }

    const handleShippingInsurance = (shippingInsurance) => {
        dispatch(setShippingInsurance({ shippingInsurance }))
    }

    const paymentMethodHandler = (paymentMethod) => {

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
                            onClick={() => paymentMethodHandler('cc')}
                            type="radio"
                            label="Visa/MasterCard/American Express"
                       />
                       <Form.Check
                            onClick={() => paymentMethodHandler('paypal')}
                            type="radio"
                            label="PayPal"
                       />
                       <Form.Check
                            onClick={() => paymentMethodHandler('etransfer')}
                            type="radio"
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
                               {cartProducts.map(i => (
                                   <tr key={`${i.product.ProductsID}-${i.days}-${i.qty}`}>
                                       <td>{i.product.ProductSku}</td>
                                       <td><Link to={`/products/${i.product.ProductsID}`}>
                                           {i.product.BrandName} / {i.product.ProductName}
                                       </Link>
                                       </td>
                                       <td>{i.qty}</td>
                                       <td><RentalTerm term={i.days} /></td>
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
                        <Col md={2}>${orderDetails.subTotalPrice}</Col>
                        <Col className="text-end" md={10}>Taxes:</Col>
                        <Col md={2}></Col>
                           {orderDetails.taxes.forEach(el => {
                               <>
                               <Col className="text-end" md={10}>{el.taxName}</Col>
                               <Col md={2}>${el.taxPrice}</Col>
                               </>
                           })}
                        <Col className="text-end" md={10}>Shipping:</Col>
                        <Col md={2}>${orderDetails.shippinglPrice}</Col>
                        <Col className="text-end" md={10}>
                            <Form.Check 
                                   checked={orderDetails.shippingInsurance}
                                   onChange={(e) => handleShippingInsurance(e.target.value)}
                                type="checkbox" 
                                style={{float: "right"}} 
                                label="YES, I would like Shipping Insurance - 100% Coverage for Damage or Loss" />
                        </Col>
                        <Col md={2}>${orderDetails.shippinglInsurance}</Col>
                        <Col className="text-end" md={10}>Total:</Col>
                        <Col md={2}>${orderDetails.totalPrice}</Col>
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