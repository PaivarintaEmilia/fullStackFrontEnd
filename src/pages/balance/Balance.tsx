import React from "react";
import Hero from "../../components/Hero/Hero";
import AddForms from "../../components/AddEditForm/AddForms";
import NavContainer from "../../components/NavContainer/NavContainer";
import DataCard from "../../components/DataCards/DataCard";
import styles from "./Balance.module.css";




const Balance: React.FC = ({

}) => {


  return (
    <div>
      <Hero heroTitle={"See your monthly income and expenses."} titleTag={"Choose a time period and see the income a budget between given time."} />
      {/* TODO: Lisätään sort-toiminnallisuus myöhemmin, missä käyttäjä voi valikoida data valitun kuukauden ja vuoden perusteella. */}
      <h2 className={styles.balanceTitle}>Expenses</h2>
      <div className={styles.dataCardsContainer}>
        <DataCard title={"Food Total"} totalAmount={200} />
        <DataCard title={"Housing Total"} totalAmount={200} />
      </div>
      <h2 className={styles.balanceTitle}>Income</h2>
      <div className={styles.dataCardsContainer}>
        <DataCard title={"Salary"} totalAmount={1500} />
      </div>

      {/* Section for adding incomes and expenses. */}
      <AddForms />

      {/* Section for navigation. */}
      <NavContainer 
        navigateToFirstRoute="/home" 
        navigateToSecondRoute={"/balance"} 
        buttonTextFirst={"Back to Home"} 
        buttonTextSecond={"Log Out"} />

    </div>
  );
};

export default Balance;