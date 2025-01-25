import React, { useEffect, useState } from "react";
import styles from "./PopUp.module.css";
import Button from "../../common/Button";
import supabase from "../../../supabase";


interface DeletePopUpProps {
    itemId: number;
    onClose: () => void;
    type: "incomes" | "expenses";
}

const DeletePopUp: React.FC<DeletePopUpProps> = ({ itemId, onClose, type }) => {

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


    /** DELETE ITEM */
    const handleDelete = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!userToken) {
            console.error("No user token found. Function can not be implemented.")
            return;
        }

        const tableName = type === "incomes" ? "incomes" : "expenses";

        try {
            const { error } = await supabase
                .from(tableName)
                .delete()
                .eq("id", itemId)
                .eq("userid", userId);

            if (error) {
                console.error(`Error deleting item from ${tableName}:`, error);
            } else {
                console.log(`Item deleted successfully from ${tableName}`);
                window.location.reload();
            }

            onClose(); // Sulkee popupin onnistuneen poiston jälkeen
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    return (
        <div
            className={styles.backGroundLayOut}
            onClick={onClose} // Sulkee popupin, kun käyttäjä klikkaa taustaa
        >
            <div
                className={styles.popUpContainer}
                onClick={(e) => e.stopPropagation()} // Estää taustaklikkausten propagoinnin
            >
                <h2>Are you sure you want to delete this item?</h2>
                <form onSubmit={handleDelete}>
                <div className={styles.buttonContainer}>
                    <Button
                        name="back"
                        type="button"
                        value=""
                        className="global-btn"
                        text="Back"
                        onClick={onClose}
                    />
                    <Button
                        name="delete"
                        type="submit"
                        value=""
                        className="global-btn-black"
                        text="Delete item"
                        onClick={() => { }}
                    />
                </div>

                </form>

            </div>
        </div>
    );
};

export default DeletePopUp;
