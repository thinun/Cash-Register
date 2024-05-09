// Given variables
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
];

// Function to calculate change due
function checkCashRegister(cash) {
    let price = 3.26;
    let change = (cash - price).toFixed(2);
    let changeArr = [];

    // Calculate total cash in drawer
    let totalCID = 0;
    for (let item of cid) {
        totalCID += item[1];
    }

    // Check if cash provided is less than price
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    // Check if cash provided is equal to price
    if (cash === price) {
        document.getElementById("change-due").textContent = "No change due - customer paid with exact cash";
        return;
    }

    // Calculate change due
    if (parseFloat(totalCID.toFixed(2)) <  parseFloat(change)) {

        document.getElementById("change-due").textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    for (let i = cid.length - 1; i >= 0; i--) {
        let currencyName = cid[i][0];
        let currencyValue = cid[i][1];

        if (change >= currencyValue) {
            let availableAmount = cid[i][1];
            let neededAmount = Math.min(change - (change % currencyValue), availableAmount);

            if (neededAmount > 0) {
                changeArr.push([currencyName, neededAmount]);
                change -= neededAmount;
                change = Math.round(change * 100) / 100;
            }
        }
    }

    // If there is still change left, it means the drawer doesn't have enough to issue the correct change
    if (change > 0) {
        document.getElementById("change-due").textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    // If totalCID is equal to the change due, the cash register is closed
    if (totalCID === change) {
        document.getElementById("change-due").textContent = "Status: CLOSED";
        return;
    }

    // Display the change due
    let changeString = "Status: OPEN";
    for (let changeItem of changeArr) {
        changeString += ` ${changeItem[0]}: $${changeItem[1].toFixed(2)} `;
    }
    document.getElementById("change-due").textContent = changeString;
}

// Event listener for purchase button
document.getElementById("purchase-btn").addEventListener("click", function () {
    let cashInput = parseFloat(document.getElementById("cash").value);
    checkCashRegister(cashInput);
});
