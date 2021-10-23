import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

const AddToCart = ({product}) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addToCart({ id: product.ProductsID, qty}))
    }

    return (
        <Form>
            <Row>
                <Form.Group as={Col} md={3}>
                    <Form.Label>Enter a number</Form.Label>
                    <Form.Control type="number" value={qty} onChange={e => setQty(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} md={9}>
                    <Form.Label>Choose rent term...</Form.Label>
                    <Form.Select defaultValue="day">
                        <option value="day">Days</option>
                        <option value="week">Weeks</option>
                        <option value="month">Months</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md={12}>
                    <Button 
                        onClick={addToCartHandler} 
                        disabled={product.StockAvail < 1}
                        style={{ marginTop: 20, marginBottom: 30 }} 
                        variant="primary">Add to Cart</Button>
                </Form.Group>

            </Row>
        </Form>
    )
}

export default AddToCart

