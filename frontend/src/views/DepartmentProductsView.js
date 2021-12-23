import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'
import DepartmentMenu from '../components/DepartmentMenu'
import { getDepartmentProducts } from '../actions/productActions'
import { getSingleDepartment, getAllDepartments } from '../actions/departmentActions'

const DepartmentProductsView = ({ match }) => {
    const { loading: productLoading, error: productError, products } = useSelector(state => state.departmentProducts)
    const { loading: departmentsLoading, error: departmentsError, departments } = useSelector(state => state.allDepartments)
    const { department } = useSelector(state => state.singleDepartment)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartmentProducts(match.params.id))
        dispatch(getSingleDepartment(match.params.id))
        dispatch(getAllDepartments())

    }, [dispatch, match.params.id])

    return (
        <Row>
            <Col sm={4} md={2}>
                {departmentsLoading ? <h3>Loading ...</h3> : departmentsError && <h3>{departmentsError}</h3>}
                {departments.length && <DepartmentMenu departments={departments} departmentId={match.params.id} />}

            </Col>  
            <Col sm={8} md={10}>
                <h3>{department && <>{department.departmentName}</>}</h3>
                {productLoading ? <h3>Loading ...</h3> : productError ? <h3>{productError}</h3> : (
                    <Row>
                        {products.map(p => (
                            <Col key={p.ProductsID} sm={12} md={3} >
                                <ProductPreView product={p} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Col>
        </Row>
    )
}

export default DepartmentProductsView

