import React from "react";


interface SelectProps {
    options: { category_id: number; category_name: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    id: string;
    className: string,
}


const Select: React.FC<SelectProps> = ({ options, onChange, id, className }) => {

    return (
        <select onChange={onChange} defaultValue="" id={id} className={className}>
            {/*TODO: Do we need a placeholder? <option value="" disabled>{placeholder}</option>*/}
            {options.map(option => (
                <option key={option.category_id} value={option.category_id}>
                    {option.category_name}
                </option>
            ))}
        </select>
    );
}

export default Select;