import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Table } from 'react-bootstrap'
import { AlertMsg } from '../../components/AlertMsg'
import { Loader } from '../../components/Loader'
import { getAllDepartments } from '../../actions/departmentActions'


const DepartmentsView = () => {

    const { loading, error, departments } = useSelector(state => state.allDepartments)
    let departmentsList = []
    departments.forEach(d => {
        departmentsList.push(d)
        if(d.children.length > 0) {
            departmentsList = departmentsList.concat(d.children)
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDepartments())
    }, [])

    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <h3>Departments</h3>
                {loading ? <Loader /> : error && <AlertMsg msg={error} variant="danger" />}
                {departmentsList &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>DepartmentId</th>
                                <th>Department Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentsList.map(d => (
                                <tr key={d.departmentsID}>
                                    <td><Link to={`/admin/departments/${d.departmentsID}`}>{d.departmentsID}</Link></td>
                                    <td>{d.departmentName}</td>
                                    <td>{d.departmentDescription.length < 300 
                                        ? d.departmentDescription : d.departmentDescription.substring(0, 300) + '...'}</td>
                                </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                }
            </Col>
        </Row>
    )
}

export default DepartmentsView

