import React, { useEffect, useState } from "react";
import ButtonComponent from "../../common/Button";
import InputField from "../../common/InputField";
import Select from "../../common/Select";
import supabase from "../../../supabase";

interface AddEditFormProps {
    formTitle: string;
    noteName: string;
    noteValue: string;
    amountName: string;
    amountValue: string;
    buttonText: string;
    noteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    amountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // Select-input functionalities
    selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectValue: number;
    onButtonClick: () => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
    formTitle,
    noteName,
    noteValue,
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

    /* Select komponentin toiminnot, koska nämä pysyvät samana lomakkeelta toiselle*/

    // Options tilan alustaminen
    const [options, setOptions] = useState<{ category_id: number; category_name: string }[]>([]); 


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
                    category_id: category.id,
                    category_name: category.name
                })));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
    
        fetchCategories();
    }, []);
    

    return (
        <div>
            <div >
                <form onSubmit={onSubmit}>
                    <h3>{formTitle}</h3>
                    <InputField
                        name={noteName}
                        type={"text"}
                        placeholder={"Note"}
                        value={noteValue}
                        className={"global-input"}
                        id={"global-input"}
                        onChange={noteChange}
                    />
                    {/* This element is only shown with using Expense forms. */}
                    {!(formTitle == "Income" || formTitle == "Edit Income") &&
                        <Select
                        options={options}
                        onChange={selectChange}
                        id="global-select"
                        className={""} 
                        value={selectValue}                        />
                    }
                    <InputField
                        name={amountName}
                        type={"number"}
                        placeholder={"Amount"}
                        value={amountValue}
                        className={"global-input"}
                        id={"global-input"}
                        onChange={amountChange}
                    />
                    <ButtonComponent
                        name={""}
                        type={"submit"}
                        value={""}
                        className={""}
                        id={"global-btn"}
                        text={buttonText}
                        onClick={onButtonClick}
                    />
                </form>
            </div>
        </div>
    );
}

export default AddEditForm;

