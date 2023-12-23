// Constructor function
function Bank(name,customerBalance=0){
    this.name = name;
    this.date = new Date();
    this.accountNumber = Date.now();
    this.balance = customerBalance;
}

  // Using prototype to store methods
  // Bank.prototype.deposit = function (amountToDeposit) {
  //   return (this.balance = this.balance + amountToDeposit);
  // };
  // Bank.prototype.withdraw = function (amountToWithdraw) {
  //   return (this.balance = this.balance - amountToWithdraw);
  // };

  //Encapsulationg into one object to be used as Prototype 
  let setPrototype = {
    deposit: function(amountToDeposit){
      return (this.balance = this.balance + amountToDeposit);
    },
    withdraw: function(amountToWithdraw){
      return (this.balance = this.balance - amountToWithdraw);
    },
  };

  // Function for date format
  function dateFormat(){
    this.date = this.date.toISOString().split("T")[0];
  }

// Create account of the user
let arr = JSON.parse(localStorage.getItem("myBank")) || [];
let userForm = document.querySelector("#createAccountForm");
userForm.addEventListener("submit", function(event){
  event.preventDefault();

  let customerName = document.querySelector("#name").value;
  let customerAmount = document.querySelector("#amount").value;
  let tableTag = document.querySelector(".tableTag");
  let tableDiv = document.querySelector(".tableDiv");

  let userObj = new Bank(customerName, +customerAmount);

  // calling the dateFormat function by call() method
  dateFormat.call(userObj);

  arr.push(userObj);
  localStorage.setItem("myBank", JSON.stringify(arr));

  tableDiv.style.display = "block";
  tableTag.style.display = "block";


  // display/calling the function
  display(arr);

  console.log(userObj);
  console.log(arr);
})

// For depositing amount
let depositForm = document.querySelector("#depositAmountForm");
depositForm.addEventListener("submit",function(event){
    event.preventDefault();

    let depositAccountNumber = document.querySelector("#accountNumber").value;
    let amountToDeposit = document.querySelector("#amountToDeposit").value;
    let tableTag = document.querySelector(".tableTag");
    let tableDiv = document.querySelector(".tableDiv");
    let depositUserElement = arr.find(function(ele){
        if(ele.accountNumber === +depositAccountNumber){
            return ele;
        }
    });
    Object.setPrototypeOf(depositUserElement, setPrototype);
    // console.log(depositUserElement);
    // console.log(arr);
    
    if(depositUserElement !== undefined){
      depositUserElement.deposit(+amountToDeposit);
      console.log(depositUserElement);
      console.log(arr);
      localStorage.setItem("myBank",JSON.stringify(arr));
      tableDiv.style.display = "block";
      tableTag.style.display = "block";
      display(arr);
    } else{
      alert("Enter valid Account Number");
    }
});

// For withdrawing amount
let withdrawForm = document.querySelector("#withdrawAmountForm");
withdrawForm.addEventListener("submit",function(event){
  event.preventDefault();

  let accountNumberWithdraw = document.getElementById("accountNumberWithdraw").value;
  let amountToWithdraw = document.getElementById("amountToWithdraw").value;
  let tableTag = document.querySelector(".tableTag");
  let tableDiv = document.querySelector(".tableDiv");

  let withdrawUserElement = arr.find(function(ele){
    if(ele.accountNumber === +accountNumberWithdraw){
      return ele;
    }
  });

  Object.setPrototypeOf(withdrawUserElement,setPrototype);
  // console.log(withdrawUserElement);

  if(withdrawUserElement !== undefined){
    withdrawUserElement.withdraw(+amountToWithdraw);
    // console.log(arr);
    localStorage.setItem("myBank",JSON.stringify(arr));
    tableDiv.style.display = "block";
    tableTag.style.display = "block";
    display(arr);
  } else{
    alert("Enter valid Account Number");
  }
})

// Creating contents for table
function display(array){
  let tbody = document.querySelector("tbody");
  tbody.textContent = "";

  // Mapping the array using higher order function
  array.map(function(ele,index){

    let row = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.textContent = index + 1;

    let td2 = document.createElement("td");
    td2.textContent = ele.name;

    let td3 = document.createElement("td");
    td3.textContent = ele.date;

    let td4 = document.createElement("td");
    td4.textContent = ele.accountNumber;

    let td5 = document.createElement("td");
    td5.textContent = ele.balance;

    let td6 = document.createElement("td");
    td6.textContent = "Delete";
    td6.style.backgroundColor = "red";
    td6.style.cursor = "pointer";
    td6.addEventListener("click",function(){
      deleteRow(index);
    })

    row.append(td1,td2,td3,td4,td5,td6);
    tbody.append(row);
  })
};

// Creating delete row function
function deleteRow(ind){
  arr.splice(ind,1);
  localStorage.setItem("myBank",JSON.stringify(arr));
  display(arr);
}

