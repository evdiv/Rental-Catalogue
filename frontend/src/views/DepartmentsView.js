import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { getAllDepartments } from '../actions/departmentActions'
import { Loader } from '../components/Loader'
import { AlertMsg } from '../components/AlertMsg'

const DepartmentsView = () => {
    const { loading, error, departments } = useSelector(state => state.allDepartments)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllDepartments())
    }, [])

    return (
        <>        
            <h3>Departments</h3>
            {loading ? <Loader /> : error ? <AlertMsg msg={error} variant="danger" /> : (
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

