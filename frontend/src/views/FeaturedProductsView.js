import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'
import products from '../products-static-data'

const FeaturedProductsView = () => {
    return (
        <>        
            <h3>Featured Products</h3>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={3} lg={2} >
                        <ProductPreView product={product}/>
                    </Col>
                )) }
            </Row>
        </>

    )
}

export default FeaturedProductsView

