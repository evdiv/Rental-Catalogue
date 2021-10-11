export const featuredProductsReducer = (state ={products: [], loading: false}, action) => {
    switch (action.type) {
        case 'FEATURED_PRODUCTS_REQUEST':
            return {loading: true, products: []}
        case 'FEATURED_PRODUCTS_SUCCESS':
            return {loading: false, products: action.payload}
        case 'FEATURED_PRODUCTS_FAIL':
            return {loading: false, products: [], error: action.payload}
        default:
            return state
    }
}