const balance = document.getElementById('balance');
const income = document.getElementById('money-plus');
const expense = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const transactionText = document.getElementById('text');
const transactionAmount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Salary', amount: 300 },
  { id: 2, text: 'Train ticket', amount: -20 },
  { id: 3, text: 'Dinner', amount: -30 },
  { id: 4, text: 'Refund', amount: 50 },
  { id: 5, text: 'Book', amount: 10 },
];

let transactions = dummyTransactions

// Add transactions to list

function addTransactionsToList(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class='delete-btn'>x</button>
`;

  list.appendChild(item)
}


function innit() {
  list.innerHTML = '';

  transactions.forEach(addTransactionsToList)
}


innit()