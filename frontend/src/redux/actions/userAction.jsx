import API from '../../API'

export const register = (form) => async (dispatch) => {
    try {
        dispatch({ type: "REGISTER_REQUEST" })
        const { data } = await API.post('/user/register', form);

        dispatch({ type: "REGISTER_SUCCESS", payload: data })
        window.location.replace('/login')


    } catch (error) {
        dispatch({ type: "REGISTER_FAIL", payload: error.response.data.message })
    }
}
export const login = (form) => async (dispatch) => {

    try {
        dispatch({ type: "LOGIN_REQUEST" })
        const { data } = await API.post('/user/login', form);
        localStorage.setItem("token", data.token)
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        window.location.replace('/notes')
        console.log(data)
    } catch (error) {
        dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message })
    }
}