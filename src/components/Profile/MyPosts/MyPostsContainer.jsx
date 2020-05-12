import { addPostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    
    return {
        posts: state.profilePage.posts,
        textArea: state.profilePage.textArea
    }
}
let mapDispatchToProps = (dispatch) => {
    
    return {
        addPost: (postMessage) => { dispatch(addPostActionCreator(postMessage)) },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer