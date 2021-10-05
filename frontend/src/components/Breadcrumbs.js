import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Breadcrumbs = (props) => {
    const brandUrl = props.brand.toLowerCase().replace(" ", "-");
    return (
        <Breadcrumb>
            <LinkContainer to="/">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            
            <LinkContainer to={`/${brandUrl}`}>
                <Breadcrumb.Item>{props.brand}</Breadcrumb.Item>
            </LinkContainer>
            
            <Breadcrumb.Item active>{props.productName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs