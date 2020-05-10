import { createSelector } from "reselect"

const getNewUsers = (state) => {
    return state.usersPage.users
}

export const getNewUsersSuperSelector = createSelector( getNewUsers, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getIsLoading = (state) => {
    return state.usersPage.isLoading
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}

