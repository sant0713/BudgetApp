import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

// Delete all budgets
export async function deleteBudgets() {
  //Delete User
  deleteItem({
    key: "budgets",
  });
  toast.success("You've deleted all your budgets.");
  // Redirect
  return redirect("/");
}

// Delete a single budget
export async function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
    associatedExpenses.forEach((expense) => {
      deleteItem({ key: "expenses", id: expense.id });
    });
    toast.success("You've deleted the budget sucessfully.");
  } catch (error) {
    throw new Error("There was a problem deleting the budget.");
  }
  // Redirect
  return redirect("/");
}

export async function deleteExpenses() {
  //Delete User
  deleteItem({
    key: "expenses",
  });
  toast.success("You've deleted all your expenses.");
  // Redirect
  return redirect("/");
}
