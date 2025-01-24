import React from "react";


interface ButtonProps {
    name: string,
    type: 'submit' | 'reset' | 'button',
    value: string,
    className: string,
    text: string,
    onClick: () => void,
}


const ButtonComponent: React.FC<ButtonProps> = ({ name, type, value, className, text, onClick}) => {

    return <button name={name} type={type} value={value} className={className} onClick={onClick} >{text}</button>
}

export default ButtonComponent;