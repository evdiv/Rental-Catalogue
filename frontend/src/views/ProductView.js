import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Row, Col, Image, Form, Button} from 'react-bootstrap'
import Breadcrumbs from '../components/Breadcrumbs'

const ProductView = ({match}) => {
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`/api/v1/products/${match.params.id}`)
            setProduct(response.data[0])
        }
        fetchProduct()
    }, [match.params.id])

    return (
        <>  
            { product.BrandName !== undefined && <Breadcrumbs brand={product.BrandName} productName={product.ProductName} />}
            <Row>
                <Col sm={12}><h3>{product.BrandName} {product.ProductName}</h3></Col>
                <Col md={6}>
                    <Image src={`/images/products/${product.Image1}`} rounded fluid/>
                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={3}>SKU: {product.ProductSku}</Col>
                        <Col md={3}>Model: {product.ProductModel}</Col>
                    </Row>

                    <h4 style={{marginTop: 30, marginBottom: 20}}>Your Price: </h4>
                    <h6>1 Day: ${product.DailyRentalRate} CDN</h6>
                    <h6>1 Week: ${product.WeeklyRentalRate} CDN</h6>
                    <h6>1 Month: ${product.MonthlyRentalRate} CDN</h6>

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