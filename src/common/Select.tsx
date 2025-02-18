import React from "react";


interface SelectProps {
    options: { categoryid: number; categoryname: string }[];
    id: string;
    className: string,
    value: number | undefined,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


const Select: React.FC<SelectProps> = ({ options, onChange, id, className, value }) => {

    return (
        <select onChange={onChange} value={value} id={id} className={className}>
            {options.map(option => (
                <option key={option.categoryid} value={option.categoryid}>
                    {option.categoryname}
                </option>
            ))}
        </select>
    );
}

export default Select;