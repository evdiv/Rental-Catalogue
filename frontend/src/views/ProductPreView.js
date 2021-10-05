import React from 'react'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

const ProductPreView = ({product}) => {
    return (
        <Card className="p-2 my-2 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={`/images/products/${product.image}`} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>

                <Card.Text className='my-2'>
                    <small className="text-muted"> 
                        Product Reviews({product.numReviews} Reviews)
                    </small>
                </Card.Text>

                <Card.Text as='h6'>1 Day ${product.dayPrice}</Card.Text>
                <Card.Text as='h6'>1 Week ${product.weekPrice}</Card.Text>
                <Card.Text as='h6'>1 Month ${product.monthPrice}</Card.Text>

            </Card.Body>
        </Card>
    )
}

export default ProductPreView