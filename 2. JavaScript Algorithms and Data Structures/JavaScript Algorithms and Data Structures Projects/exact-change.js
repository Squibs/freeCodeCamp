console.log('Design a cash register that accepts the purchase price (first argument), payment (second argument), and cash-in-drawer (third argument):\n');

function checkCashRegister(price, cash, cid) {
  console.log(`Passed Price: ${price}, Passed Cash: ${cash}\nPassed Cash-in-Drawer: ${JSON.stringify(cid)}`);

  // stores actual currency to give back to customer
  const change = [];

  // amount due back to customer
  let owe = (cash - price).toFixed(2);
  console.log(`Difference: ${owe}`);

  // highest to lowest in value
  let worth = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];

  const cashRegister = {
    PENNY: { value: 0.01, amount: 0 },
    NICKEL: { value: 0.05, amount: 0 },
    DIME: { value: 0.10, amount: 0 },
    QUARTER: { value: 0.25, amount: 0 },
    ONE: { value: 1.00, amount: 0 },
    FIVE: { value: 5.00, amount: 0 },
    TEN: { value: 10.00, amount: 0 },
    TWENTY: { value: 20.00, amount: 0 },
    'ONE HUNDRED': { value: 100.00, amount: 0 },
  };

  // set cash-in-drawer currency: [value, amount]
  cid.forEach((e) => {
    const currency = cashRegister[e[0]];
    currency.amount = Math.ceil(e[1] / currency.value);
  });
  console.log('Load Register:\n', cashRegister);

  worth = worth.filter((e) => {
    const currency = cashRegister[e];

    // if currency value is less than what is owed & currency is in the register
    if (currency.value <= owe && currency.amount !== 0) {
      let amount = 0;

      while (currency.value <= owe && currency.amount !== 0) {
        // count amount of currency given to customer
        amount += 1;

        // subtract 1 currency from register
        currency.amount -= 1;

        // update amount owed to customer
        owe = Number(owe).toFixed(2) - (currency.value).toFixed(2);
      }
      // push given currency and the total value to change array
      change.push([e, parseFloat((amount * currency.value).toFixed(2))]);
    }
    // if amount of currency in register is 0; remove it from worth
    if (currency.amount === 0) return false;

    return true;
  });

  console.log(`Owe: ${owe}, Worth: ${JSON.stringify(worth)}`);
  console.log(cashRegister);

  // owe nothing; register is empty; close the shop
  if (owe === 0 && worth.length === 0) {
    console.log(`${JSON.stringify({ status: 'CLOSED', change: cid })}\n`);
    return { status: 'CLOSED', change: cid };
  }

  // can't give money back; insufficient funds
  if (owe > 0) {
    console.log(`${JSON.stringify({ status: 'INSUFFICIENT_FUNDS', change: [] })}\n`);
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  // keep the change you filthy animal
  console.log(`${JSON.stringify({ status: 'OPEN', change })}\n`);
  return { status: 'OPEN', change };
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

/* eslint-disable */
// should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

/* EXTRA CHALLENGE TEST-CASE (https://medium.freecodecamp.org/exact-solution-for-exact-change-81e1d23bfe58)
   should return {status: "OPEN", change: [['DIME', 0.30]]} */
// checkCashRegister(19.7, 20, [['PENNY', 0], ['NICKEL', 0], ['DIME', 1], ['QUARTER', 2.5], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]);

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  function checkCashRegister(price, cash, cid) {
    const change = [];

    let owe = (cash - price).toFixed(2);
    let worth = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];

    const cashRegister = {
      PENNY: { value: 0.01, amount: 0 },
      NICKEL: { value: 0.05, amount: 0 },
      DIME: { value: 0.10, amount: 0 },
      QUARTER: { value: 0.25, amount: 0 },
      ONE: { value: 1.00, amount: 0 },
      FIVE: { value: 5.00, amount: 0 },
      TEN: { value: 10.00, amount: 0 },
      TWENTY: { value: 20.00, amount: 0 },
      'ONE HUNDRED': { value: 100.00, amount: 0 },
    };

    cid.forEach((e) => {
      const currency = cashRegister[e[0]];
      currency.amount = Math.ceil(e[1] / currency.value);
    });

    worth = worth.filter((e) => {
      const currency = cashRegister[e];

      if (currency.value <= owe && currency.amount !== 0) {
        let amount = 0;

        while (currency.value <= owe && currency.amount !== 0) {
          amount += 1;
          currency.amount -= 1;
          owe = Number(owe).toFixed(2) - (currency.value).toFixed(2);
        }

        change.push([e, parseFloat((amount * currency.value).toFixed(2))]);
      }

      if (currency.amount === 0) return false;

      return true;
    });

    if (owe === 0 && worth.length === 0) { return { status: 'CLOSED', change: cid }; }

    if (owe > 0) { return { status: 'INSUFFICIENT_FUNDS', change: [] }; }

    return { status: 'OPEN', change };
  }

*/
