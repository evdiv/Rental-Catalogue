import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/products/${id}`)
    data.qty = qty
    dispatch({
        type: "CART_ADD_PRODUCT",
        payload: {
            product: data
        }
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartProducts))
}