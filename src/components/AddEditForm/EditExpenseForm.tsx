import React, { useEffect, useState } from "react";
import AddEditForm from "./AddEditForm";
import styles from "./AddEditForm.module.css";
import supabase from "../../../supabase";
import { useLocation, useNavigate } from "react-router-dom";


const EditExpenseForm: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { id, description, amount, categoryid } = location.state || {};
    console.log("Expense id: ", id);
    console.log("Expense description: ", description);
    console.log("Expense amount: ", amount);
    console.log("Expense categoryid: ", categoryid);

    // Tilamuuttujat Income-lomakkeelle tietojen lähetykseen back-endille
    const [expenseDesc, setExpenseDesc] = useState<string>(description || "");
    const [expenseAmount, setExpenseAmount] = useState<number>(amount || 0);
    const [expenseCategory, setExpenseCategory] = useState<number>(categoryid || 0);

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
        setExpenseDesc(e.target.value);
    };

    // Funktio incomeAmount-muuttujan päivittämiseen
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Muutetaan syötä numeeriseen muotoon
        const value = parseFloat(e.target.value);
        // Asetetaan undefined, jos syöte ei olekaan numeerisessa muodossa
        setExpenseAmount(value);
    };

    // Function to handle select input changes
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value); // Muutetaan valittu arvo numeroksi
        setExpenseCategory(value); // Asetetaan undefined, jos valinta ei ole luku
    };



    // Funktio datan lähettämiseen back-endille Income-formin kautta
    const submitFormExpense = async (e: React.FormEvent) => {

        console.log("Submit formin sisällä");

        // Ei sittenkään estetä sivun päivittämistä, sillä yläosan tiedot tulee päivittää
        e.preventDefault();

        if (!userToken) {
            console.error("No user token found. Function can not be implemented.")
            return;
        }

        if (!id || !expenseDesc || !expenseAmount || !expenseCategory) {
            console.error("Missing required fields: ", { id, expenseDesc, expenseAmount, expenseCategory });
            return;
        }


        try {
            const { error } = await supabase
                .from("expenses")
                .update(
                    {
                        amount: expenseAmount,
                        description: expenseDesc,
                        categoryid: expenseCategory,
                    }
                )
                .eq("id", id)
                .eq("userid", userId);



            if (error) {
                console.error("Supabase error:", error);
                throw error;
            };
            console.log("Submit formin sisällä navigation back to balance");
            navigate("/balance");

        } catch (error) {
            console.error("Error while adding expense: ", error);
        }
    };

    return (
        <div className={styles.formBackground}>
            <div className={styles.formContainer}>
                <AddEditForm
                    formTitle={"Edit Expense"}
                    noteName={"Description"}
                    noteValue={expenseDesc}
                    amountName={"Amount"}
                    amountValue={expenseAmount.toString()} // Muutetaan takaisin string-muoton. Jos ei ole undefined tämä on määritetty arvo 
                    buttonText={"Save Changes"}
                    noteChange={handleNoteChange}
                    amountChange={handleAmountChange}
                    selectChange={handleSelectChange} // Selectin change. Not needed in Income
                    onButtonClick={function (): void {
                        throw new Error("Function not implemented."); // Tarvitaanko tätä?? Noo?
                    } }
                    onSubmit={submitFormExpense} 
                    selectValue={expenseCategory}                />
            </div>
        </div>
    );
}

export default EditExpenseForm;


