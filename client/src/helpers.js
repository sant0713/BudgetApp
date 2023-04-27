// Simulate database connection timeout
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;

  return `${existingBudgetLength * 34} 65% 50%`;
};

export const createBudget = ({ budgetName, budgetAmount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: budgetName,
    createdAt: Date.now(),
    amount: Number(budgetAmount),
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ expenseName, expenseAmount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: expenseName,
    createdAt: Date.now(),
    amount: Number(expenseAmount),
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const deleteExpense = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }

  return localStorage.removeItem(key);
};

// Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

// Formatting Currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};
