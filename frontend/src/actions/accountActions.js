import axios from 'axios'

export const registerAccount = (user) => async(dispatch, getState) => {
    try {
        dispatch({ type: "ACCOUNT_REGISTER_REQUEST"})

        const { data } = await axios.post('/api/v1/users', user)

        dispatch({ type: "ACCOUNT_REGISTER_SUCCESS", payload: data})

        localStorage.setItem('account', JSON.stringify(getState().account))

    } catch (error) {
        dispatch({ type: "ACCOUNT_REGISTER_FAIL", payload: error.message})
    }
}

export const loginAccount = (email, password) => async(dispatch, getState) => {
    try {
        dispatch({ type: "ACCOUNT_LOGIN_REQUEST" })

        const { data } = await axios.post('/api/v1/users/login', { email, password })

        dispatch({ type: "ACCOUNT_LOGIN_SUCCESS", payload: data })

        localStorage.setItem('account', JSON.stringify(getState().account))

    } catch (error) {
        dispatch({ type: "ACCOUNT_LOGIN_FAIL", payload: error.message })
    }
}