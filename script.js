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

function addTransaction(e) {
  e.preventDefault();

  if (transactionText.value === '' || transactionAmount.value === '') {
    alert(`Don't leave empty fields`)
  } else {
    const transaction = {
      id: generateID(),
      text: transactionText.value,
      amount: parseInt(transactionAmount.value),
    }

    transactions.push(transaction);
    addTransactionsToList(transaction);
    updateValues()

    transactionText.value = '';
    transactionAmount.value = ''
  }
}

function generateID() {
  const id = Math.floor(Math.random() * 10000000);

  return id
}

// Add transactions to list

function addTransactionsToList(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class='delete-btn' onClick="removeTransaction(${transaction.id})">x</button>
`;

  list.appendChild(item)
};

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const incomeAmount = amounts
    .filter(amount => amount > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const expenseAmount = (amounts
    .filter(amount => amount < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2)

  balance.innerText = `£${total}`;
  income.innerText = `£${incomeAmount}`;
  expense.innerText = `£${expenseAmount}`;

};

function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id)

  init()
}

function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionsToList);
  updateValues()
}

init();
form.addEventListener('submit', addTransaction)