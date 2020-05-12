import { authAPI, securityAPI } from "../api/authApi"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null, 
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                //isAuth: action.data.isAuth,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.url,
            }
        default:
            return state
    }
}

export const setAuthUserData = (id, login, email, isAuth) => {
    return { type: SET_USER_DATA, data: { id, login, email, isAuth } }
}

export const getCaptchaUrlSuccess = (url) => {
    return { type: GET_CAPTCHA_URL_SUCCESS, url }
}

export const getLoginThunkCreator = () => async (dispatch) => {
    let response = await authAPI.getLogin()
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getLoginThunkCreator())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        let action = stopSubmit("login", { _error: message })
        dispatch(action)
    }
}

export const logoutThunkCreator = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl()
    if (response.data.url) {
        dispatch(getCaptchaUrlSuccess(response.data.url))
    }
}


export default authReducer