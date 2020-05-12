import React from 'react'
import s from './Users.module.css'
import userPhoto from '../../assets/images/default_icon.jpg'
import { NavLink } from 'react-router-dom'

let User = (props) => {
    let u = props.user
    return <div className={s.u}>
                    <div>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img className={s.avatar} src={u.photos.small != null ? u.photos.small : userPhoto} alt='avatar' />
                            </NavLink>
                        </div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(i => i === u.id)}
                                onClick={() => {
                                    props.unfollow(u.id)
                                }}>Друг</button>
                            : <button disabled={props.followingInProgress.some(i => i === u.id)}
                                onClick={() => {
                                    props.follow(u.id)
                                }}>Не в друзьях</button>
                        }
                    </div>
                    <div>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </div>
                </div>
    
}

export default User