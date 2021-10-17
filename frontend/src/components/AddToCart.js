import React from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'


const AddToCart = ({product}) => {
    return (
        <Form>
            <Row>
                <Form.Group as={Col} md={3}>
                    <Form.Label>Enter a number</Form.Label>
                    <Form.Control type="number" />
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
                    <Button style={{ marginTop: 20, marginBottom: 30 }} variant="primary">Add to Cart</Button>
                </Form.Group>

            </Row>
        </Form>
    )
}

export default AddToCart

