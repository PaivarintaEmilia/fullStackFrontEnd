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
        navigate('/');
    };

    const navigateRegister = () => {
        navigate('/register');
    };

    // LogOut
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        console.error("Error while signing out: ", error)
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
                        className={"global-btn"}
                        onClick={navigateRegister}
                        text="Register"
                    />
                }
                {location.pathname == '/register' && 
                    <ButtonComponent
                        name="Login"
                        type="button"
                        value="" // tarvitaanko navContainerissa?
                        className={"global-btn-black"}
                        onClick={navigateLogin}
                        text="Login"
                    />
                }
                {!(location.pathname === '/' || location.pathname === '/register') &&
                    <ButtonComponent
                        name="Logout"
                        type="button"
                        value="" // tarvitaanko navContainerissa?
                        className={"global-btn-black"}
                        onClick={signOut}
                        text="Logout"
                    />
                }
            </div>
        </div>
    );
}

export default Header;