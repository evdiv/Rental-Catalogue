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
        const {cartProducts} = getState().cart
        const { data } = await axios.post('/api/v1/orders', {cartProducts}, config)


        dispatch({ type: "STAGE_ORDER_SUCCESS", payload: data})
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "STAGE_ORDER_FAIL", payload: error.message})
    }
}

export const completeOrder = (transaction) => async(dispatch, getState) => {
    try {
        dispatch({ type: "COMPLETE_ORDER_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { ordersID } = getState().order.orderDetails
        const { data } = await axios.put(`/api/v1/orders/${ordersID}/complete`, { transaction }, config)

        dispatch({ type: "COMPLETE_ORDER_SUCCESS", payload: data })
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "COMPLETE_ORDER_FAIL", payload: error.message })
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
        const { ordersID } = getState().order.orderDetails
        const { cartProducts } = getState().cart
        const { data } = await axios.put(`/api/v1/orders/${ordersID}`, { action: 'updateInsurance', insurance, cartProducts }, config)

        dispatch({ type: "SET_INSURANCE_SUCCESS", payload: data })
        localStorage.setItem('order', JSON.stringify(getState().order.orderDetails))

    } catch (error) {
        dispatch({ type: "SET_INSURANCE_FAIL", payload: error.message })
    }
}

export const getOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: "GET_ORDER_DETAILS_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { data } = await axios.get(`/api/v1/orders/${orderId}`, config)
        dispatch({ type: "GET_ORDER_DETAILS_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_ORDER_DETAILS_FAIL", payload: error.message })
    }
}