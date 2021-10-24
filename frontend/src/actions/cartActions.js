export const addToCart = ({id, qty, days}) => async (dispatch, getState) => {

    dispatch({
        type: "CART_ADD_PRODUCT",
        payload: {
            id: id,
            qty: +qty,
            days: days
        }
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartProducts))
}