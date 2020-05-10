import { profileAPI } from "../api/profileApi"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'
const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS'
const DELETE_POST = 'DELETE_POST'


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
                posts: state.posts.filter(p => p.id != action.postId ),
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
export const updateStatusThunkCreator = (status) => {
    return dispatch => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(updateUserStatus(status))
                }
            })
    }
}

export default profileReducer;