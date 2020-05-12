import React from 'react'
import { createField, Input, Textarea } from '../../common/FormControls//FormControls'
import { reduxForm } from 'redux-form'
import s from './ProfileInfo.module.css';


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div> <button> Save </button> </div>

        {error && <div className={s.formCommonError}> {error} </div> }

        <div> Имя: {createField("Full name", "fullName", [], Input)}</div>
        <div> О себе: {createField("About Me", "aboutMe", [], Textarea)}</div>
        <h3>Мои социальные сети</h3>
        {
            Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}> {key}: {createField(key, "contacts." + key, [], Input)} </div>
            })
        }
        <h3>Раздел любимой работенки</h3>
        <span> Нужна ли мне работенка: {createField("LookingJob", "lookingForAJob", [], Input, {type: "checkbox"})}</span>
        <div> Описание поиска: {createField("Description", "lookingForAJobDescription", [], Textarea)}</div>
    </form>
}

const ProfileDataFormRedux = reduxForm({
    form: 'profileData'
})(ProfileDataForm)

export default ProfileDataFormRedux