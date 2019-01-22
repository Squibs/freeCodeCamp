console.log('Drop the elements of an array (first argument), starting from the front, until the predicate (second argument) returns true. \n');

const dropElements = function (arr, func) {
  console.log(`Passed Array: ${JSON.stringify(arr)}`);
  console.log(`Passed Function: { ${func} }`);

  console.log(`Index of first successful test: index ${arr.findIndex(func)}, value of ${arr[arr.findIndex(func)]}`);
  const stop = arr.findIndex(func);

  if (stop === -1) {
    console.log('Nothing passed the test; return []\n');
    return [];
  }

  console.log(`Array to return: ${JSON.stringify(arr.slice(stop, arr.length))}\n`);
  return arr.slice(stop, arr.length);
};

dropElements([1, 2, 3], function(n) { return n < 3; }); // should return [1, 2, 3].
dropElements([1, 2, 3, 4], function(n) { return n >= 3; }); // should return [3, 4].
dropElements([1, 2, 3, 4], n => n >= 3); // how I would write this.. should return [3, 4].
dropElements([0, 1, 0, 1], function(n) { return n === 1; }); // should return [1, 0, 1].
dropElements([1, 2, 3], function(n) { return n > 0; }); // should return [1, 2, 3].
dropElements([1, 2, 3, 4], function(n) { return n > 5; }); // should return [].
dropElements([1, 2, 3, 7, 4], function(n) { return n > 3; }); // should return [7, 4].
dropElements([1, 2, 3, 9, 2], function(n) { return n > 2; }); // should return [3, 9, 2].

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const dropElements = function (arr, func) {
    const stop = arr.findIndex(func);
    if (stop === -1) { return []; }
    return arr.slice(stop, arr.length);
  };

*/
