import React from 'react';
import s from './Post.module.css';


const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='https://avatarfiles.alphacoders.com/172/thumb-172466.jpg' alt='no_image' />
            {props.message}
            <div>
                <span>likes: {props.countLikes || 0}</span>
            </div>
        </div>
    )
}

export default Post