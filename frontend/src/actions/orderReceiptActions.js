import axios from 'axios'

export const getReceipt = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: "GET_ORDER_RECEIPT_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { data } = await axios.get(`/api/v1/orders/${orderId}/receipt`, config)
        dispatch({ type: "GET_ORDER_RECEIPT_SUCCESS", payload: data })

    } catch (error) { 
        dispatch({ type: "GET_ORDER_RECEIPT_FAIL", payload: error.message })
    }
}