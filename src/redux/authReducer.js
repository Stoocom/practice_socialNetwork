import { authAPI } from "../api/authApi"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = 'auth/SET_USER_DATA'

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                //isAuth: action.data.isAuth,
            }
        default:
            return state
    }
}

export const setAuthUserData = (id, login, email, isAuth) => {
    return { type: SET_USER_DATA, data: { id, login, email, isAuth } }
}

export const getLoginThunkCreator = () => async (dispatch) => {
    let response = await authAPI.getLogin()
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setAuthUserData(id, login, email, true))
    }
}


export const loginThunkCreator = (email, password, rememberMe) => async (dispatch) => {

    // let action = stopSubmit("login", {_error: "Email is wrong"})
    // dispatch(action)
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getLoginThunkCreator())
    } else {
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


export default authReducer