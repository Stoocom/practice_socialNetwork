import { usersAPI } from "../api/api"
import { updateObjectInArray } from '../utils/object-helper'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_NEW_USERS = 'SET_NEW_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_LOADING = 'SET_LOADING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
    isLoading: true,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
                // users: state.users.map((u) => {
                //     if (u.id === action.userId) {
                //         return {
                //             ...u,
                //             followed: false
                //         }
                //     }
                //     return u
                // })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.total,
            }
        case SET_NEW_USERS:
            return {
                ...state,
                currentPage: action.count
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),

            }
        default:
            return state
    }
}

export const followSuccess = (userId) => { return { type: FOLLOW, userId } }
export const unfollowSuccess = (userId) => { return { type: UNFOLLOW, userId } }
export const setUsers = (users) => { return { type: SET_USERS, users } }
export const setCurrentPage = (pageNumber) => { return { type: SET_NEW_USERS, count: pageNumber } }
export const setTotalCount = (totalCount) => { return { type: SET_TOTAL_COUNT, total: totalCount } }
export const setLoading = (isLoading) => { return { type: SET_LOADING, isLoading } }
export const toggleFollowingProgress = (isLoading, userId) => { return { type: TOGGLE_FOLLOWING_PROGRESS, isLoading, userId } }

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async dispatch => {
        dispatch(setLoading(true))
        dispatch(setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setLoading(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))
    }
}
export const follow = (userId) => {
    return async dispatch => {
        dispatch(toggleFollowingProgress(true, userId))
        let response = await usersAPI.unfollow(userId)
        if (response.data.resultCode === 0) {
            console.log('Перевод в друзья')
            dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    }
}
export const unfollow = (userId) => {
    return dispatch => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId).then(response => {
            if (response.data.resultCode === 0) {
                console.log('Нет в друзьях')
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
    }
}

export default usersReducer