import axios from 'axios'
import { axiosErrorsHandler } from '../../utils/errorsHandler'

export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "GET_ALL_ORDERS_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().admin.token}`
            }
        }
        const { data } = await axios.get(`/api/v1/orders`, config)
        dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: data })

    } catch (error) { 
        dispatch({ type: "GET_ALL_ORDERS_FAIL", payload: axiosErrorsHandler(error) })
    }
}

export const getOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: "GET_ORDER_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().admin.token}`
            }
        }
        const { data } = await axios.get(`/api/v1/orders/${orderId}`, config)
        dispatch({ type: "GET_ORDER_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_ORDER_FAIL", payload: axiosErrorsHandler(error) })
    }
}

export const updateOrder = (orderDetails) => async (dispatch, getState) => {
    try {
        dispatch({ type: "UPDATE_ORDER_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().admin.token}`
            }
        }
        const { data } = await axios.put(`/api/v1/orders/${orderDetails.ordersID}`, { orderDetails }, config)

        dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data })
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "UPDATE_ORDER_FAIL", payload: axiosErrorsHandler(error) })
    }
}