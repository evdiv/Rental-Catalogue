export const allDepartmentsReducer = (state = { departments: [] }, action) => {
    switch (action.type) {
        case "ALL_DEPARTMENTS_REQUEST":
            return { ...state, loading: true }
        case "ALL_DEPARTMENTS_SUCCESS":
            return { departments: action.payload, loading: false }
        case "ALL_DEPARTMENTS_FAIL":
            return { departments: [], error: action.payload, loading: false }
        default:
            return state
    }
}

export const singleDepartmentReducer = (state = { department: {} }, action) => {
    switch (action.type) {
        case "GET_DEPARTMENT_REQUEST":
            return {...state, loading: true}
        case "GET_DEPARTMENT_SUCCESS":
            return {department: action.payload, loading: false}
        case "GET_DEPARTMENT_FAIL":
            return { department: {}, error: action.payload, loading: false}
        default:
            return state
    }
}