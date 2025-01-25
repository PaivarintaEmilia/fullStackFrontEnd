import React, { useEffect, useState } from "react";
import AddEditForm from "./AddEditForm";
import styles from "./AddEditForm.module.css";
import supabase from "../../../supabase";
import { useLocation, useNavigate } from "react-router-dom";


const EditIncomeForm: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { id, description, amount } = location.state || {};
    console.log("Income id: ", id);
    console.log("Income description: ", description);
    console.log("Income amount: ", amount);

    // UseStates for Income-form data
    const [incomeDesc, setIncomeDesc] = useState<string>(description || "");
    const [incomeAmount, setIncomeAmount] = useState<number>(amount || 0);

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
    // Handle income Description-field changes
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncomeDesc(e.target.value);
    };

    // Handle income Amount-field changes
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setIncomeAmount(value);
    };


    /** EDIT INCOME */
    const submitFormIncome = async (e: React.FormEvent) => {

        console.log("Submit formin sisällä");

        e.preventDefault();

        if (!userToken) {
            console.error("No user token found. Function can not be implemented.")
            return;
        }

        if (!id || !incomeDesc || !incomeAmount) {
            console.error("Missing required fields: ", { id, incomeDesc, incomeAmount });
            return;
        }

        try {
            const { error } = await supabase
                .from("incomes")
                .update(
                    {
                        amount: incomeAmount,
                        description: incomeDesc,
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
                    formTitle={"Edit Income"}
                    descriptionName={"Description"}
                    descriptionValue={incomeDesc}
                    amountName={"Amount"}
                    amountValue={incomeAmount.toString()}
                    buttonText={"Save Changes"}
                    noteChange={handleDescChange}
                    amountChange={handleAmountChange}
                    selectChange={() => { } } 
                    onButtonClick={() => { } }
                    onSubmit={submitFormIncome} 
                    selectValue={undefined}                
                />
            </div>
        </div>
    );
}

export default EditIncomeForm;


