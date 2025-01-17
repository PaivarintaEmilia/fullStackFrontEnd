import React, { useState } from 'react';
import style from "./Authentication.module.css"
import Hero from '../../components/Hero/Hero';
import AuthenticationForm from '../../components/AuthenticationForm/AuthenticationForm';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';

const Authentication: React.FC = () => {

  // UseStates
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  // Navigation
  const navigate = useNavigate();


  // Login with email and password
  const handleEmailLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        console.log('Login successful:', data);
        navigate('/home'); // Navigate to home on successful login
      }
    } catch (error) {
      console.error('Unexpected error during login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  // Google Authentication
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        setError(error.message);
      } else {
        console.log('Google login successful!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Unexpected error during Google login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.heroContainer}>
        <Hero heroTitle={'Expense Tracker'} titleTag={'Login in to see your expenses.'} />
      </div>
      <div className={style.authenticationContainer}>
        <AuthenticationForm
          title={'Login'}
          onSubmit={handleEmailLogin}
          onChangeEmail={(e) => setEmail(e.target.value)}
          onChangePassword={(e) => setPassword(e.target.value)}
          text='Login'
          valuePassword={password}
          valueEmail={email}
          onGoogleFunctionality={handleGoogleLogin}
        />
        {/* TODO: check the styling of the error message in UI */}
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Authentication;
