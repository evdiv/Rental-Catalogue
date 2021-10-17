import axios from 'axios'

export const getAllBrands = () => async (dispatch) => {
    try{
        dispatch({type: "ALL_BRANDS_REQUEST"})
        const {data} = await axios.get('/api/v1/brands')
        dispatch({type: "ALL_BRANDS_SUCCESS", payload: data})
    
    } catch(error){
        dispatch({type: "ALL_BRANDS_FAIL", payload: error.message})
    }
}

export const getSingleBrand = (id) => async (dispatch) => {
    try {
        dispatch({ type: "SINGLE_BRAND_REQUEST" })
        const { data } = await axios.get(`/api/v1/brands/${id}`)
        dispatch({ type: "SINGLE_BRANDS_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "SINGLE_BRANDS_FAIL", payload: error.message })
    }
}