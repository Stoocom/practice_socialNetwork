import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User.jsx'


let Users = (props) => {
    
    return <div>
        
        <Paginator  {...props} />

        {props.users.map((u) => {
            return (
                <User 
                    user={u} key={u.id} 
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow}
                    />
            )
        })
        }
    </div>

}

export default Users