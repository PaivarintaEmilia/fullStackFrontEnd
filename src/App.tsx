import React from "react";
// testaukseen
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importoidaan reitityskomponentit
import Balance from './pages/balance/Balance';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Authentication from "./pages/Authentication/Authentication";
import Register from "./pages/register/Register";
import EditIncome from "./pages/editIncome/EditIncome";
import EditExpense from "./pages/editExpense/editExpense";


const App: React.FC = () => {

  return (
    <>
      <Router> {/* Router-komponentti määrittää reitityksen juuren */}
        <Header />
        <Routes> {/* Routes-konteineri sisältää yksittäiset reitit */}
          <Route path="/" element={<Authentication />} /> {/* Route to Login-page */}
          <Route path="/register" element={<Register />} /> {/* Route to Register-page */}
          <Route path="/home" element={<Home />} /> {/* Route to Home-page */}
          <Route path="/balance" element={<Balance />} /> {/* Route to Balance-page */}
          <Route path="/edit-income" element={<EditIncome />} /> {/* Route to edit Incomes */}
          <Route path="/edit-expense" element={<EditExpense />} /> {/* Route to edit Expenses */}
        </Routes>
        <Footer />
      </Router>

    </>

  );
}

export default App;
