import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Badge, Table, Alert, Button} from 'react-bootstrap'
import { removeFromCart } from '../actions/cartActions'
import RentalTerm from '../components/RentalTerm'

const CartView = () => {
    const {cartProducts} = useSelector(state => state.cart)
    const totalQty = cartProducts.reduce((total, p) => total + p.qty, 0)
    const totalPrice = cartProducts.reduce((price, p) => price + (p.product.DailyRentalRate * p.qty), 0)

    const dispatch = useDispatch()

    const removeFromCartHandler = (rentalProduct) => {
        dispatch(removeFromCart(rentalProduct))
    }

   return (
       <Row>
           <h3>Shopping Cart</h3>
            <Col md={8}>
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
                                    <th></th>
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
                                        <td><Badge pill bg="danger" 
                                            onClick={() => {
                                                removeFromCartHandler({ id: i.product.ProductsID, days: i.days, qty: i.qty})
                                            }}>
                                                <i className="fa fa-times" aria-hidden="true"></i>
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                }
            </Col>

            <Col md={4}>
               {cartProducts.length > 0 && 
                    <Alert variant={'warning'}>
                   <p>Cart subtotal ({totalQty} {totalQty > 1 ? 'items' : 'item'}):  <b>${totalPrice.toFixed(2)}</b></p>
                        <Button>Proceed to Checkout</Button>
                    </Alert>
               }
            </Col>
       </Row>
   )
}

export default CartView

