console.log('Design a cash register that accepts the purchase price (first argument), payment (second argument), and cash-in-drawer (third argument): \n');

const checkCashRegister = function (price, cash, cid) {
  console.log(`Passed Price: ${JSON.stringify(price)}, Passed Cash: ${JSON.stringify(cash)}\nPassed CID: ${JSON.stringify(cid)}`);
  // stores actual currency to give back to customer
  const change = [];
  // amount due back to customer
  let owe = Number(cash - price).toFixed(2);
  console.log(`Difference: ${owe}`);
  /* highest value to lowest in value;
     use Object.keys, Object.values, Object.entries in the future (some are experimental right now)
     to iterate through the object and find the highest value instead */
  let worth = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];
  const cashRegister = {
    PENNY: {
      value: 0.01,
      amount: 0,
    },
    NICKEL: {
      value: 0.05,
      amount: 0,
    },
    DIME: {
      value: 0.10,
      amount: 0,
    },
    QUARTER: {
      value: 0.25,
      amount: 0,
    },
    ONE: {
      value: 1.00,
      amount: 0,
    },
    FIVE: {
      value: 5.00,
      amount: 0,
    },
    TEN: {
      value: 10.00,
      amount: 0,
    },
    TWENTY: {
      value: 20.00,
      amount: 0,
    },
    'ONE HUNDRED': {
      value: 100.00,
      amount: 0,
    },
  };

  // set cash-in-drawer currency: [value, amount]
  cid.forEach((e) => {
    const currency = cashRegister[e[0]];
    currency.amount = Math.ceil(e[1] / currency.value);
  });
  console.log('Load Register:');
  console.log(cashRegister);

  // magic number figure-outer
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
        owe = Number(owe).toFixed(2) - Number(currency.value).toFixed(2);
      }
      // push given currency and the total value to change array
      change.push([e, parseFloat(Number(amount * currency.value).toFixed(2))]);
    }
    // if amount of currency in register is 0; remove it from worth
    if (currency.amount === 0) { return false; }
    return true;
  });

  console.log(`Owe: ${owe}, Worth: ${JSON.stringify(worth)}`);
  console.log(cashRegister);

  // owe nothing; register is empty; close the shop
  if (owe === 0 && worth.length === 0) {
    console.log('Closed\n');
    return 'Closed';
  }

  // can't give money back
  if (owe > 0) {
    console.log('Insufficient Funds\n');
    return 'Insufficient Funds';
  }

  // keep the change you filthy animal
  console.log(`Change to Return: ${JSON.stringify(change)}\n`);
  return change;
};

// Example cash-in-drawer array:
// [['PENNY', 1.01],
// ['NICKEL', 2.05],
// ['DIME', 3.10],
// ['QUARTER', 4.25],
// ['ONE', 90.00],
// ['FIVE', 55.00],
// ['TEN', 20.00],
// ['TWENTY', 60.00],
// ['ONE HUNDRED', 100.00]]

checkCashRegister(19.50, 20.00, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.10], ['QUARTER', 4.25], ['ONE', 90.00], ['FIVE', 55.00], ['TEN', 20.00], ['TWENTY', 60.00], ['ONE HUNDRED', 100.00]]); // should return [['QUARTER', 0.50]].
checkCashRegister(19.50, 20.00, [['PENNY', 0.01], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]); // should return 'Insufficient Funds'.
checkCashRegister(19.50, 20.00, [['PENNY', 0.50], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]); // should return 'Closed'. Would return ([['PENNY', 0.50]]).
checkCashRegister(19.50, 20.00, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.10], ['QUARTER', 4.25], ['ONE', 90.00], ['FIVE', 55.00], ['TEN', 20.00], ['TWENTY', 60.00], ['ONE HUNDRED', 100.00]]); // should return [['QUARTER', 0.50]].
checkCashRegister(3.26, 100.00, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.10], ['QUARTER', 4.25], ['ONE', 90.00], ['FIVE', 55.00], ['TEN', 20.00], ['TWENTY', 60.00], ['ONE HUNDRED', 100.00]]); // should return [['TWENTY', 60.00], ['TEN', 20.00], ['FIVE', 15.00], ['ONE', 1.00], ['QUARTER', 0.50], ['DIME', 0.20], ['PENNY', 0.04]].
checkCashRegister(19.50, 20.00, [['PENNY', 0.01], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]); // should return 'Insufficient Funds'.
checkCashRegister(19.50, 20.00, [['PENNY', 0.01], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 1.00], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]); // should return 'Insufficient Funds'.
checkCashRegister(19.50, 20.00, [['PENNY', 0.50], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]); // should return 'Closed'. Would return ([['PENNY', 0.50]]).

/* eslint-disable max-len */
// https://medium.freecodecamp.org/exact-solution-for-exact-change-81e1d23bfe58 (EXTRA CHALLENGE TEST-CASE)
// checkCashRegister(19.70, 20.00, [['PENNY', 0], ['NICKEL', 0], ['DIME', 1.00], ['QUARTER', 2.50], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]); // should return ([['DIME', 0.30]]).
// I would solve this by looping back through my worth array backwards and doing the same thing I am doing in using the filter method;
// if it could still not return full value back to the customer for the changed owed, then it would return 'insuffecient funds'


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const checkCashRegister = function (price, cash, cid) {
    const change = [];
    let owe = Number(cash - price).toFixed(2);
    let worth = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];
    const cashRegister = {
      PENNY: {
        value: 0.01,
        amount: 0,
      },
      NICKEL: {
        value: 0.05,
        amount: 0,
      },
      DIME: {
        value: 0.10,
        amount: 0,
      },
      QUARTER: {
        value: 0.25,
        amount: 0,
      },
      ONE: {
        value: 1.00,
        amount: 0,
      },
      FIVE: {
        value: 5.00,
        amount: 0,
      },
      TEN: {
        value: 10.00,
        amount: 0,
      },
      TWENTY: {
        value: 20.00,
        amount: 0,
      },
      'ONE HUNDRED': {
        value: 100.00,
        amount: 0,
      },
    };

    cid.forEach((e) => {
      const currency = cashRegister[e[0]];
      currency.amount = Math.ceil(e[1] / currency.value);
    });

    worth = worth.filter((e) => {
      const currency = cashRegister[e];
      if (currency.value < owe && currency.amount !== 0) {
        let amount = 0;
        while (currency.value <= owe && currency.amount !== 0) {
          amount += 1;
          currency.amount -= 1;
          owe = Number(owe).toFixed(2) - Number(currency.value).toFixed(2);
        }
        change.push([e, parseFloat(Number(amount * currency.value).toFixed(2))]);
      }
      if (currency.amount === 0) { return false; }
      return true;
    });

    if (owe === 0 && worth.length === 0) { return 'Closed'; }
    if (owe > 0) { return 'Insufficient Funds'; }

    return change;
  };

*/
