import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductPreView from './ProductPreView'
import DepartmentMenu from '../components/DepartmentMenu'
import { Loader } from '../components/Loader'
import { AlertMsg } from '../components/AlertMsg'
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
                {departmentsLoading ? <Loader /> : departmentsError && <AlertMsg msg={departmentsError} variant="danger" />}
                {departments.length && <DepartmentMenu departments={departments} departmentId={match.params.id} />}

            </Col>  
            <Col sm={8} md={10}>
                <h3>{department && <>{department.departmentName}</>}</h3>
                {productLoading ? <Loader /> : productError ? <AlertMsg msg={productError} variant="danger" /> : (
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

