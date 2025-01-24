import React from "react";


interface SelectProps {
    options: { category_id: number; category_name: string }[];
    id: string;
    className: string,
    value: number | undefined,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


const Select: React.FC<SelectProps> = ({ options, onChange, id, className, value }) => {

    return (
        <select onChange={onChange} value={value} id={id} className={className}>
            {options.map(option => (
                <option key={option.category_id} value={option.category_id}>
                    {option.category_name}
                </option>
            ))}
        </select>
    );
}

export default Select;