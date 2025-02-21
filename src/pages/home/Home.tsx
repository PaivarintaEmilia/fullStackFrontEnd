import React, { useState, useEffect } from "react";
import NavContainer from "../../components/NavContainer/NavContainer";
import Hero from "../../components/Hero/Hero";
import TotalCards from "../../components/TotalCards/TotalCards";
import AddForms from "../../components/AddEditForm/AddForms";
// Styling
import styles from "./Home.module.css";
import supabase from "../../../supabase";

/** HUOM TÄMÄ SIVU ON VIELÄ SEURANNASSA, KOSKA VÄLILLÄ ID:N HAKU ONNISTUU JA VÄLILLÄ EI.
 * TÄTÄ VIELÄ SELVITELLÄÄN SIIS. TODO: POISTA TÄMÄ, KUN ONGELMA SELVITETTY.
 */

const Home: React.FC = () => {
  // UseStates
  const [incomeTotal, setIncomeTotal] = useState<number>(0);
  const [expenseTotal, setExpenseTotal] = useState<number>(0);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {

    const checkUser = async () => {

      //const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.auth.getUser();
      console.log('Full response:', data);
      console.log('User object:', data.user);
      console.log('User ID:', data.user?.id);

      if (!data?.user) {
        console.log('User is not signed in');
        return;
      }

      setUserId(data.user?.id);
      console.log('userId: ', userId);

    };

    checkUser();

  }, []);

  // Haetaan data vasta kun ollaan saatu tieto userId:stä
  useEffect(() => {
    if (userId) {
      fetchIncomeTotal();
      fetchExpenseTotal();
    }
  }, [userId]);

  // Get total income
  const fetchIncomeTotal = async () => {
    try {
      const { data, error } = await supabase
        .from('incomes')
        .select('amount')
        .eq("userid", userId)

      if (error) {
        throw error;
      }

      const totalIncome = data.reduce((acc, item) => acc + item.amount, 0);

      setIncomeTotal(totalIncome);
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  };

  // Get total expense
  const fetchExpenseTotal = async () => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('amount')
        .eq("userid", userId)

      if (error) {
        throw error;
      }

      const totalExpense = data.reduce((acc, item) => acc + item.amount, 0);

      setExpenseTotal(totalExpense);
    } catch (error) {
      console.error('Error fetching expense data:', error);
    }
  };

  return (
    <div>
      <Hero
        heroTitle={"Expense Tracker"}
        titleTag={"Welcome to track your income and expenses to better your budgeting."}
      />
      {/* Monthly total amounts */}
      <div className={styles.totalCardsContainer}>
        <TotalCards totalCardTitle={"Income"} totalCardAmount={incomeTotal} />
        <TotalCards totalCardTitle={"Total"} totalCardAmount={parseFloat((incomeTotal - expenseTotal).toFixed(2))} />
        <TotalCards totalCardTitle={"Expenses"} totalCardAmount={expenseTotal} />
      </div>
      {/* Add incomes and expenses */}
      <div className={styles.addFormContainer}>
        <AddForms />
      </div>
      { /* Navigation component */}
      <NavContainer
        navigateToFirstRoute="/balance"
        navigateToSecondRoute="/contact"
        buttonTextFirst="Go to Balance"
        buttonTextSecond="I don't go anywhere just yet"
      />
    </div>
  );
};

export default Home;
