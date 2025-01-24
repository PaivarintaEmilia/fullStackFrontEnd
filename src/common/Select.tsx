import React from "react";


interface SelectProps {
    options: { category_id: number; category_name: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    id: string;
    className: string,
    value: number | undefined,
}


const Select: React.FC<SelectProps> = ({ options, onChange, id, className, value }) => {

    return (
        <select onChange={onChange} value={value} id={id} className={className}>
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