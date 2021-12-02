import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Breadcrumbs = ({product}) => {
    return (
        <Breadcrumb>
            <LinkContainer to="/">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            
            <LinkContainer to={`/brands/${product.brandID}`}>
                <Breadcrumb.Item>{product.brandName}</Breadcrumb.Item>
            </LinkContainer>
            
            <Breadcrumb.Item active>{product.productName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs