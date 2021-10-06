import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'

const FeaturedProductsView = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/v1/products')
            setProducts(response.data)
        }
        fetchProducts()
    }, [])

    return (
        <>        
            <h3>Featured Products</h3>
            <Row>
                {products.map(p => (
                    <Col key={p._id} sm={12} md={3} lg={2} >
                        <ProductPreView product={p}/>
                    </Col>
                )) }
            </Row>
        </>

    )
}

export default FeaturedProductsView

