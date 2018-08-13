console.log('Given an array, find element pairs whose sum equal the second argument and return the sum of their indices.\n');

// do not sort the array, the indexes are important in this challenge
// cannot reuse an element if it was already paired

const pairwise = function (arr, arg) {
  console.log(`Passed Array: ${JSON.stringify(arr)}\nPassed Argument: ${arg}`);
  const array = arr;
  let sum = 0;

  array.forEach((value, index) => {
    for (let i = 0; i < array.length; i += 1) {
      if (value + array[i] === arg && index !== i) {
        sum += index + i;
        array[i] = 'banana'; // could use delete, but i'd rather make it a banana
        array[index] = 'banana';
        break;
      }
    }
  });

  console.log(array);
  console.log(sum);
  console.log('\n');
  return sum;
};

pairwise([7, 9, 11, 13, 15], 20); //  should return 6
pairwise([1, 4, 2, 3, 0, 5], 7); // should return 11. (4, 3) (5, 2)
pairwise([1, 3, 2, 4], 4); // should return 1. (3, 1)
pairwise([1, 1, 1], 2); // should return 1. (1, 1)
pairwise([0, 0, 0, 0, 1, 1], 1); // should return 10. {0, 4} {1, 5}
pairwise([], 100); // should return 0.


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

const pairwise = function (arr, arg) {
  const array = arr;
  let sum = 0;

  array.forEach((value, index) => {
    for (let i = 0; i < array.length; i += 1) {
      if (value + array[i] === arg && index !== i) {
        sum += index + i;
        array[i] = 'banana'; // could use delete, but i'd rather make it a banana
        array[index] = 'banana';
        break;
      }
    }
  });

  return sum;
};

*/
