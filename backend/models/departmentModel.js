const execute = require('../db')

const getByID = async (id) => {
    id = id || 0
    const sql = `SELECT departmentsID, parentDepartmentsID, departmentName, departmentDescription 
                    FROM departments 
                    WHERE active = 1 
                    AND departmentsID = ?
                    ORDER BY departmentsID`;

    const params = [id]
    const rows = await execute(sql, params)
    return rows[0]
}

const getAll = async () => {
    const sql = `SELECT departmentsID, parentDepartmentsID, departmentName, departmentDescription 
                    FROM departments 
                    WHERE active = 1
                    ORDER BY departmentsID`;
    const rows = await execute(sql)
    return rows
}

const getTree = (departments) => {
    const tree = departments.reduce((tree, d) => {
        if (d.parentDepartmentsID === 0) {
            d.children = []
            tree.push(d)
        } else {
            tree.map(rootDep => {
                if (d.parentDepartmentsID === rootDep.departmentsID) {
                    rootDep.children.push(d)
                }
                return rootDep
            })
        }
        return tree
    }, [])

    return tree
}

module.exports = { getByID, getAll, getTree }