import axios from 'axios'

export const stageOrder = ({ shippingInsurance }) => async(dispatch, getState) => {
    try {
        dispatch({ type: "STAGE_ORDER_REQUEST"})

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const cartProducts = getState().cart.cartProducts
        const { data } = await axios.post('/api/v1/orders', { cartProducts, shippingInsurance }, config)

        dispatch({ type: "STAGE_ORDER_SUCCESS", payload: data})
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "STAGE_ORDER_FAIL", payload: error.message})
    }
}

export const completeOrder = ({data, orderId}) => async(dispatch, getState) => {
    try {
        dispatch({ type: "COMPLETE_ORDER_REQUEST" })

        const { data } = await axios.put(`/api/v1/orders/${orderId}`, data)

        dispatch({ type: "COMPLETE_ORDER_SUCCESS", payload: data })
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "COMPLETE_ORDER_FAIL", payload: error.message })
    }
}

export const setShippingInsurance = ({ data, orderId }) => async(dispatch, getState) => {
    try {
        dispatch({ type: "SET_INSURANCE_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }

        const { data } = await axios.put(`/api/v1/orders/${orderId}`, data, config)

        dispatch({ type: "SET_INSURANCE_SUCCESS", payload: data })
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "SET_INSURANCE_FAIL", payload: error.message })
    }
}