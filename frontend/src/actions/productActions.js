import axios from 'axios'
import { axiosErrorsHandler } from '../utils/errorsHandler'


export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'INDEX_PRODUCTS_REQUEST' })

        const { data } = await axios.get('/api/v1/products')
        dispatch({ type: 'INDEX_PRODUCTS_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'INDEX_PRODUCTS_FAIL', payload: axiosErrorsHandler(error) })
    }
}

export const getFeaturedProducts = () => async (dispatch) => {
    try {
        dispatch({type: 'FEATURED_PRODUCTS_REQUEST'})

        const { data } = await axios.get('/api/v1/products?type=featured')
        dispatch({ type: 'FEATURED_PRODUCTS_SUCCESS', payload: data})
        
    } catch(error) {
        dispatch({ type: 'FEATURED_PRODUCTS_FAIL', payload: axiosErrorsHandler(error) })
    }
}

export const getOnSaleProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'ONSALE_PRODUCTS_REQUEST' })

        const { data } = await axios.get('/api/v1/products?type=onsale')
        dispatch({ type: 'ONSALE_PRODUCTS_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'ONSALE_PRODUCTS_FAIL', payload: axiosErrorsHandler(error) })
    }
}


export const getSingleProduct = (id) => async (dispatch) => {
    try{
        dispatch({ type: 'SINGLE_PRODUCT_REQUEST'})

        const { data } = await axios.get(`/api/v1/products/${id}`)
        dispatch({ type: 'SINGLE_PRODUCT_SUCCESS', payload: data})

    } catch(error){
        dispatch({ type: 'SINGLE_PRODUCT_FAIL', payload: axiosErrorsHandler(error)})
    }
}

export const getBrandProducts = (id) => async (dispatch) => {
    try{
        dispatch({ type: 'BRAND_PRODUCTS_REQUEST'})

        const { data } = await axios.get(`/api/v1/brands/${id}/products`)
        dispatch({ type: 'BRAND_PRODUCTS_SUCCESS', payload: data})
    } catch(error) {
        dispatch({ type: 'BRAND_PRODUCTS_FAIL', payload: axiosErrorsHandler(error) })
    }
}

export const getDepartmentProducts = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DEPARTMENTS_PRODUCTS_REQUEST' })

        const { data } = await axios.get(`/api/v1/departments/${id}/products`)
        dispatch({ type: 'DEPARTMENTS_PRODUCTS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'DEPARTMENTS_PRODUCTS_FAIL', payload: axiosErrorsHandler(error) })
    }
}