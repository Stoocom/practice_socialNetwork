import React, { Component } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';
//import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer';


const MyPosts = React.memo(props => {
    // shouldComponentUpdate(nextProps, nextState){
    //     return false;
    // }
    let onAddPost = (value) => {
        props.addPost(value.message)
    }
    // let onPostChange = (event) => {
    //     props.updateNewPostTextActionCreator(event.target.value)
    // }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <ReduxDialogsForm onSubmit={onAddPost} />
            </div>
            <div className={s.posts}>
                {props.posts.map((p) => <Post key={p.id} message={p.message} countLikes={p.countLikes} />)}
            </div>
        </div>
    )
})


const maxLength10 = maxLengthCreator(10);


const PostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>

            <Field
                placeholder="Enter your post"
                name="message"
                component={Textarea}
                validate={[required, maxLength10]}
            ></Field>

            <div className={s.myPost__button}>
                <button

                >Add post</button>

            </div>
        </form>
    )
}

const ReduxDialogsForm = reduxForm({
    form: 'ProfileAddNewPost'
})(PostsForm)


export default MyPosts