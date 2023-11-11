function Bank(customerName,customerBalance){
    this.name = customerName;
    this.accountNumber = Date.now();
    this.balance = customerBalance;
    this.deposit = function(amountToDeposit){
        return (this.balance = this.balance + amountToDeposit);
    };
    this.withdraw = function(amountToWithdraw){
        return (this.balance = this.balance - amountToWithdraw);
    };
}
// create account for user

 let arr = JSON.parse(localStorage.getItem("UserBankDetails")) || [];
 let createForm = document.querySelector("#createAccountForm");
 createForm.addEventListener("submit",function(event){
    event.preventDefault();
    let name = document.querySelector("#name").value;
    let amountToCreate = document.querySelector("#amount").value;

    let userObj = new Bank(name,+amountToCreate);
    arr.push(userObj);

    localStorage.setItem("UserBankDetails",JSON.stringify(arr));
    console.log(userObj);
    
 });

// Deposit amount for user by verifying the account number

let depositForm = document.querySelector("#depositAmountForm");
depositForm.addEventListener("submit",function(event){
    event.preventDefault();

    let accountNumber = document.querySelector("#accountNumber").value;
    let amountToDeposit = document.querySelector("#amountToDeposit").value;

    let userDeposit = arr.find(function(ele){
        if(ele.accountNumber === +accountNumber){
            return ele;
        }
    });

    if(userDeposit != undefined){
        userDeposit.deposit(+amountToDeposit);
        localStorage.setItem("UserBankDetails",JSON.stringify(arr));
    } else{
        alert("Account number is invalid cannot deposit amount");
    }
        
});

// Withdraw amount for user by verifying the account number

let withdrawForm = document.querySelector("#withdrawAmountForm");
withdrawForm.addEventListener("submit",function(event){
    event.preventDefault();

    let accountNumberWithdraw = document.querySelector("#accountNumberWithdraw").value;
    let withdrawAmount = document.querySelector("#amountToWithdraw").value;

    let userWithdraw = arr.find(function(ele){
        if(ele.accountNumber === +accountNumberWithdraw){
            return ele;
        }
    });

    if(userWithdraw != undefined){
        userWithdraw.withdraw(+withdrawAmount);
        localStorage.setItem("UserBankDetails",JSON.stringify(arr));
    } else{
        alert("Account number is invalid cannot withdraw amount");
    }
});



