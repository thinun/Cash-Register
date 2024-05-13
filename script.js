let price = 19.5; // Replace with your actual price
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
document.addEventListener("DOMContentLoaded", function () {
    // Function to check if cash in drawer is sufficient for change
    function checkCashDrawer(cid, changeDue) {
        let cashSum = 0;
        for (let i = 0; i < cid.length; i++) {
            cashSum += cid[i][1];
        }
        return cashSum >= changeDue;
    }

    function giveChange(cid, cash, price) {
        const unitValues = {
            "ONE HUNDRED": 100,
            "TWENTY": 20,
            "TEN": 10,
            "FIVE": 5,
            "ONE": 1,
            "QUARTER": 0.25,
            "DIME": 0.1,
            "NICKEL": 0.05,
            "PENNY": 0.01
        };

        let change = {};
        let changeDue = Math.round((cash - price) * 100) / 100; // Round to two decimal places
        // Loop through cash drawer in descending order of value
        for (let i = cid.length - 1; i >= 0; i--) {
            const unit = cid[i][0];
            const unitAmount = unitValues[unit];

            // Keep adding units to change object until it reaches or exceeds change due
            while (changeDue >= unitAmount && cid[i][1] > 0) {
                if (!change[unit]) {
                    change[unit] = 0;
                }
                change[unit] += unitAmount;
                changeDue = Math.round((changeDue - unitAmount) * 100) / 100; // Round to two decimal places
                cid[i][1] -= unitAmount; // Reduce the amount of that unit in cash drawer
            }
        }
        // Check if exact change can be provided
        if (changeDue === 0) {
            // Format change object into a string for display
            let changeString = "Status: OPEN ";
            for (const unit in change) {
                console.log(change[unit])
                if (change[unit] > 0) {
                    changeString += `${unit}: $${change[unit].toFixed(2)} `;
                }
            }
            return changeString.trim();
        } else {
            return "Status: INSUFFICIENT_FUNDS";
        }
    }


    // Function to calculate remaining cash in drawer (optional)
    function calculateRemainingCash(cid, cash, price) {
        let remainingCash = 0;
        for (let i = 0; i < cid.length; i++) {
            remainingCash += cid[i][1];
        }
        return remainingCash - (cash - price);
    }

    // Event listener for purchase button click
    const purchaseBtn = document.getElementById("purchase-btn");
    purchaseBtn.addEventListener("click", function () {
        const cashInput = document.getElementById("cash");
        const cash = parseFloat(cashInput.value);
        const changeDueDiv = document.getElementById("change-due");
        const remainingCashDiv = document.getElementById("remaining-cash");

        const changeDue = cash - price;
        const isSufficient = checkCashDrawer(cid.slice(), changeDue); // Make a copy of cid to avoid modifying original

        if (cash < price) {
            alert("Customer does not have enough money to purchase the item");
            return;
        }

        if (cash === price) {
            changeDueDiv.textContent = "No change due - customer paid with exact cash";
            return;
        }

        // Handle insufficient funds scenario
        if (!isSufficient) {
            changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
            return;
        }

        // Calculate and display change due
        // Make a copy of cid to avoid modifying original
        changeDueDiv.textContent = giveChange(cid.slice(), cash, price);
    })
})
