import React from "react";
import styles from "./DataCard.module.css";
import DataCardItemList from "./DataCardItemList";


interface DataCardProps {
    title: string;
    totalAmount: number;
    // DataCardListing komponentille vietävä data
    items: { id: number; description: string; amount: number; }[];
    type: "expenses" | "incomes";
    onDelete: (id: number, type: "incomes" | "expenses") => void; // Välitetään onDelete-proppi

}



const DataCard: React.FC<DataCardProps> = ({
    title,
    totalAmount,
    items,
    type,
    onDelete
}) => {

    return (
        <div className={styles.dataCardContainer}>
            <div className={styles.cardHeroContainer}>
                <h3>{title}</h3>
                <p>{totalAmount}€</p>
            </div>
            <DataCardItemList 
                items={items}
                onDelete={onDelete} 
                type={type}                 
            />

        </div>
    );
};

export default DataCard;