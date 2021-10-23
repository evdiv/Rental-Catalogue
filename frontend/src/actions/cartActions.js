export const addToCart = ({id, qty}) => async (dispatch, getState) => {

    dispatch({
        type: "CART_ADD_PRODUCT",
        payload: {
            id: id,
            qty: +qty
        }
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartProducts))
}