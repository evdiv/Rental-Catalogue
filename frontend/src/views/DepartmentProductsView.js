import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'
import { getDepartmentProducts } from '../actions/productActions'
import { getSingleDepartment } from '../actions/departmentActions'

const DepartmentProductsView = ({ match }) => {
    const { loading, error, products } = useSelector(state => state.departmentProducts)
    const { department } = useSelector(state => state.singleDepartment)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartmentProducts(match.params.id))
        dispatch(getSingleDepartment(match.params.id))

    }, [dispatch, match.params.id])

    return (
        <>        
            <h3>{department && <>{department.departmentName}</>}</h3>
            {loading ? <h3>Loading ...</h3> : error ? <h3>{error}</h3> : (
                <Row>
                    {products.map(p => (
                        <Col key={p.ProductsID} sm={12} md={3} lg={2} >
                            <ProductPreView product={p} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default DepartmentProductsView

