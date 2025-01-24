import React from "react";
import Img from "../../common/Img";
import ButtonComponent from "../../common/Button";
import { useNavigate } from 'react-router-dom';
// Styling
import styles from './NavContainer.module.css';


interface NavContainerProps {
    navigateToFirstRoute: string;  // Reitti ensimmäiselle painikkeelle
    navigateToSecondRoute: string; // Reitti toiselle painikkeelle
    buttonTextFirst: string;  // Teksti ensimmäiselle painikkeelle
    buttonTextSecond: string; // Teksti toiselle painikkeelle
}


const NavContainer: React.FC<NavContainerProps> = ({
    navigateToFirstRoute,
    navigateToSecondRoute,
    buttonTextFirst,
    buttonTextSecond,
}) => {

    const navigate = useNavigate(); // react-router-dom hook navigointiin

    const handleFirstButtonClick = () => {
        navigate(navigateToFirstRoute); // Navigoi ensimmäiselle reitille
    };

    const handleSecondButtonClick = () => {
        navigate(navigateToSecondRoute); // Navigoi toiselle reitille
    };

    return (
        <div className={styles.navContainer}>
            <Img
                source="/photos/ballImg.png"
                alt="Light purple abstract image that consist of several different sized round objects."
                className={styles.navContainerImg}
                id="nav-container-img-id" // Mieti tarvitaanko tätä oikeastaan ollenkaan.
            />
            <div className={styles.btnContainer}>
                <ButtonComponent
                    name="btnNavContainerFirst"
                    type="button"
                    value="" // tarvitaanko navContainerissa?
                    className={styles.navContainerBtnFirst}
                    onClick={handleFirstButtonClick}
                    text={buttonTextFirst}
                />
                <ButtonComponent
                    name="btnNavContainerSecond"
                    type="button"
                    value="" // tarvitaanko navContainerissa?
                    className={styles.navContainerBtnSecond}
                    onClick={handleSecondButtonClick}
                    text={buttonTextSecond}
                />

            </div>

        </div>
    );
}

export default NavContainer;