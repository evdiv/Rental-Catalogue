import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image} from 'react-bootstrap'
import { getSingleProduct } from '../actions/productActions'
import Breadcrumbs from '../components/Breadcrumbs'
import AddToCart from '../components/AddToCart'

const ProductView = ({match}) => {

    const { product, loading, error } = useSelector(state => state.singleProduct)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleProduct(match.params.id))
    }, [dispatch, match.params.id])

    return (
        <>  
            {loading ? <h3>Loading ...</h3> : error ? <h3>{error}</h3> : ''}
            { product.BrandName !== undefined && <Breadcrumbs product={product} />}
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

                    <AddToCart product={product}/>
                </Col>
            </Row>
        </>
    )
}

export default ProductView