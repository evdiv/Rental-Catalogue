import axios from 'axios'

export const stageOrder = () => async(dispatch, getState) => {
    try {
        dispatch({ type: "STAGE_ORDER_REQUEST"})

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const cartProducts = getState().cart.cartProducts
        const { data } = await axios.post('/api/v1/orders', { cartProducts }, config)

        dispatch({ type: "STAGE_ORDER_SUCCESS", payload: data})
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "STAGE_ORDER_FAIL", payload: error.message})
    }
}

export const completeOrder = (transaction) => async(dispatch, getState) => {
    try {
        dispatch({ type: "COMPLETE_ORDER_REQUEST" })

        const { orderId } = getState().order.orderDetails
        const { data } = await axios.put(`/api/v1/orders/${orderId}`, transaction)

        dispatch({ type: "COMPLETE_ORDER_SUCCESS", payload: data })
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "COMPLETE_ORDER_FAIL", payload: error.message })
    }
}

export const setShippingInsurance = (insurance) => async(dispatch, getState) => {
    try {
        dispatch({ type: "SET_INSURANCE_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { orderId } = getState().order.orderDetails
        const { data } = await axios.put(`/api/v1/orders/${orderId}`, { insurance }, config)

        dispatch({ type: "SET_INSURANCE_SUCCESS", payload: data })
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "SET_INSURANCE_FAIL", payload: error.message })
    }
}