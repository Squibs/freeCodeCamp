console.log('Objective: Return the sum of the range in which the passed values which are in an array. \n');

const sumAll = function (arr) {
  console.log(`Passed array: ${arr}`);

  const start = Math.min(arr[0], arr[1]);
  const end = Math.max(arr[0], arr[1]);
  const newArr = [];

  console.log(`Start value: ${start}, End value: ${end}`);

  console.log('Array with in-between numbers:');

  for (let i = start; i <= end; i += 1) {
    newArr.push(i);
  }

  console.log(newArr);

  // reduce(accumulator, currentValue, currentIndex, array)
  const sum = newArr.reduce((acc, cur) => acc + cur, 0);

  console.log(`Returned sum: ${sum} \n`);

  return sum;
};

sumAll([1, 4]); // should return 10.
sumAll([4, 1]); // should return 10.
sumAll([5, 10]); // should return 45.
sumAll([10, 5]); // should return 45.


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const sumAll = function (arr) {
    const start = Math.min(arr[0], arr[1]);
    const end = Math.max(arr[0], arr[1]);
    const newArr = [];

    for (let i = start; i <= end; i += 1) {
      newArr.push(i);
    }

    const sum = newArr.reduce((acc, cur) => acc + cur, 0);

    return sum;
  };

*/
