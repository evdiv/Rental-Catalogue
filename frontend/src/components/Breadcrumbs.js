import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Breadcrumbs = ({product}) => {
    return (
        <Breadcrumb>
            <LinkContainer to="/">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            
            <LinkContainer to={`/brands/${product.BrandID}`}>
                <Breadcrumb.Item>{product.BrandName}</Breadcrumb.Item>
            </LinkContainer>
            
            <Breadcrumb.Item active>{product.ProductName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs