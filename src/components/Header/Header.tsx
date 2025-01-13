import React from "react";
import Img from "../../common/Img";
import ButtonComponent from "../../common/Button";
import { useNavigate, useLocation } from 'react-router-dom';
// Styling
import styles from './Header.module.css';
import supabase from "../../../supabase";




const Header: React.FC = () => {

    const navigate = useNavigate(); // react-router-dom hook navigointiin
    const location = useLocation(); // Hae nykyinen sijainti

    const navigateLogin = () => {
        navigate('/login');
    };

    const navigateRegister = () => {
        navigate('/register');
    };

    const navigateLogout = () => {
        navigate('/logout');
    };

    // LogOut
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        navigate('/');
    }



    return (
        <div className={styles.headerContainer}>
            <Img
                source="/photos/Logo.png"
                alt="LogoIpsum logo for the Project."
                className={styles.logo}
                id="nav-container-img-id" // Mieti tarvitaanko tätä oikeastaan ollenkaan.
            />
            <div className={styles.btnContainer}>
                {location.pathname == '/' &&
                    <ButtonComponent
                        name="register"
                        type="button"
                        value="" // tarvitaanko navContainerissa?
                        className={styles.registerBtn}
                        id="global-btn"
                        onClick={navigateRegister}
                        text="Register"
                    />
                }
                {location.pathname == '/register' && // Näytetään vaan /register pagessa
                    <ButtonComponent
                        name="Login"
                        type="button"
                        value="" // tarvitaanko navContainerissa?
                        className={styles.loginBtn}
                        id=""
                        onClick={navigateLogin}
                        text="Login"
                    />
                }
                {!(location.pathname === '/login' || location.pathname === '/register') &&
                    <ButtonComponent
                        name="Logout"
                        type="button"
                        value="" // tarvitaanko navContainerissa?
                        className={styles.logOutBtn}
                        id="logOutHidden"
                        onClick={signOut}
                        text="Logout"
                    />
                }
            </div>
        </div>
    );
}

export default Header;