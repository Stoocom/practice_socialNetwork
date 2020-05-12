import React, { useState } from 'react'
import s from './ProfileInfo.module.css';
import Loader from '../../common/Preloader/Loader';
import userPhoto from '../../../assets/images/default_icon.jpg'
import ProfileStatusHooks from './ProfileStatusHooks';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({profile, isOwner, status, updateStatus, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Loader />
    }

    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = async (formData) => {
        await saveProfile(formData)
        setEditMode(false)  
    }
    
    return (
        <div>
            <div className={s.descriptionBlock}>

                <img   
                    alt='somePhoto'
                    // style={{width: "150px", borderRadius: "50%"}} 
                    src={profile.photos.large || userPhoto} />
                {isOwner && <input type={"file"} onChange={onPhotoSelected} />}

                <ProfileStatusHooks
                    status={status}
                    updateStatus={updateStatus}
                />
                { editMode 
                    ? <ProfileDataForm 
                        profile={profile} 
                        initialValues={profile} 
                        onSubmit={onSubmit}/> 
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}} /> }
            </div>
        </div>
    )
}

const ProfileData = (props) => {
    return <div>
        { props.isOwner && <div> <button onClick={props.goToEditMode} > edit </button> </div> }
        <div> Имя: {" " + props.profile.fullName}</div>
        <div> О себе: {" " + props.profile.aboutMe}</div>
        <h3>Мои социальные сети</h3>
        {
            Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} title={key} value={props.profile.contacts[key]} />
            })
        }
        <h3>Раздел любимой работенки</h3>
        <div> Нужна ли мне работенка: {props.profile.lookingForAJob ? ' Да' : ' Нет'}</div>
        <div> Описание поиска: {" " + props.profile.lookingForAJobDescription}</div>
    </div>
}

export const Contact = ({ title, value }) => {
    return <div className={s.contact}>
        {title}: {value}
    </div>
}


export default ProfileInfo 