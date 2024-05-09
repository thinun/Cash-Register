class CashRegister {
    constructor(price, cid) {
        this.price = price;
        this.cid = cid;
    }

    calculateChange(cash) {
        let change = (cash - this.price).toFixed(2);
        let changeArr = [];

        // Calculate total cash in drawer before transaction
        let totalCIDBefore = this.cid.reduce((acc, curr) => acc + curr[1], 0);

        // Check if change required is greater than total cash in drawer
        if (parseFloat(change) > parseFloat(totalCIDBefore.toFixed(2))) {
            return "INSUFFICIENT_FUNDS";
        }

        // Check if cash provided is less than price
        if (cash < this.price) {
            return "NOT_ENOUGH_MONEY";
        }

        // Check if cash provided is equal to price
        if (parseFloat(cash) === parseFloat(this.price)) {
            return "EXACT_CHANGE";
        }

        // Logic to find change from cash in drawer
        const denominations = [
            ["ONE HUNDRED", 100],
            ["TWENTY", 20],
            ["TEN", 10],
            ["FIVE", 5],
            ["ONE", 1],
            ["QUARTER", 0.25],
            ["DIME", 0.1],
            ["NICKEL", 0.05],
            ["PENNY", 0.01]
        ];

        for (let i = 0; i < denominations.length; i++) {
            const [currencyName, currencyValue] = denominations[i];

            while (change >= currencyValue && this.cid[i][1] > 0) {
                changeArr.push([currencyName, currencyValue]);
                change -= currencyValue;
                change = parseFloat(change.toFixed(2));
                this.cid[i][1] -= currencyValue;
            }
        }

        // Calculate total cash in drawer after transaction
        let totalCIDAfter = this.cid.reduce((acc, curr) => acc + curr[1], 0);

        return {
            status: "OPEN",
            change: changeArr,
            remainingCash: this.cid
        };
    }
}

// Example usage
let price = 3.26;
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

let cashRegister = new CashRegister(price, cid);

// Event listener for purchase button
document.getElementById("purchase-btn").addEventListener("click", function () {
    let cashInput = parseFloat(document.getElementById("cash").value);
    let result = cashRegister.calculateChange(cashInput);

    if (result === "INSUFFICIENT_FUNDS") {
        document.getElementById("change-due").textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (result === "NOT_ENOUGH_MONEY") {
        alert("Customer does not have enough money to purchase the item");
    } else if (result === "EXACT_CHANGE") {
        document.getElementById("change-due").textContent = "No change due - customer paid with exact cash";
    } else {
        let changeString = "Status: OPEN";
        for (let changeItem of result.change) {
            changeString += ` ${changeItem[0]}: $${changeItem[1].toFixed(2)} `;
        }
        document.getElementById("change-due").textContent = changeString;

        // Display the remaining cash in the drawer
        let remainingCash = "Remaining Cash in Drawer:\n";
        for (let item of result.remainingCash) {
            remainingCash += `${item[0]}: $${item[1].toFixed(2)}\n`;
        }
        document.getElementById("remaining-cash").textContent = remainingCash;
    }
});
