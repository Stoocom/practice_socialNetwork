import React from 'react'
import s from './ProfileInfo.module.css';
import Loader from '../../common/Preloader/Loader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusHooks from './ProfileStatusHooks';

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Loader />
    }
    return (
        <div>
            {/* <div>
                <img src="https://phuquoclife.ru/wp-content/uploads/2019/11/gde-vstretit-rassvet-na-fukuok-3-870x400.jpg" alt='no_image' />
            </div> */}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small} />
                <ProfileStatusHooks
                    status={props.status}
                    updateStatus = { props.updateStatus }
                />
                <div> Имя: {" " + props.profile.fullname}</div>
                <div> О себе: {" " + props.profile.aboutMe}</div>
                <h3>Мои социальные сети</h3>
                <div> Facebook {" " + props.profile.contacts.facebook}</div>
                <div> VK {" " + props.profile.contacts.vk}</div>
                <div> Github {" " + props.profile.contacts.github}</div>
                <h3>Раздел любимой работенки</h3>
                <div> Нужна ли мне работенка: {props.profile.lookingForAJob ? ' Да' : ' Нет'}</div>
                <div> Описание поиска: {" " + props.profile.lookingForAJobDescription}</div>

            </div>
        </div>
    )
}
export default ProfileInfo 