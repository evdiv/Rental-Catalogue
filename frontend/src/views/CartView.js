import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Badge, Table, Alert, Button} from 'react-bootstrap'
import { removeFromCart } from '../actions/cartActions'
import RentalTerm from '../components/RentalTerm'

const CartView = () => {
    const {cartProducts} = useSelector(state => state.cart)
    const totalQty = cartProducts.reduce((total, p) => total + p.qty, 0)
    const totalPrice = cartProducts.reduce((price, p) => price + (p.rentalRate * p.qty), 0)

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
                                {cartProducts.map(p => (
                                    <tr key={`${p.productsID}-${p.days}-${p.qty}`}>
                                        <td>{p.productSku}</td>
                                        <td><Link to={`/products/${p.productsID}`}>
                                                {p.brandName} / {p.productName}
                                            </Link>
                                        </td>
                                        <td>{p.qty}</td>
                                        <td><RentalTerm term={p.days} /></td>
                                        <td><Badge pill bg="danger" style={{cursor: 'pointer'}}
                                            onClick={() => {
                                                removeFromCartHandler({ id: p.productsID, days: p.days, qty: p.qty})
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
                        <Link to='/checkout'>
                            <Button size="lg">Proceed to Checkout</Button>
                        </Link>
                    </Alert>
               }
            </Col>
       </Row>
   )
}

export default CartView