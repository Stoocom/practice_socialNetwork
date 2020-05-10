import React from 'react';
import s from './Profile.module.css';
//import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile = (props) => {
    console.log('RENDER PROFILE')
    return (
        <div className={s.content}>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus = { props.updateStatusThunkCreator}
            />
            {/* <MyPostsContainer store={props.store} /> */}
            <MyPostsContainer />
        </div>
    )
}

export default Profile