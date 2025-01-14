document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = new Date().toLocaleDateString();
    
    addTransaction(date, description, amount, type);
    updateOverview();
    
    document.getElementById('transaction-form').reset();
});

let transactions = [];

function addTransaction(date, description, amount, type) {
    const transaction = { date, description, amount, type };
    transactions.push(transaction);
    const transactionList = document.getElementById('transaction-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${date}</td>
        <td>${description}</td>
        <td>${amount}</td>
        <td>${type}</td>
    `;
    transactionList.appendChild(row);
}

function updateOverview() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = totalIncome;
    document.getElementById('total-expenses').textContent = totalExpenses;
    document.getElementById('balance').textContent = balance;
}
