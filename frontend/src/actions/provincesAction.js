import axios from "axios";
import { axiosErrorsHandler } from '../utils/errorsHandler'

export const getProvinces = () => async(dispatch) => {
    try {
        dispatch({ type: 'GET_PROVINCES_REQUEST' })

        const { data } = await axios.get('/api/v1/provinces')

        dispatch({ type: 'GET_PROVINCES_SUCCESS', payload: data})

    } catch(error){
        dispatch({ type: 'GET_PROVINCES_FAIL', payload: axiosErrorsHandler(error)})
    }
}