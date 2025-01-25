import React from "react";


interface InputFieldProps {
    name: string,
    type: 'text' | 'password' | 'number' | 'hidden', 
    placeholder: string,
    value: string,
    className: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
}


const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, value, className, onChange}) => {

    return <input name={name} type={type} placeholder={placeholder} value={value} className={className} onChange={onChange} />
}

export default InputField;