import React, { useState } from 'react';
import styles from "./DataCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';



interface Item {
    id: number;
    description: string;
    amount: number;
  }
  
  interface DataCardItemListProps {
    items: Item[];
  }
const DataCardItemList: React.FC<DataCardItemListProps> = ({ items }) => {


    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const handleMouseEnter = (id: number) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete item with id: ${id}`);
        // Lisää logiikka itemin poistamiseen
    };

    const handleEdit = (id: number) => {
        console.log(`Edit item with id: ${id}`);
        // Lisää logiikka itemin muokkaamiseen
    };

    return (
        <div>
            {items.map((item) => (
                <div
                    key={item.id}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    className={styles.listItemContainer}
                >
                    <div className={styles.itemTitleOptionContainer}>


                        <h4>{item.description}</h4>
                        {hoveredItem === item.id && (
                            <div className={styles.itemOptionsContainer}>
                                <button onClick={() => handleEdit(item.id)}><EditIcon /></button>
                                <button onClick={() => handleDelete(item.id)}><DeleteIcon /></button>
                            </div>
                        )}
                    </div>
                    <p>{item.amount}€</p>

                </div>
            ))}
        </div>
    );
};

export default DataCardItemList;
