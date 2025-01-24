import React from "react";
import styles from "./Hero.module.css";
import ButtonComponent from "../../common/Button";
import { useNavigate, useLocation } from 'react-router-dom';

interface HeroProps {
    heroTitle: string,
    titleTag: string,
}

const Hero: React.FC<HeroProps> = ({
    heroTitle,
    titleTag
}) => {

    const navigate = useNavigate();
    const location = useLocation(); // Hae nykyinen sijainti, jotta voidaan piilottaa button tarvittaessa.

    return (
        <div className={styles.HeroContainer}>
            <div className={styles.textContainer}>
                <h1>{heroTitle}</h1>
                <h2>{titleTag}</h2>
                {location.pathname === '/home' &&
                    <ButtonComponent 
                        name={"heroBtn"} 
                        type={"button"} 
                        value={""} 
                        className={"global-btn"} 
                        text={"Check Balance"} 
                        onClick={() => navigate('/balance') }
                    />
                }
            </div>
        </div>
    );
}

export default Hero;