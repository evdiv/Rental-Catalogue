import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image} from 'react-bootstrap'
import { getSingleProduct } from '../actions/productActions'
import { hideCartConfirmation } from '../actions/cartActions'
import Breadcrumbs from '../components/Breadcrumbs'
import AddToCart from '../components/AddToCart'
import { AlertMsg } from '../components/AlertMsg'
import dotenv from 'dotenv'


const ProductView = ({match}) => {

    const [confirmation, setConfirmation] = useState('')

    const { product, loading, error } = useSelector(state => state.singleProduct)
    const { newProductAdded } = useSelector(state => state.cart)

    const dispatch = useDispatch()

    useEffect(() => {
        dotenv.config()
        dispatch(getSingleProduct(match.params.id))
    }, [])

    useEffect(() => {
        if (newProductAdded){
            setConfirmation("Product has been added to the Shopping Cart")
        }
        return (() => {
            dispatch(hideCartConfirmation())
        })
    }, [newProductAdded])

    return (
        <>  
            {loading ? <h3>Loading ...</h3> : error ? <AlertMsg msg={error} variant="danger"/> : ''}
            { product.brandName !== undefined && <Breadcrumbs product={product} />}

            {confirmation !== '' ? <AlertMsg msg={confirmation} variant="success" /> : ''}
            <Row>
                <Col sm={12}><h3>{product.brandName} {product.productName}</h3></Col>
                <Col md={6}>
                    <Image src={`/images/products/${product.image1}`} rounded fluid/>
                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={3}>SKU: {product.productSku}</Col>
                        <Col md={3}>Model: {product.productModel}</Col>
                    </Row>

                    <h4 style={{marginTop: 30, marginBottom: 20}}>Your Price: </h4>
                    <h6>1 Day: ${product.rentalRate} CDN</h6>
                    <h6>1 Week: ${product.rentalRate * process.env.DISCOUNT_WEEK} CDN</h6>
                    <h6>1 Month: ${product.rentalRate * process.env.DISCOUNT_MONTH} CDN</h6>

                    <p style={{ marginTop: 20, marginBottom: 30}}>{product.description}</p>

                    <AddToCart product={product}/>
                </Col>
            </Row>
        </>
    )
}

export default ProductView