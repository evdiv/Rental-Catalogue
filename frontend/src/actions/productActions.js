import axios from 'axios'

export const featuredProducts = () => async (dispatch) => {
    try {
        dispatch({type: 'FEATURED_PRODUCTS_REQUEST'})

        const { data } = await axios.get('/api/v1/products')

        dispatch({ type: 'FEATURED_PRODUCTS_SUCCESS', payload: data})
        
    } catch(error) {
        dispatch({ type: 'FEATURED_PRODUCTS_FAIL', payload: error.message })
    }
}