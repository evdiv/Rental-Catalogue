export const featuredProductsReducer = (state ={products: [], loading: false}, action) => {
    switch (action.type) {
        case 'FEATURED_PRODUCTS_REQUEST':
            return { products: [], loading: true}
        case 'FEATURED_PRODUCTS_SUCCESS':
            return { products: action.payload, loading: false}
        case 'FEATURED_PRODUCTS_FAIL':
            return { products: [], loading: false, error: action.payload}
        default:
            return state
    }
}

export const singleProductReducer = (state ={product: {}, loading: false}, action) => {
    switch(action.type) {
        case 'SINGLE_PRODUCT_REQUEST':
            return {product: {}, loading: true}
        case 'SINGLE_PRODUCT_SUCCESS':
            return {product: action.payload, loading: false}
        case 'SINGLE_PRODUCT_FAIL': 
            return {product: {}, error: action.payload, loading: false}
        default:
            return state
    }
}

