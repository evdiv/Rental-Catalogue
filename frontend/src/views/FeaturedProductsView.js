import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'
import { featuredProducts } from '../actions/productActions'

const FeaturedProductsView = () => {
    const dispatch = useDispatch()

    const productsList = useSelector(state => state.featuredProducts)
    const { loading, error, products } = productsList

    useEffect(() => {
        dispatch(featuredProducts())
    }, [dispatch])

    return (
        <>        
            <h3>Featured Products</h3>
            {loading ? <h3>Loading ...</h3> : error ? <h3>{error}</h3> : (
                <Row>
                    {products.map(p => (
                        <Col key={p.ProductsID} sm={12} md={3} lg={2} >
                            <ProductPreView product={p} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default FeaturedProductsView

