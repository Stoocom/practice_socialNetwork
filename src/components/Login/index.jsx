import React from 'react';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import { loginThunkCreator } from '../../redux/authReducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import style from '../../components/common/FormControls/FormControls.module.css'



//const maxLength = maxLengthCreator(3);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, { type: "password" })}
            {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

            { captchaUrl && <img alt="somePic" src={captchaUrl} /> }
            { captchaUrl && createField("Symbols from image", "captcha", [required], Input)}

            {
            error &&
                <div className={style.formCommonError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm)

const LoginPage = (props) => {

    const onSubmitted = (formData) => {
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmitted} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
}

export default connect(mapStateToProps, {
    loginThunkCreator
})(LoginPage);