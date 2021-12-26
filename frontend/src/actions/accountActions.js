import axios from 'axios'
import { axiosErrorsHandler } from '../utils/errorsHandler'

export const registerAccount = (user) => async(dispatch, getState) => {
    try {
        dispatch({ type: "ACCOUNT_REGISTER_REQUEST"})

        const { data } = await axios.post('/api/v1/users', user)

        dispatch({ type: "ACCOUNT_REGISTER_SUCCESS", payload: data})

        localStorage.setItem('account', JSON.stringify(getState().account.details))

    } catch (error) {
        dispatch({ type: "ACCOUNT_REGISTER_FAIL", payload: axiosErrorsHandler(error)})
    }
}

export const loginAccount = (email, password) => async(dispatch, getState) => {
    try {
        dispatch({ type: "ACCOUNT_LOGIN_REQUEST" })

        const { data } = await axios.post('/api/v1/users/login', { email, password })

        dispatch({ type: "ACCOUNT_LOGIN_SUCCESS", payload: data })

        localStorage.setItem('account', JSON.stringify(getState().account.details))
        localStorage.setItem('token', JSON.stringify(getState().account.token))

    } catch (error) {
        dispatch({ type: "ACCOUNT_LOGIN_FAIL", payload: axiosErrorsHandler(error) })
    }
}

export const getAccount = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "ACCOUNT_GET_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { data } = await axios.get('/api/v1/users', config)

        dispatch({ type: "ACCOUNT_GET_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "ACCOUNT_GET_FAIL", payload: axiosErrorsHandler(error) })
    }
}


export const updateAccount = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: "ACCOUNT_UPDATE_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { data } = await axios.put('/api/v1/users', user, config)

        dispatch({ type: "ACCOUNT_UPDATE_SUCCESS", payload: data })

        localStorage.setItem('account', JSON.stringify(getState().account.details))

    } catch (error) {
        dispatch({ type: "ACCOUNT_UPDATE_FAIL", payload: axiosErrorsHandler(error) })
    }
}


export const LogoutAccount = () => (dispatch) => {
    dispatch({ type: "ACCOUNT_LOGOUT" })
    dispatch({ type: "CART_RESET" })

    localStorage.removeItem('cartProducts')
    localStorage.removeItem('order')
    localStorage.removeItem('account')
    localStorage.removeItem('token')
}