import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddBugetForm from "../components/AddBugetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import {
  createExpense,
  deleteExpense,
  getAllMatchingItems,
  waait,
} from "../helpers";

//Loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you are trying to find doesn't exist.");
  }

  return { budget, expenses };
}

//Action
export async function budgetAction({ request }) {
  const data = await request.formData();
  // Gets the action which tells what form was submitted and get the rest of the values.
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    await waait();
    try {
      // Create Budget
      deleteExpense({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }

  if (_action === "createExpense") {
    await waait();
    try {
      // Create Budget
      createExpense({
        expenseName: values.newExpense,
        expenseAmount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} showDeleteExpense={false} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name} </span>
            Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
