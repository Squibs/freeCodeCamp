console.log('Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1).');
console.log('If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.\n');

const updateInventory = function (arr1, arr2) {
  console.log(`Passed Arrays:\n${JSON.stringify(arr1)},\n${JSON.stringify(arr2)}`);

  const combined = [];
  const curInv = arr1.concat(arr2).sort((a, b) => {
    if (a[1] === b[1]) {
      return 0;
    }
    return a[1] < b[1] ? -1 : 1;
  }).reduce((prev, cur) => {
    let flag = true;
    if (combined.length === 0) {
      combined.push(prev);
    }
    combined.forEach((value, index) => {
      if (value[1] === cur[1]) {
        combined[index][0] += cur[0];
        flag = false;
      }
    });
    if (flag) {
      combined.push(cur);
      flag = true;
    }
    return combined;
  });
  console.log('Array to return: ');
  console.log(JSON.stringify(curInv));

  console.log('\n');
  return curInv;
};

updateInventory([[21, 'Bowling Ball'], [2, 'Dirty Sock'], [1, 'Hair Pin'], [5, 'Microphone']], [[2, 'Hair Pin'], [3, 'Half-Eaten Apple'], [67, 'Bowling Ball'], [7, 'Toothpaste']]); // should return [[88, 'Bowling Ball'], [2, 'Dirty Sock'], [3, 'Hair Pin'], [3, 'Half-Eaten Apple'], [5, 'Microphone'], [7, 'Toothpaste']].
updateInventory([[21, 'Bowling Ball'], [2, 'Dirty Sock'], [1, 'Hair Pin'], [5, 'Microphone']], []); // should return [[21, 'Bowling Ball'], [2, 'Dirty Sock'], [1, 'Hair Pin'], [5, 'Microphone']].
updateInventory([], [[2, 'Hair Pin'], [3, 'Half-Eaten Apple'], [67, 'Bowling Ball'], [7, 'Toothpaste']]); // should return [[67, 'Bowling Ball'], [2, 'Hair Pin'], [3, 'Half-Eaten Apple'], [7, 'Toothpaste']].
updateInventory([[0, 'Bowling Ball'], [0, 'Dirty Sock'], [0, 'Hair Pin'], [0, 'Microphone']], [[1, 'Hair Pin'], [1, 'Half-Eaten Apple'], [1, 'Bowling Ball'], [1, 'Toothpaste']]); // should return [[1, 'Bowling Ball'], [0, 'Dirty Sock'], [1, 'Hair Pin'], [1, 'Half-Eaten Apple'], [0, 'Microphone'], [1, 'Toothpaste']].

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const updateInventory = function (arr1, arr2) {
    let combined = [];
    let curInv = arr1.concat(arr2).sort((a, b) => {
      if (a[1] === b[1]) {
        return 0;
      }
      return a[1] < b[1] ? -1 : 1;
    }).reduce((prev, cur) => {
      let flag = true;
      if (combined.length === 0) {
        combined.push(prev);
      }
      combined.forEach((value, index) => {
        if (value[1] === cur[1]) {
          combined[index][0] += cur[0];
          flag = false;
        }
      });
      if (flag) {
        combined.push(cur);
        flag = true;
      }
      return combined;
    });

    return curInv;
  };

*/
