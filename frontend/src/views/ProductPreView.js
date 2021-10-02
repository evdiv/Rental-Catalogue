import React from 'react'
import Card from 'react-bootstrap/Card'

const ProductPreView = ({product}) => {
    return (
        <Card className="p-2 my-2 rounded">
            <a href={`/product/${product._id}`}>
                <Card.Img src={`/images/products/${product.image}`} variant='top' />
            </a>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </a>

                <Card.Text className='my-2'>
                    <small className="text-muted"> 
                        Product Reviews({product.numReviews} Reviews)
                        <a href="#" data-toggle="modal" data-target="#reviewModal">Write a Review</a>
                    </small>
                </Card.Text>

                <Card.Text as='h4'>${product.price}</Card.Text>

            </Card.Body>
        </Card>
    )
}

export default ProductPreView