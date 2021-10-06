import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Row, Col, Image, Form, Button} from 'react-bootstrap'
import Breadcrumbs from '../components/Breadcrumbs'

const ProductView = ({match}) => {
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`/api/v1/products/${match.params.id}`)
            setProduct(response.data)
        }
        fetchProduct()
    }, [match.params.id])

    return (
        <>  
            {product.brand !== undefined && <Breadcrumbs brand={product.brand} productName={product.name} />}
            <Row>
                <Col sm={12}><h3>{product.brand} {product.name}</h3></Col>
                <Col md={6}>
                    <Image src={`/images/products/${product.image}`} rounded fluid/>
                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={3}>SKU: {product.sku}</Col>
                        <Col md={3}>Model: {product.model}</Col>
                    </Row>

                    <h4 style={{marginTop: 30, marginBottom: 20}}>Your Price: </h4>
                    <h6>1 Day: ${product.dayPrice} CDN</h6>
                    <h6>1 Week: ${product.weekPrice} CDN</h6>
                    <h6>1 Month: ${product.monthPrice} CDN</h6>

                    <p style={{ marginTop: 20, marginBottom: 30}}>{product.description}</p>

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


                    
                        

                </Col>
            </Row>
        </>
    )
}

export default ProductView