import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm, Field } from 'redux-form';
import { Textarea } from '../common/FormControls/FormControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const Dialogs = (props) => {


    const onSubmitted = (formData) => {
        console.log(formData)
        props.addMessage(formData.message)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.messages}>
                {
                    props.dialogs.dialogs.map((d) => {
                        return (<DialogItem key={d.id} name={d.name} id={d.id} />)
                    })
                }
            </div>
            <div className={s.messages}>
                {
                    props.dialogs.messages.map((m) => {
                        return (<Message key={m.id} message={m.message} id={m.id} />)
                    })
                }
            </div>
            <div className={s.messages_block_c}>
                <div className={s.messagesNew}>
                    <h3>New message</h3>
                    <ReduxDialogsForm onSubmit={onSubmitted} />
                </div>
            </div>
        </div>
    )
}

const maxLength = maxLengthCreator(20);

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field 
                placeholder="Enter your message" 
                name="message" 
                component={Textarea}
                validate={[required, maxLength]}
            ></Field>
            <div className={s.newMessage__button}>
                <button >Add message</button>
            </div>
        </form>
    )
}

const ReduxDialogsForm = reduxForm({
    form: 'message'
})(DialogsForm)

export default Dialogs