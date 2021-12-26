import axios from 'axios'
import { axiosErrorsHandler } from '../../utils/errorsHandler'

export const loginAdmin = (email, password) => async(dispatch, getState) => {
    try {
        dispatch({ type: "ADMIN_LOGIN_REQUEST" })

        const { data } = await axios.post('/api/v1/admins/login', { email, password })

        dispatch({ type: "ADMIN_LOGIN_SUCCESS", payload: data })
        localStorage.setItem('token', JSON.stringify(getState().admin.token))

    } catch (error) {
        dispatch({ type: "ADMIN_LOGIN_FAIL", payload: axiosErrorsHandler(error) })
    }
}

export const getAdmin = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "ADMIN_GET_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().admin.token}`
            }
        }
        const { data } = await axios.get('/api/v1/admins', config)
        dispatch({ type: "ADMIN_GET_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "ADMIN_GET_FAIL", payload: axiosErrorsHandler(error) })
    }
}


export const updateAdmin = (admin) => async (dispatch, getState) => {
    try {
        dispatch({ type: "ADMIN_UPDATE_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().admin.token}`
            }
        }
        const { data } = await axios.put('/api/v1/admins', admin, config)
        dispatch({ type: "ADMIN_UPDATE_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "ADMIN_UPDATE_FAIL", payload: axiosErrorsHandler(error) })
    }
}


export const LogoutAdmin = () => (dispatch) => {
    dispatch({ type: "ADMIN_LOGOUT" })
    localStorage.removeItem('token')
}