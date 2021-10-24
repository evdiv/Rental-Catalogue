import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

const AddToCart = ({product}) => {
    const [qty, setQty] = useState(1)
    const [days, setDays] = useState(1)
    const [rentTerm, setRentTerm] = useState(1)

    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addToCart({ product, qty, days: (days * rentTerm)}))
    }

    return (
        <Form>
            <Row>
                <Form.Group as={Col} md={3}>
                    <Form.Label>Enter a number</Form.Label>
                    <Form.Control type="number" value={qty} onChange={e => setQty(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} md={2}>
                    <Form.Label>Rent term</Form.Label>
                    <Form.Control type="number" value={days} onChange={e => setDays(e.target.value)} />
                </Form.Group>


                <Form.Group as={Col} md={7}>
                    <Form.Label>Choose rent term...</Form.Label>
                    <Form.Select defaultValue="1" onChange={e => setRentTerm(e.target.value)}>
                        <option value="1">Days</option>
                        <option value="7">Weeks</option>
                        <option value="30">Months</option>
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

