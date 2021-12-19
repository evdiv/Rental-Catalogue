import axios from 'axios'

export const getUserOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "GET_USER_ORDERS_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().account.token}`
            }
        }
        const { data } = await axios.get(`/api/v1/orders`, config)
        dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: data })

    } catch (error) { 
        dispatch({ type: "GET_USER_ORDERS_FAIL", payload: error.message })
    }
}