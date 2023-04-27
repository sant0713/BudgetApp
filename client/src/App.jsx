import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Libraries
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Actions
import { logoutAction } from "./actions/logout";
import {
  deleteBudget,
  deleteBudgets,
  deleteExpenses,
} from "./actions/deleteActions";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Pages
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "deleteBudgets",
        action: deleteBudgets,
      },
      {
        path: "deleteExpenses",
        action: deleteExpenses,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
