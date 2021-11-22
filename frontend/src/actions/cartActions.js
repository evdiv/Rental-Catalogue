export const addToCart = ({product, qty, days}) => (dispatch, getState) => {

    dispatch({
        type: "CART_ADD_PRODUCT",
        payload: {
            product: product,
            qty: +qty,
            days: days
        }
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartProducts))
}

export const hideCartConfirmation = () => (dispatch) => {
    dispatch({
        type: "CART_HIDE_CONFIRMATION",
    })
}

export const removeFromCart = ({ id, qty, days }) => (dispatch, getState) => {

    const products = getState().cart.cartProducts.filter(p => {
        return (p.product.ProductsID !== id || p.qty !== qty || p.days !== days) 
    })

    dispatch({
        type: "CART_REMOVE_PRODUCT",
        payload: {
            products
        }
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartProducts))
}