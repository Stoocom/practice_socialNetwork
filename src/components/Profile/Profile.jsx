import React from 'react';
import s from './Profile.module.css';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile = (props) => {
    console.log('RENDER PROFILE')
    return (
        <div className={s.content}>
            <ProfileInfo
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                profile={props.profile}
                status={props.status}
                updateStatus = { props.updateStatusThunkCreator}
                saveProfile={props.saveProfile}
            />
            {/* <MyPostsContainer store={props.store} /> */}
            <MyPostsContainer />
        </div>
    )
}

export default Profile