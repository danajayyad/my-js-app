document.addEventListener('DOMContentLoaded', displayExpenses);

document.getElementById('expense-form').addEventListener('submit', addExpense);
document.getElementById('budget-form').addEventListener('submit', saveBudget);


function addExpense(event) {
    event.preventDefault();

    const expenseInput = document.getElementById('expense-input');
    const amountInput = document.getElementById('amount-input');
    const categoryFilter = document.getElementById('category-filter').value;

    const expense = expenseInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!expense || isNaN(amount) || amount <= 0) return;

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ expense, categoryFilter, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));

    expenseInput.value = '';
    amountInput.value = '';
    document.getElementById('category-filter').value = '';

    displayExpenses();
}


function displayExpenses() {
    const container = document.getElementById('expense-container');
    container.innerHTML = '';

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (expenses.length === 0) {
        container.innerHTML = '<p class="text-muted">No expenses added yet.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-bordered text-center';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Amount</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    expenses.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.expense}</td>
            <td>${item.categoryFilter}</td>
            <td>$${item.amount.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);


    const  totalExp = expenses.reduce((sum, ex) => sum + ex.amount, 0);
     

    const budget = parseInt(localStorage.getItem('budget'));

    const summary = document.createElement('div');
    summary.innerHTML = ` <h3 class="mt-5 mb-3">Your Expense Summary:</h3>
    <p class='fw-bold'>Budget : ${budget}</p>
    <p class='fw-bold'>Total Expenses : ${totalExp}</p>
    <p class="${totalExp > parseInt(budget) ? 'text-danger fw-bold' : 'text-success fw-bold'}">
        STATUS: ${totalExp > parseInt(budget) ? 'You Exceeded your budget' : 'You are safe!'}
    </p>    `;

    container.appendChild(summary);


}


function saveBudget(e) {
    e.preventDefault();
    const budgetInput = document.getElementById('budget');
    const budget = budgetInput.value;
    localStorage.setItem('budget', budget);
    budgetInput.value = '';
    displayExpenses();
}

