import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    return (
        <header className={s.header}>
            <img alt="imageHeader" src='https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg' width='100px' />
            <div className={s.loginBlock}>
                { props.isAuth 
                    ? <div>
                        {props.login} - <button onClick={props.logoutThunkCreator}>Log out</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;