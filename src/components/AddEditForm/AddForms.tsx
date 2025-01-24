import React, { useEffect, useState } from "react";
import AddEditForm from "./AddEditForm";
import styles from "./AddEditForm.module.css";
import supabase from "../../../supabase";



const AddForms: React.FC = () => {

    // Tilamuuttujat Income-lomakkeelle tietojen lähetykseen back-endille
    const [incomeNote, setIncomeNote] = useState<string>("")
    const [incomeAmount, setIncomeAmount] = useState<number>()

    // Tilamuuttujat Expense-lomakkeelle tietojen lähetykseen back-endille
    const [expenseNote, setExpenseNote] = useState<string>("")
    const [expenseAmount, setExpenseAmount] = useState<number>()
    const [selectCategory, setSelectCategory] = useState<number>()

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
    // Funktio incomeNote-muuttujan päivittämiseen
    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncomeNote(e.target.value);
    };

    // Funktio incomeAmount-muuttujan päivittämiseen
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Muutetaan syötä numeeriseen muotoon
        const value = parseFloat(e.target.value);
        // Asetetaan undefined, jos syöte ei olekaan numeerisessa muodossa
        setIncomeAmount(isNaN(value) ? undefined : value);
    };

    // Funktio expenseNote-muuttujan päivittämiseen
    const handleExpenseNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseNote(e.target.value);
    };

    // Funktio expenseAmount-muuttujan päivittämiseen
    const handleExpenseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Muutetaan syötä numeeriseen muotoon
        const value = parseFloat(e.target.value);
        // Asetetaan undefined, jos syöte ei olekaan numeerisessa muodossa
        setExpenseAmount(isNaN(value) ? undefined : value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value); // Muutetaan valittu arvo numeroksi
        setSelectCategory(isNaN(value) ? undefined : value); // Asetetaan undefined, jos valinta ei ole luku
    };


    const submitFormExpense = async (e: React.FormEvent) => {
        e.preventDefault(); // Estetään oletustoiminto

        if (!userToken) {
            console.error("No user token found. Function can not be implemented.")
            return;
        }

        try {
            // Add the new data to the database
            const { error } = await supabase
                .from("expenses")
                .insert([
                    {
                        userid: userId,
                        categoryid: selectCategory,
                        amount: expenseAmount,
                        description: expenseNote,
                        createdat: new Date(),
                    },
                ]);

            if (error) {
                throw error;
            }

            // Empty data from the useStates
            setExpenseNote("");
            setExpenseAmount(undefined);
            setSelectCategory(undefined);
        } catch (error) {
            console.error("Error while adding expense: ", error);
        }
    };


    // Funktio datan lähettämiseen back-endille Income-formin kautta
    const submitFormIncome = async (e: React.FormEvent) => {

        // Ei sittenkään estetä sivun päivittämistä, sillä yläosan tiedot tulee päivittää
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
                        description: incomeNote,
                        createdat: new Date(),
                    }
                ]);
            
                if (error) {
                    throw error;
                };

                // Empty states
                setIncomeAmount(undefined);
                setIncomeNote("");
        } catch (error) {
            console.error("Error while adding expense: ", error);
        }
    };



    return (
        <div className={styles.formBackground}>
            <div className={styles.formContainer}>
                <AddEditForm
                    formTitle={"Expenses"}
                    noteName={"Description"}
                    noteValue={expenseNote}
                    amountName={"Amount"}
                    amountValue={expenseAmount !== undefined ? expenseAmount.toString() : ""}
                    buttonText={"Add Expenses"}
                    noteChange={handleExpenseNoteChange}
                    amountChange={handleExpenseAmountChange}
                    selectChange={handleSelectChange} // Selecting change
                    onButtonClick={function (): void {
                        throw new Error("Function not implemented.");
                    } }
                    onSubmit={submitFormExpense} 
                    selectValue={0}                />
                <AddEditForm
                    formTitle={"Income"}
                    noteName={"Description"}
                    noteValue={incomeNote}
                    amountName={"Amount"}
                    amountValue={incomeAmount !== undefined ? incomeAmount.toString() : ""} // Muutetaan takaisin string-muoton. Jos ei ole undefined tämä on määritetty arvo 
                    buttonText={"Add Income"}
                    noteChange={handleNoteChange}
                    amountChange={handleAmountChange}
                    selectChange={() => { }} // Selectin change 
                    onButtonClick={function (): void {
                        throw new Error("Function not implemented."); // Tarvitaanko tätä??
                    }}
                    onSubmit={submitFormIncome}
                    selectValue={0}
                />


            </div>

        </div>

    );
}

export default AddForms;


