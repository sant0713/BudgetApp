import { CurrencyDollarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";

function AddBugetForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const budgets = localStorage.getItem("budgets");

  const formRef = useRef();
  const focusRef = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form method="POST" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Budget Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
      {budgets && (
        <Form
          method="POST"
          action="/deleteBudgets"
          onSubmit={(e) => {
            if (!confirm("Delete all budgets?")) {
              e.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete Budgets</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </div>
  );
}

export default AddBugetForm;
