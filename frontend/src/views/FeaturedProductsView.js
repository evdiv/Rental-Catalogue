import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'
import { getFeaturedProducts } from '../actions/productActions'

const FeaturedProductsView = () => {
    const { loading, error, products } = useSelector(state => state.featuredProducts)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFeaturedProducts())
    }, [dispatch])

    return (
        <>        
            <h4>Featured Products</h4>
            {loading ? <h5>Loading ...</h5> : error ? <h5>{error}</h5> : (
                <Row>
                    {products.map(p => (
                        <Col key={p.productsID} sm={12} md={3} lg={2} >
                            <ProductPreView product={p} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default FeaturedProductsView

