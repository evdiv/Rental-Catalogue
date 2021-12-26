import axios from 'axios'
import { axiosErrorsHandler } from '../utils/errorsHandler'

export const getAllBrands = () => async (dispatch) => {
    try{
        dispatch({type: "ALL_BRANDS_REQUEST"})

        const {data} = await axios.get('/api/v1/brands')
        dispatch({type: "ALL_BRANDS_SUCCESS", payload: data})
    
    } catch(error){
        dispatch({ type: "ALL_BRANDS_FAIL", payload: axiosErrorsHandler(error)})
    }
}

export const getSingleBrand = (id) => async (dispatch) => {
    try {
        dispatch({ type: "SINGLE_BRAND_REQUEST" })

        const {data} = await axios.get(`/api/v1/brands/${id}`)
        dispatch({ type: "SINGLE_BRAND_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "SINGLE_BRAND_FAIL", payload: axiosErrorsHandler(error) })
    }
}