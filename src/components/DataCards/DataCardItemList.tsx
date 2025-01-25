import React, { useState } from 'react';
import styles from "./DataCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


interface Item {
    id: number;
    description: string;
    amount: number;
}

interface DataCardItemListProps {
    items: Item[];
    type: "incomes" | "expenses";
    onDelete: (id: number, type: "incomes" | "expenses") => void; // Välitetään sekä ID että tyyppi
}

const DataCardItemList: React.FC<DataCardItemListProps> = ({ items, onDelete, type }) => {

    const navigate = useNavigate();

    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const handleMouseEnter = (id: number) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    /** OPTIONS TO HANDLE EXPENSE OR INCOME TABLES EDIT */
    const handleEdit = (id: number, type: "incomes" | "expenses") => {
        console.log(`Edit item with id: ${id}`);

        const selectedItem = items.find(item => item.id === id);

        if (selectedItem) {
            if (type === "incomes") {
                navigate(`/edit-income`, { state: { ...selectedItem } });
                console.log(`Navigation ok to edit income`, selectedItem);
            } else if (type === "expenses") {
                navigate(`/edit-expense`, { state: { ...selectedItem } });
                console.log(`Navigation ok to edit expense`, selectedItem);
            }
        }
    };

    return (
        <>
            {items.map((item) => (
                <div
                    key={item.id}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    className={styles.listItemContainer}
                >
                    <div className={styles.itemTitleOptionContainer}>

                        <h4>{item.description}</h4>
                        {/* On hover edit or delete options */}
                        {hoveredItem === item.id && (
                            <div className={styles.itemOptionsContainer}>
                                <button onClick={() => handleEdit(item.id, type)}><EditIcon /></button>
                                <button onClick={() => onDelete(item.id, type)}><DeleteIcon /></button>
                            </div>
                        )}
                    </div>
                    <p>{item.amount}€</p>
                </div>
            ))}
        </>
    );
};

export default DataCardItemList;
