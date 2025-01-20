import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import AddForms from "../../components/AddEditForm/AddForms";
import NavContainer from "../../components/NavContainer/NavContainer";
import DataCard from "../../components/DataCards/DataCard";
import styles from "./Balance.module.css";
import supabase from "../../../supabase";
import { useNavigate } from "react-router-dom";


// Nämä ovat dataa jotka viedään eteenpäin alemmille komponenteille
interface IncomeData {
  id: number;
  description: string;
  amount: number;
  createdat: string; // YYYY-MM-DD format
}

interface ExpenseData {
  id: number;
  description: string;
  amount: number;
  category: string;
}


const Balance: React.FC = ({

}) => {

  // UseStates for Incomes and Expenses
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
  const [expenseData, setExpenseData] = useState<{ category: string; totalAmount: number; items: ExpenseData[] }[]>([]);
  // UseStates for filter data
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  // navigation
  const navigate = useNavigate();

  // Check if user has logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if ( error || !user ) {
        console.error("User not authenticated: ", error);
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  // Fetch Income-data
  useEffect(() => {
    const fetchIncomeData = async () => {
      // Check the user
      const { data } = await supabase.auth.getUser();
      if (!data?.user) return;

      const { data: incomeData, error: incomeError } = await supabase
        .from('incomes')
        .select('id, description, amount, createdat')
        .eq("userid", data.user.id)
        .gte("createdat", `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-01`)
        .lte("createdat", `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-31`);

      if (incomeError) {
        console.error("Error while fetching income data: ", incomeError);
      } else {
        setIncomeData(incomeData || []);
      }
    };
    fetchIncomeData();
  }, [selectedMonth, selectedYear]);

  // Calculate total amount (income tällä hetkellä)
  const totalAmount = incomeData.reduce((sum, item) => sum + item.amount, 0);

 // Fetch expense data for the selected month and year
 useEffect(() => {
  const fetchExpenseData = async () => {
    // Check the user
    const { data } = await supabase.auth.getUser();
    if (!data?.user) return;

    //const { data: mo } = await supabase.auth.getUser();
    //const userId = mo.user?.id;

    const { data: expenseData, error: expenseError } = await supabase
      .from("expenses")
      .select("id, description, amount, categories(name)")
      .eq("userid", data.user.id)
      .gte("createdat", `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-01`)
      .lte("createdat", `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-31`);

    if (expenseError) {
      console.error("Error fetching expense data:", expenseError);
    } else {
      const groupedData = expenseData?.reduce((acc: any, item: any) => {
        const category = item.categories.name;
        if (!acc[category]) {
          acc[category] = {
            category,
            totalAmount: 0,
            items: []
          };
        }
        acc[category].totalAmount += item.amount;
        acc[category].items.push({
          id: item.id,
          description: item.description,
          amount: item.amount,
          category
        });
        return acc;
      }, {});

      setExpenseData(Object.values(groupedData || {}));
    }
  };

  fetchExpenseData();
}, [selectedMonth, selectedYear]);


  return (
    <div>
      {/* Hero section. */}
      <Hero
        heroTitle={"See your monthly income and expenses."}
        titleTag={"Choose a time period and see the income a budget between given time."}
      />

      {/* Filters for Month and Year */}
      <div className={styles.filterContainer}>
        <label>
          Month:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Expense Section */}
      <h2 className={styles.balanceTitle}>Expenses</h2>
      <div className={styles.dataCardsContainer}>
        {expenseData.map((categoryData) => (
          <DataCard
            key={categoryData.category}
            title={categoryData.category}
            totalAmount={categoryData.totalAmount}
            items={categoryData.items}
          />
        ))}
      </div>

      {/* Section for listing incomes. */}
      <h2 className={styles.balanceTitle}>Income</h2>
      <div className={styles.dataCardsContainer}>
        <DataCard title={"Income"} totalAmount={totalAmount} items={incomeData} />
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