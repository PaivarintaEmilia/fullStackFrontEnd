Expense Tracker
===============

Overview
--------

Expense Tracker is a React and TypeScript-based application designed to help users manage their finances by tracking income and expenses. The application uses Supabase as the backend for authentication and data storage.

Features
--------

*   **User Authentication**:
    
    *   Email and password registration/login.
        
    *   Google OAuth login.
        
*   **Expense Management**:
    
    *   Add, edit, and delete expenses.
        
    *   Categorize expenses by type.
        
*   **Income Management**:
    
    *   Add, edit, and delete income entries.
        
*   **Dashboard**:
    
    *   View total income, expenses, and balance.
        
    *   Monthly income and expense summaries.
        
*   **Data Filters**:
    
    *   View income and expense data filtered by month and year.
        
*   **Responsive Design**:
    
    *   Optimized for various devices.
        

Getting Started
---------------

### Prerequisites

1.  Node.js (>= 16.x)
    
2.  npm or yarn
    

### Installation

1.  Clone the repository:

```
git clone <repository-url>
cd <repository-directory>
```

2.  Install dependencies:

```
npm install
```
    
3.  Configure environment variables:
    
    *   Create a `.env` file in the root directory based on the provided `.env.example`.
        
    *   Set up your Supabase project credentials.
        

### Running the Application

    *   Start the development server:
        
```
npm run dev
```

*   npm run dev
    
*   Open the app in your browser at `http://localhost:3000`.
    

### Building for Production

*   Build the application:

```
npm run build
```
    
*   Serve the production build:

```
npm run preview
```


Key Files
---------

### App.tsx

Defines the main application structure and routes, including:

*   `/`: Login page
    
*   `/register`: User registration page
    
*   `/home`: Dashboard for income and expense tracking
    
*   `/balance`: Detailed breakdown of income and expenses
    
*   `/edit-income`: Edit an income entry
    
*   `/edit-expense`: Edit an expense entry
    

### Authentication

*   `Authentication.tsx`: Handles user login.
    
*   `Register.tsx`: Handles user registration.
    

### Expense and Income Management

*   `EditIncome.tsx & EditExpense.tsx`: Pages for editing individual entries.
    
*   `AddForms.tsx`: Component for adding new income and expense entries.
    
*   `Balance.tsx`: Displays categorized and filtered income/expense data.
    

### Reusable Components

*   Hero: Displays a banner with a title and subtitle.
    
*   NavContainer: Navigation buttons for switching between pages.
    
*   DataCard: Displays categorized data with options for deletion.
    
*   PopUp: Confirmation modal for deletion actions.
    

Dependencies
------------

Key dependencies used in the project include:

*   `react`: For building user interfaces.
    
*   `react-router-dom`: For routing and navigation.
    
*   `@supabase/supabase-js`: For backend authentication and database interactions.
    
*   `@mui/material and @emotion/react`: For UI components and styling.
    

Future Improvements
-------------------

*   Add detailed analytics for spending habits.
    
*   Introduce notifications for upcoming bills or budget limits.
    
*   Create functionality to user to create expense categories.
    

License
-------

This project is licensed under the MIT License.

