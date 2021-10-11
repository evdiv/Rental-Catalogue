import React from 'react'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

const ProductPreView = ({product}) => {
    return (
        <Card className="p-2 my-2 rounded">
            <Link to={`/product/${product.ProductsID}`}>
                <Card.Img src={`/images/products/${product.Image1}`} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product.ProductsID}`}>
                    <Card.Title>{product.ProductName}</Card.Title>
                </Link>

                <Card.Text className='my-2'>
                    <small className="text-muted"> 
                        Product Reviews({product.ReviewCount} Reviews)
                    </small>
                </Card.Text>

                <Card.Text as='h6'>1 Day ${product.DailyRentalRate}</Card.Text>
                <Card.Text as='h6'>1 Week ${product.WeeklyRentalRate}</Card.Text>
                <Card.Text as='h6'>1 Month ${product.MonthlyRentalRate}</Card.Text>

            </Card.Body>
        </Card>
    )
}

export default ProductPreView