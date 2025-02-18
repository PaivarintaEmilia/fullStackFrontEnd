import React, { useEffect, useState } from "react";
import ButtonComponent from "../../common/Button";
import InputField from "../../common/InputField";
import Select from "../../common/Select";
import supabase from "../../../supabase";

interface AddEditFormProps {
    formTitle: string;
    buttonText: string;
    descriptionName: string;
    descriptionValue: string;
    amountName: string;
    amountValue: string;
    noteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    amountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // Select-input functionalities
    selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectValue: number | undefined;
    onButtonClick: () => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
    formTitle,
    descriptionName,
    descriptionValue,
    amountName,
    amountValue,
    buttonText,
    noteChange,
    amountChange,
    selectChange,
    selectValue,
    onButtonClick,
    onSubmit,
}) => {

    const [options, setOptions] = useState<{ categoryid: number; categoryname: string }[]>([]); 

    // Get Categories data for Expense-form
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data, error } = await supabase
                    .from('categories')
                    .select('id, name');
                
                if (error) {
                    throw error;
                }
    
                setOptions(data.map((category) => ({
                    categoryid: category.id,
                    categoryname: category.name
                })));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
    
        fetchCategories();
    }, []);
    

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <h3>{formTitle}</h3>
                    <InputField
                        name={descriptionName}
                        type={"text"}
                        placeholder={"Note"}
                        value={descriptionValue}
                        className={"global-input"}
                        onChange={noteChange}
                    />
                    {/* This element is only shown when Expense-forms are being used. */}
                    {!(formTitle == "Income" || formTitle == "Edit Income") &&
                        <Select
                            options={options}
                            onChange={selectChange}
                            id="global-select"
                            className={""} 
                            value={selectValue}                        
                        />
                    }
                    <InputField
                        name={amountName}
                        type={"number"}
                        placeholder={"Amount"}
                        value={amountValue}
                        className={"global-input"}
                        onChange={amountChange}
                    />
                    <ButtonComponent
                        name={""}
                        type={"submit"}
                        value={""}
                        className={"global-btn"}
                        text={buttonText}
                        onClick={onButtonClick}
                    />
                </form>
            </div>
        </div>
    );
}

export default AddEditForm;

