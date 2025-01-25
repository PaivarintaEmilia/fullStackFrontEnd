import React from "react";
import Img from "../../common/Img";
import styles from "./Footer.module.css"


const Footer: React.FC = () => {


    return (
        <div className={styles.FooterContainer}>
            <Img
                source="/photos/Logo.png"
                alt="LogoIpsum logo for the Project."
                className={styles.logoFooter}
                id="nav-container-img-id" // Mieti tarvitaanko tätä oikeastaan ollenkaan.
            />
            <div className={styles.navigationContainer}>
                <div className={styles.linkContainer}>
                    <h4>Contact</h4>
                    <a href="mailto:mariaemilia.paivarinta@gmail.com">mariaemilia.paivarinta@gmail.com</a>
                </div>                
                <div className={styles.linkContainer}>
                    <h4>Socials</h4>
                    <a href="https://github.com/PaivarintaEmilia">gitHub</a>
                    <a href="https://www.linkedin.com/in/emilia-p%C3%A4iv%C3%A4rinta-8413a8152/">LinkedIn</a>
                </div>                
                <div className={styles.linkContainer}>
                    <h4>Linklist</h4>
                    <a href="/home">Home</a>
                    <a href="/balance">Balance</a>
                    <a href="https://fullstackdoc.onrender.com/">Documentation</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;