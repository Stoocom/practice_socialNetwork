import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsersThunkCreator } from '../../redux/usersReducer';
import Users from './Users.jsx'
import React from 'react'
import Loader from '../common/Preloader/Loader'
import { getPageSize, getTotalCount, getCurrentPage, getIsLoading, getFollowingInProgress, getNewUsersSuperSelector } from '../../redux/user-selectors';

class UsersContainer extends React.Component {
    unFollow = (id) => {
        this.props.unfollow(id)
    }
    componentDidMount() {
        let { currentPage, pageSize } = this.props
        this.props.getCurrentUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        let { pageSize } = this.props
        this.props.getCurrentUsers(pageNumber, pageSize)
    }
    
    render() {

        return (
            <>
                {this.props.isLoading ? <Loader/> :
                <Users
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}
                />
        }
            </>
        )
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalCount: state.usersPage.totalCount,
//         currentPage: state.usersPage.currentPage,
//         isLoading: state.usersPage.isLoading,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }
let mapStateToProps = (state) => {
    return {
        users: getNewUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

const UsersMainContainer = connect(mapStateToProps, {
    follow, unfollow, setCurrentPage, toggleFollowingProgress, 
    getCurrentUsers: getUsersThunkCreator
})(UsersContainer)

export default UsersMainContainer