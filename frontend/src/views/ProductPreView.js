import React from 'react'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

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

                <Card.Text as='h6'>Rental rate: ${product.rentalRate}/day</Card.Text>

            </Card.Body>
        </Card>
    )
}

export default ProductPreView