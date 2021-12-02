import React from 'react'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import dotenv from 'dotenv'

dotenv.config()

const ProductPreView = ({product}) => {
    return (
        <Card className="p-2 my-2 rounded">
            <Link to={`/products/${product.productsID}`}>
                <Card.Img src={`/images/products/${product.image1}`} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/products/${product.productsID}`}>
                    <Card.Title>{product.productName}</Card.Title>
                </Link>

                <Card.Text className='my-2'>
                    <small className="text-muted"> 
                        Product Reviews({product.reviewCount} Reviews)
                    </small>
                </Card.Text>

                <Card.Text as='h6'>1 Day ${product.rentalRate}</Card.Text>
                <Card.Text as='h6'>1 Week ${product.rentalRate * process.env.DISCOUNT_WEEK}</Card.Text>
                <Card.Text as='h6'>1 Month ${product.rentalRate * process.env.DISCOUNT_MONTH}</Card.Text>

            </Card.Body>
        </Card>
    )
}

export default ProductPreView