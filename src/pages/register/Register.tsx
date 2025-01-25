import React, { useState } from 'react';
import style from "../Authentication/Authentication.module.css"
import Hero from '../../components/Hero/Hero';
import AuthenticationForm from '../../components/AuthenticationForm/AuthenticationForm';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';

const Register: React.FC = () => {

  // UseStates
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  // Navigation
  const navigate = useNavigate();


  // Registration with email and password
  const handleEmailRegistration = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    let { error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      setError(error.message);
    } else {
      navigate('/home');
    }
  };

  // Google Authentication
  const handleGoogleRegistration = async () => {
    console.log('GoogleAuth-painiketta painettu.');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.heroContainer}>
        <Hero heroTitle={'Expense Tracker'} titleTag={'Register as a new user.'} />
      </div>
      <div className={style.authenticationContainer}>
        <AuthenticationForm
          title={'Register'}
          onSubmit={handleEmailRegistration}
          onChangeEmail={(e) => setEmail(e.target.value)}
          onChangePassword={(e) => setPassword(e.target.value)}
          text='Register'
          valuePassword={password}
          valueEmail={email}
          onGoogleFunctionality={handleGoogleRegistration}
        />
      </div>
      {/* Register error message */}
      <div className={style.errorContainer}>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Register;