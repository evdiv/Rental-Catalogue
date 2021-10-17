import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'
import { getBrandProducts } from '../actions/productActions'

const BrandProductsView = ({ match }) => {
    const { loading, error, products } = useSelector(state => state.brandProducts)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBrandProducts(match.params.id))
    }, [dispatch, match.params.id])

    return (
        <>        
            <h3>Products</h3>
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

export default BrandProductsView

