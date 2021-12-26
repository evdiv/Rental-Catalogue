import axios from 'axios'
import { axiosErrorsHandler } from '../utils/errorsHandler'

export const getAllDepartments = () => async (dispatch) => {
    try{
        dispatch({type: "ALL_DEPARTMENTS_REQUEST"})

        const {data} = await axios.get('/api/v1/departments')
        dispatch({type: "ALL_DEPARTMENTS_SUCCESS", payload: data})
    
    } catch(error){
        dispatch({ type: "ALL_DEPARTMENTS_FAIL", payload: axiosErrorsHandler(error)})
    }
}

export const getSingleDepartment = (id) => async (dispatch) => {
    try {
        dispatch({ type: "GET_DEPARTMENT_REQUEST" })

        const {data} = await axios.get(`/api/v1/departments/${id}`)
        dispatch({ type: "GET_DEPARTMENT_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_DEPARTMENT_FAIL", payload: axiosErrorsHandler(error) })
    }
}