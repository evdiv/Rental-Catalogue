import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'
import { getOnSaleProducts } from '../actions/productActions'
import { Loader } from '../components/Loader'
import { AlertMsg } from '../components/AlertMsg'


const OnSaleProductsView = () => {
    const { loading, error, products } = useSelector(state => state.onSaleProducts)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOnSaleProducts())
    }, [dispatch])

    return (
        <>        
            <h4>On Sale Products</h4>
            {loading ? <Loader /> : error ? <AlertMsg msg={error} variant="danger" /> : (
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

export default OnSaleProductsView

