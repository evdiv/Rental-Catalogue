import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const DepartmentMenu = ({departments, departmentId}) => {

    const getSubDepartmentsTree = (departments, departmentId) => {
        departmentId = +departmentId || 0
        for (let root of departments) {
            if (root.departmentsID === departmentId) {
                return root
            }
            for (let child of root.children) {
                if (child.departmentsID === departmentId) {
                    return root
                }
            }
        }
    }

    let tree = getSubDepartmentsTree(departments, departmentId)
 
    return (
        <>
            <h5><Link to={`/departments/${tree.departmentsID}`}>{tree.departmentName}</Link></h5>
            <ListGroup variant="flush">
                {tree.children.map(child => (
                    <ListGroup.Item key={child.departmentsID} variant={child.departmentsID === +departmentId ? "primary" : "" } >
                       <Link to={`/departments/${child.departmentsID}`}>{child.departmentName}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}

export default DepartmentMenu