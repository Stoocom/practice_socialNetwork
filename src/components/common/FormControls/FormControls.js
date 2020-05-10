import React from 'react'
import s from './FormControls.module.css'
import { Field } from 'redux-form'

const FormControl = ({ input, meta: {error, touched}, children, ...props }) => {
    const hasError = error && touched
    return (
        <div className={s.form_control + " " + (hasError && s.error)}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props}>
        <textarea {...input} {...restProps} />
    </FormControl>
}

export const Input = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props}>
        <input {...input} {...restProps} />
    </FormControl>
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => { return (<div>
        <Field 
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        ></Field> {text}
    </div>)
}