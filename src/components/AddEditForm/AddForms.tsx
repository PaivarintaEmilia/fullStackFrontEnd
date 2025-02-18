import React, { useEffect, useState } from "react";
import AddEditForm from "./AddEditForm";
import styles from "./AddEditForm.module.css";
import supabase from "../../../supabase";



const AddForms: React.FC = () => {

    // UseStates for handeling Income-data
    const [incomeDesc, setIncomeDesc] = useState<string>("")
    const [incomeAmount, setIncomeAmount] = useState<number>()

    // UseStates for handeling Expense-data
    const [expenseDesc, setExpenseDesc] = useState<string>("")
    const [expenseAmount, setExpenseAmount] = useState<number>()
    const [selectCategory, setSelectCategory] = useState<number | undefined>(1)

    // Usestate for JWT token and users ID
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);


    // Check users JWT token
    useEffect(() => {
        // Get the JWT token from Supabase
        const fetchAuthToken = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error("Error fetching the session: ", error);
                return;
            }

            if (session) {
                setUserToken(session.access_token);
                // Get the user id
                try {
                    const { data: { user }, error: userError } = await supabase.auth.getUser(session.access_token);
                    if (userError) {
                        throw userError;
                    }
                    setUserId(user?.id || null);
                } catch (userFetchError) {
                    console.error("Error fetching user ID:", userFetchError);
                }
            } else {
                console.error("No token found. User might have to log in.")
            }
        };

        fetchAuthToken();
    }, []);

    /* HANDLE FUNCTIONS */

    // Handle incomes Description-field changes
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncomeDesc(e.target.value);
    };

    // Handle incomes Amount-field changes
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        // Asetetaan undefined, jos syöte ei olekaan numeerisessa muodossa
        setIncomeAmount(isNaN(value) ? undefined : value);
    };

    // Handle expenses Description-field changes
    const handleExpenseDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseDesc(e.target.value);
    };

    // Handle expenses Amount-field changes
    const handleExpenseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        // Asetetaan undefined, jos syöte ei olekaan numeerisessa muodossa
        setExpenseAmount(isNaN(value) ? undefined : value);
    };

    // Handle Select-field changes
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value); 
        setSelectCategory(isNaN(value) ? undefined : value); // Asetetaan undefined, jos valinta ei ole luku
        console.log("Selected category ID in handle function:", selectCategory);

    };


    /* CREATE EXPENSE */ 
    const submitFormExpense = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!userToken) {
            console.error("No user token found. Function can not be implemented.")
            return;
        }

        console.log("Selected category ID in adding function:", selectCategory);


        try {
            // Add the new data to the database
            const { error } = await supabase
                .from("expenses")
                .insert([
                    {
                        userid: userId,
                        categoryid: selectCategory,
                        amount: expenseAmount,
                        description: expenseDesc,
                        createdat: new Date(),
                    },
                ]);

            if (error) {
                throw error;
            }


            // Empty data from the useStates
            setExpenseDesc("");
            setExpenseAmount(undefined);
            setSelectCategory(undefined);
        } catch (error) {
            console.error("Error while adding expense: ", error);
        }
    };


    /* CREATE INCOME */ 
    const submitFormIncome = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!userToken) {
            console.error("No user token found. Function can not be implemented.")
            return;
        }

        try {
            const { error } = await supabase
                .from("incomes")
                .insert([
                    {
                        userid: userId,
                        amount: incomeAmount,
                        description: incomeDesc,
                        createdat: new Date(),
                    }
                ]);
            
                if (error) {
                    throw error;
                };

                // Empty states
                setIncomeAmount(undefined);
                setIncomeDesc("");
        } catch (error) {
            console.error("Error while adding expense: ", error);
        }
    };


    return (
        <div className={styles.formBackground}>
            <div className={styles.formContainer}>
                <AddEditForm
                    formTitle={"Expenses"}
                    descriptionName={"Description"}
                    descriptionValue={expenseDesc}
                    amountName={"Amount"}
                    amountValue={expenseAmount !== undefined ? expenseAmount.toString() : ""}
                    buttonText={"Add Expenses"}
                    noteChange={handleExpenseDescChange}
                    amountChange={handleExpenseAmountChange}
                    selectChange={handleSelectChange} // Selecting change
                    onButtonClick={() => { } }
                    onSubmit={submitFormExpense} 
                    selectValue={selectCategory}                />
                <AddEditForm
                    formTitle={"Income"}
                    descriptionName={"Description"}
                    descriptionValue={incomeDesc}
                    amountName={"Amount"}
                    amountValue={incomeAmount !== undefined ? incomeAmount.toString() : ""} 
                    buttonText={"Add Income"}
                    noteChange={handleDescChange}
                    amountChange={handleAmountChange}
                    selectChange={() => { }} 
                    onButtonClick={() => { } }
                    onSubmit={submitFormIncome}
                    selectValue={selectCategory}
                />
            </div>
        </div>
    );
}

export default AddForms;


