import axios from 'axios'
import { axiosErrorsHandler } from '../utils/errorsHandler'


export const stageOrder = () => async(dispatch, getState) => {
    try {
        dispatch({ type: "STAGE_USER_ORDER_REQUEST"})

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const {cartProducts} = getState().cart
        const { data } = await axios.post('/api/v1/user-orders', {cartProducts}, config)


        dispatch({ type: "STAGE_USER_ORDER_SUCCESS", payload: data})
        localStorage.setItem('userOrder', JSON.stringify(getState().userOrder.orderDetails))

    } catch (error) {
        dispatch({ type: "STAGE_USER_ORDER_FAIL", payload: axiosErrorsHandler(error)})
    }
}

export const completeOrder = (transaction) => async(dispatch, getState) => {
    try {
        dispatch({ type: "COMPLETE_USER_ORDER_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { ordersID } = transaction
        await axios.put(`/api/v1/user-orders/${ordersID}/complete`, { transaction }, config)

        dispatch({ type: "COMPLETE_USER_ORDER_SUCCESS" })
        dispatch({ type: "CART_RESET" })

        localStorage.removeItem('userOrder')
        localStorage.removeItem('cartProducts')

    } catch (error) {
        dispatch({ type: "COMPLETE_USER_ORDER_FAIL", payload: axiosErrorsHandler(error) })
    }
}

export const updateShippingInsurance = (insurance) => async(dispatch, getState) => {
    try {
        dispatch({ type: "SET_INSURANCE_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { ordersID } = getState().userOrder.orderDetails
        const { cartProducts } = getState().cart
        const { data } = await axios.put(`/api/v1/user-orders/${ordersID}`, { action: 'updateInsurance', insurance, cartProducts }, config)

        dispatch({ type: "SET_INSURANCE_SUCCESS", payload: data })
        localStorage.setItem('userOrder', JSON.stringify(getState().userOrder.orderDetails))

    } catch (error) {
        dispatch({ type: "SET_INSURANCE_FAIL", payload: axiosErrorsHandler(error) })
    }
}

export const getOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: "GET_USER_ORDER_DETAILS_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { data } = await axios.get(`/api/v1/user-orders/${orderId}`, config)
        dispatch({ type: "GET_USER_ORDER_DETAILS_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_USER_ORDER_DETAILS_FAIL", payload: axiosErrorsHandler(error) })
    }
}