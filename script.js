/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////
const accounts = [
  {
    owner: "Nafis",
    movements: [2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800],
    interestRate: 1.5, // %
    password: 1234,
    movementsDates: [
      "2021-11-18T21:31:17.178Z",
      "2021-12-23T07:42:02.383Z",
      "2022-01-28T09:15:04.904Z",
      "2022-04-01T10:17:24.185Z",
      "2022-07-08T14:11:59.604Z",
      "2022-09-10T17:01:17.194Z",
      "2022-09-12T23:36:17.929Z",
      "2022-09-15T12:51:31.398Z",
      "2022-09-19T06:41:26.190Z",
      "2022-09-21T08:11:36.678Z",
    ],
    currency: "USD",
    locale: "en-US",
  },
  {
    owner: "Elon Musk",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 5678,
    movementsDates: [
      "2021-12-11T21:31:17.671Z",
      "2021-12-27T07:42:02.184Z",
      "2022-01-05T09:15:04.805Z",
      "2022-02-14T10:17:24.687Z",
      "2022-03-12T14:11:59.203Z",
      "2022-05-16T17:01:17.392Z",
      "2022-08-10T23:36:17.522Z",
      "2022-09-03T12:51:31.491Z",
      "2022-09-18T06:41:26.394Z",
      "2022-09-21T08:11:36.276Z",
    ],
    currency: "EUR",
    locale: "en-GB",
  },
  {
    owner: "Pranto",
    movements: [5600, 3100, -160, -720, -3610, -1000, 8900, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 1234,
    movementsDates: [
      "2021-12-11T21:31:17.671Z",
      "2021-12-27T07:42:02.184Z",
      "2022-01-05T09:15:04.805Z",
      "2022-02-14T10:17:24.687Z",
      "2022-03-12T14:11:59.203Z",
      "2022-05-16T17:01:17.392Z",
      "2022-08-10T23:36:17.522Z",
      "2022-09-03T12:51:31.491Z",
      "2022-09-18T06:41:26.394Z",
      "2022-09-21T08:11:36.276Z",
    ],
    currency: "EUR",
    locale: "en-GB",
  },
];

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");
const labelSumInterest = document.querySelector(".summary-value-interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login-btn");
const btnTransfer = document.querySelector(".form-btn-transfer");
const btnLoan = document.querySelector(".form-btn-loan");
const btnClose = document.querySelector(".form-btn-close");
const btnSort = document.querySelector(".btn-sort");
const btnLogout = document.querySelector(".logout-btn");
const inputLoginUsername = document.querySelector(".login-input-username");
const inputLoginPassword = document.querySelector(".login-input-password");
const inputTransferTo = document.querySelector(".form-input-to");
const inputTransferAmount = document.querySelector(".form-input-amount");
const inputLoanAmount = document.querySelector(".form-input-loan-amount");
const inputCloseUsername = document.querySelector(".form-input-username");
const inputClosePassword = document.querySelector(".form-input-password");
const indexColor = document.querySelector(".form-input-password");


/////////////////////////////////////////////////////////////
// Movements
/////////////////////////////////////////////////////////////

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = "";

  const moves = sort
    ? account.movements.slice(0).sort((a, b) => a - b)
    : account.movements;

  moves.forEach((move, i) => {
    const type = move > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movement-row">
        <div class="movement-type movement-type-${type}">${i + 1} ${type}</div>
        <div class="movement-date">7 Days Ago</div>
        <div class="movement-value">${move}$</div> 
      </div>
      `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};


/////////////////////////////////////////////////////////////
// Summary
/////////////////////////////////////////////////////////////

function displaySummary(account) {
  //Incoming
  const incoming = account.movements
    .filter((move) => move > 0)                         // Getting the array of deposits
    .reduce((acc, deposit) => acc + deposit, 0);        // Summing up the deposits array

  labelSumIn.textContent = `${incoming}$`;

  //Outgoing
  const outgoing = account.movements
    .filter((move) => move < 0)                         // Getting the array of withdrawals
    .reduce((acc, withdrawal) => acc + withdrawal, 0);  // Summing up the withdrawals array

  labelSumOut.textContent = `${outgoing}$`;

  //Interest
  const interest = account.movements
    .filter((move) => move > 0)                                     // Getting the array of deposits
    .map((deposit) => (deposit * account.interestRate) / 100)       // Getting the array of interested amounts
    .filter((interest) => interest >= 1)                            // Only Interest greater than 1% will be accepted (Varies from bank to bank)
    .reduce((acc, interestedAmount) => acc + interestedAmount, 0);  // Summing the array of interested amounts

  labelSumInterest.textContent = `${interest}$`;
};



/////////////////////////////////////////////////////////////
// Balance
/////////////////////////////////////////////////////////////

function displayBalance(account){
  account.balance = account.movements.reduce((acc, move) => acc + move, 0);

  labelBalance.textContent = `${account.balance}$`;
};

/////////////////////////////////////////////////////////////
// Update UI
/////////////////////////////////////////////////////////////

  function updateUI() {
  // Display movements
    displayMovements(currentAccount);
  // Display balance
    displayBalance(currentAccount);
  // Display summary
    displaySummary(currentAccount);
};


/////////////////////////////////////////////////////////////
// Username Generator
/////////////////////////////////////////////////////////////

function createUsernames(accounts){
  accounts.forEach((account) => {
    account.username = account.owner  // Selecting the account owner
    .split(" ").join("")              // Removing spaces between first and last name
    .toLowerCase()                    // Transforming into lowercase
  })
};

createUsernames(accounts)

/////////////////////////////////////////////////////////////
// Login
/////////////////////////////////////////////////////////////

let currentAccount;

btnLogin.addEventListener("click", function(e){
  e.preventDefault();

  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );
  
  if(currentAccount?.password === Number(inputLoginPassword.value)){
    // Welcoming the user
    labelWelcome.textContent = `Welcome back, 
    ${currentAccount.owner
      .split(' ')          // Only the first name of the user will be displayed. 
      .at(0)}`;
      
      labelWelcome.style.color = "#444"
    // Updating the UI
    containerApp.style.opacity = 1;   
    updateUI();
  } else{
     labelWelcome.textContent = "Invalid Login!";
     labelWelcome.style.color = "red"
  }

    // Clearing fields
    inputLoginUsername.value = inputLoginPassword.value = '';
    inputLoginPassword.blur();

    
});

/////////////////////////////////////////////////////////////
// Transfer
/////////////////////////////////////////////////////////////

btnTransfer.addEventListener("click", function(e){
  e.preventDefault();

  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value);

  const transferAmount = Number(inputTransferAmount.value);

  // Clearing input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur()

  if(transferAmount > 0 
    && transferAmount <= currentAccount.balance 
    && receiverAccount?.username !== currentAccount.username
    && receiverAccount){

      // Transfer Money
      currentAccount.movements.push(-transferAmount);
      receiverAccount.movements.push(transferAmount);
      // Update UI
      updateUI();
      // Show Success Message
      labelWelcome.textContent = "Transaction Successful!"
      labelWelcome.style.color = "green"
    } else {
      labelWelcome.textContent = "Transaction failed!"
      labelWelcome.style.color = "red"
    }
});

/////////////////////////////////////////////////////////////
// Loan
/////////////////////////////////////////////////////////////

btnLoan.addEventListener("click", function(e){
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  if(loanAmount > 0){
    // Granting Loan
    currentAccount.movements.push(loanAmount);
    // UI Update
    updateUI();
    // Show Success Message
    labelWelcome.textContent = "Loan Successful!"
    labelWelcome.style.color = "green"
  } else {
    labelWelcome.textContent = "Loan failed!"
    labelWelcome.style.color = "red"
  }
    // Clearing input fields
    inputLoanAmount.value = inputLoanAmount.value = '';
    inputLoanAmount.blur();
});

/////////////////////////////////////////////////////////////
// Closing Account
/////////////////////////////////////////////////////////////
  btnClose.addEventListener("click", function(e){
    e.preventDefault();
    if( currentAccount.username === inputCloseUsername.value 
      && currentAccount.password == Number(inputClosePassword.value)){
      const index = accounts.findIndex(
      (account) => account.username === currentAccount.username);

      // Deleting account
      accounts.splice(index, 1);

      // Hiding UI
      containerApp.style.opacity = 0;

      // Success Message
      labelWelcome.textContent = "Account Deleted!";
} else{
      labelWelcome.textContent = "Wrong Username or Password!";
}
});

/////////////////////////////////////////////////////////////
// Logging Out
/////////////////////////////////////////////////////////////

  btnLogout.addEventListener("click", function(e){
  e.preventDefault();
    containerApp.style.opacity = 0;
  }
);

/////////////////////////////////////////////////////////////
// Sorting Movements
/////////////////////////////////////////////////////////////

let sortStatus = false;

btnSort.addEventListener("click", function(e){
  e.preventDefault();
  displayMovements(currentAccount, !sortStatus);
  sortStatus = !sortStatus
})

