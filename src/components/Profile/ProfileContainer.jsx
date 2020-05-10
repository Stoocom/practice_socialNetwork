import React from 'react';
import Profile from './Profile';
import { getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorisedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
        //this.props.updateStatusThunkCreator('Статус')
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
        //     .then(response => {
        //         //this.props.setLoading(false)
        //         this.props.setUserProfile(response.data)
        //     })

    }

        render() {
            return (
                <Profile {...this.props}
                // profile = { this.props.profile }
                // status = { this.props.status }
                // updateStatus = { this.props.updateStatusThunkCreator}
                />
            )
        }
    }

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator }),
    withRouter,
    //withAuthRedirect,
)(ProfileContainer)

// let AuthRedirectContainer = withAuthRedirect(ProfileContainer)

// let withUrlDataContainerComponent = withRouter(AuthRedirectContainer)

// export default connect(mapStateToProps, {getProfileThunkCreator}) (withUrlDataContainerComponent)