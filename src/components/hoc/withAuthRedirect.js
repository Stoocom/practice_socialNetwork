import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export const withAuthRedirect = (Component) => {
    
    let mapStateToPropsForRedirect = (state) => ({
        isAuth: state.auth.isAuth
    })
    class AuthRedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth === false) return <Redirect to='/login'/>
            return <Component {...this.props} />
        }
    }


    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)


    return ConnectedAuthRedirectComponent
}