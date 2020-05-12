import React, { useState, useEffect } from 'react'


const ProfileStatusHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])
    // let editMode = stateWithSetState[0]
    // let setEditMode = stateWithSetState[1]
    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onPostChange = (event) => {
        setStatus(event.target.value)
    }

    return (
        <span>
            {!editMode
                ?
                <div onDoubleClick={ activateEditMode }>
                    Статус: {props.status}
                </div>
                :
                <div>
                    <input
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={onPostChange}
                    ></input>
                </div>
            }
        </span>
    )
}

export default ProfileStatusHooks 