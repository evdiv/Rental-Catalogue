import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { getAllDepartments } from '../actions/departmentActions'

const DepartmentsView = () => {
    const { loading, error, departments } = useSelector(state => state.allDepartments)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllDepartments())
    }, [])

    return (
        <>        
            <h3>Departments</h3>
            {loading ? <h3>Loading ...</h3> : error ? <h3>{error}</h3> : (
                <Row>
                    {departments.map(root => (
                        <Col key={root.departmentsID} sm={6} md={4} lg={3} >
                            <h5><Link to={`/departments/${root.departmentsID}`}>{root.departmentName}</Link></h5>
                            <ul>
                            {root.children.map(child => (
                                <li><Link to={`/departments/${child.departmentsID}`}>{child.departmentName}</Link></li>
                            ))}
                            </ul>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default DepartmentsView

