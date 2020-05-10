import React from 'react';
import { addMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (formData) => { dispatch(addMessageActionCreator(formData)) },
        
    }
}

let MyDialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs) 

// let AuthRedirectContainer = withAuthRedirect(Dialogs)

// const MyDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectContainer)

export default MyDialogsContainer