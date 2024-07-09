document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const expenseList = document.getElementById('expense-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const description = descriptionInput.value;
        const amount = amountInput.value;

        const response = await fetch('http://localhost:5000/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, amount })
        });

        const expense = await response.json();

        addExpenseToDOM(expense);

        descriptionInput.value = '';
        amountInput.value = '';
    });

    const fetchExpenses = async () => {
        const response = await fetch('http://localhost:5000/api/expenses');
        const expenses = await response.json();
        expenses.forEach(expense => addExpenseToDOM(expense));
    };

    const addExpenseToDOM = (expense) => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: $${expense.amount}`;
        expenseList.appendChild(li);
    };

    fetchExpenses();
});
