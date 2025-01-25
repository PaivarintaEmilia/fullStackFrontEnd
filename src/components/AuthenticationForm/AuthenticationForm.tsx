import React from 'react';
import ButtonComponent from '../../common/Button';
import InputField from '../../common/InputField';
import style from "./AuthenticationForm.module.css";

interface AuthenticateFormProps {
    title: string,
    valueEmail: string,
    valuePassword: string,
    text: string
    onGoogleFunctionality: () => void;
    onSubmit: (e: React.FormEvent) => Promise<void>, // Tämä tyypitys, koska onSubmitissa on tämänlaisen argumentin vastaan
    onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const AuthenticationForm: React.FC<AuthenticateFormProps> = ({
    title,
    valueEmail,
    valuePassword,
    text,
    onSubmit,
    onChangeEmail,
    onChangePassword,
    onGoogleFunctionality
}) => {


    return (
        <div className={style.authenticationFormContainer}>
            <form onSubmit={onSubmit}>
                <h2>{title}</h2>
                {/* Email Input */}
                <InputField
                    name='email'
                    type='text'
                    placeholder='Enter email'
                    value={valueEmail}
                    className='global-input'
                    onChange={onChangeEmail}
                />
                {/* Password Input */}
                <InputField
                    name='password'
                    type='password'
                    placeholder='Create password'
                    value={valuePassword}
                    className='global-input'
                    onChange={onChangePassword}
                />
                {/* Submit button */}
                <ButtonComponent
                    name=''
                    type='submit'
                    value=''
                    className='global-btn'
                    text={text}
                    onClick={() => {}} />
                {/* Google Authentication button */}
                <ButtonComponent
                    name=''
                    type='button'
                    value=''
                    className={style.googleBtn}
                    text='Google Auth.'
                    onClick={onGoogleFunctionality} />
            </form>
        </div>
    );
}

export default AuthenticationForm;