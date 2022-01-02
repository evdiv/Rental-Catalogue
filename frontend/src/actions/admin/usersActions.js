import axios from 'axios'
import { axiosErrorsHandler } from '../../utils/errorsHandler'

export const getAllUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "GET_ALL_USERS_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().admin.token}`
            }
        }
        const { data } = await axios.get(`/api/v1/admins/users`, config)
        dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: data })

    } catch (error) { 
        dispatch({ type: "GET_ALL_USERS_FAIL", payload: axiosErrorsHandler(error) })
    }
}

export const getUser = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: "GET_USER_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().admin.token}`
            }
        }
        const { data } = await axios.get(`/api/v1/admins/users/${userId}`, config)
        dispatch({ type: "GET_USER_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_USER_FAIL", payload: axiosErrorsHandler(error) })
    }
}

export const updateUser = (userDetails) => async (dispatch, getState) => {
    try {
        dispatch({ type: "UPDATE_USER_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().admin.token}`
            }
        }
        const { data } = await axios.put(`/api/v1/admins/users/${userDetails.ordersID}`, { userDetails }, config)

        dispatch({ type: "UPDATE_USER_SUCCESS", payload: data })
        
    } catch (error) {
        dispatch({ type: "UPDATE_USER_FAIL", payload: axiosErrorsHandler(error) })
    }
}