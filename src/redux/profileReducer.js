import { profileAPI } from "../api/profileApi"
import { stopSubmit } from "redux-form"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'
const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


let initialState = {
    posts: [
        { id: 1, message: 'Hello people!', countLikes: '15' },
        { id: 2, message: "I'm hunter", countLikes: '20' },
        { id: 3, message: "I'll stay good programmer", countLikes: '15' },
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let body = action.postMessage;
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: state.posts.length + 1,
                        message: body,
                        countLikes: 0
                    }
                ]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case UPDATE_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            }
        case SAVE_PHOTO_SUCCESS:
            console.log(state)
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos },
            }
        default:
            return state
    }
}

export const addPostActionCreator = (postMessage) => {
    return { type: ADD_POST, postMessage }
}
export const deletePost = (postId) => {
    return { type: DELETE_POST, postId }
}
export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile }
}
export const setUserStatus = (status) => {
    return { type: SET_USER_STATUS, status }
}
export const updateUserStatus = (status) => {
    return { type: UPDATE_USER_STATUS, status }
}
export const savePhotoSuccess = (photos) => {
    return { type: SAVE_PHOTO_SUCCESS, photos }
}

export const getProfileThunkCreator = (userId) => {
    return dispatch => {
        profileAPI.getProfile(userId)
            .then(response => {
                //this.props.setLoading(false)
                dispatch(setUserProfile(response.data))
            })
    }
}
export const getStatusThunkCreator = (userId) => {
    return dispatch => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setUserStatus(response.data))
            })
    }
}
export const updateStatusThunkCreator = (status) => async dispatch => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(updateUserStatus(status))
        }
    } catch (error) {
        //dispatch()
    }
}
export const savePhoto = (file) => {
    return dispatch => {
        profileAPI.savePhoto(file)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(savePhotoSuccess(response.data.data.photos))
                }
            })
    }
}

export const saveProfile = (profile) => {
    return (dispatch, getState) => {
        const userId = getState().auth.id
        profileAPI.saveProfile(profile)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getProfileThunkCreator(userId))
                } else {
                    //dispatch(stopSubmit("profileData", { _error: response.data.messages[0] })) //тут ошибка выводится общая
                    dispatch(stopSubmit("profileData", { "contacts": { "facebook": response.data.messages[0] } })) // для конкретного случая
                    return Promise.reject(response.data.messages[0])
                }
            })
    }
}

export default profileReducer;