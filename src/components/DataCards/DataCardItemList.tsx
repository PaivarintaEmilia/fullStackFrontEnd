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

    //const [popupVisible, setPopupVisible] = useState<boolean>(false)
   // const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleMouseEnter = (id: number) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    //const handleDelete = (id: number) => {
        //console.log(`Delete item with id: ${id}`);
        // Set PopUp visible
      //  setPopupVisible(!popupVisible);
      //  setDeleteId(id);

       // const selectedItem = items.find(item => item.id === id);

     //   if (selectedItem) {
            // Set PopUp visible
         //   setPopupVisible(!popupVisible);
       //     console.log(`Navigation ok`);
     //   };
        // Lisää logiikka itemin poistamiseen
        // Logiikka pop uppiin
        //const response = await supabase
        //  .from('countries')
        //.delete()
        //.eq('id', 1)

   // };


    const handleEdit = (id: number) => {
        console.log(`Edit item with id: ${id}`);

        const selectedItem = items.find(item => item.id === id);

        if (selectedItem) {
            navigate(`/edit-income`, { state: { ...selectedItem } });
            console.log(`Navigation ok`);
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
                        {hoveredItem === item.id && (
                            <div className={styles.itemOptionsContainer}>
                                <button onClick={() => handleEdit(item.id)}><EditIcon /></button>
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
