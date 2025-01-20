import React from "react";
// Styling
import styles from "./EditIncome.module.css";
import EditIncomeForm from "../../components/AddEditForm/EditIncomeForm";

const EditIncome: React.FC = () => {
  

  return (
    <div>
      {/* Add incomes form */}
      <div className={styles.addFormContainer}>
        <EditIncomeForm />
      </div>
    </div>
  );
};

export default EditIncome;
