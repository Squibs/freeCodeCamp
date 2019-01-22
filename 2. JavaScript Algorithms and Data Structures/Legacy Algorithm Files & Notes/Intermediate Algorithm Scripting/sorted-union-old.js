console.log('Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays. \n');

/* eslint-disable prefer-rest-params */

// would use ...arr (rest parameter) in the future
// then ```const reduced = Array.from(arr).reduce(```
const uniteUnique = function (arr) {
  console.log(`Passed arguments: ${JSON.stringify(Array.from(arguments))}`);
  const reduced = Array.from(arguments).reduce(
    (prev, curr) => prev.concat(curr));
  console.log(`Reduce and concat passed arrays: ${JSON.stringify(reduced)}`);

  const sorted = [];
  reduced.forEach((element) => {
    if (!sorted.includes(element)) {
      sorted.push(element);
    }
  });

  console.log(`Push unique values to new array: ${JSON.stringify(sorted)}\n`);
  return sorted;
};


uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]); // should return [1, 3, 2, 5, 4].
uniteUnique([1, 3, 2], [1, [5]], [2, [4]]); // should return [1, 3, 2, [5], [4]].
uniteUnique([1, 2, 3], [5, 2, 1]); // should return [1, 2, 3, 5].
uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]); // should return [1, 2, 3, 5, 4, 6, 7, 8].

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const uniteUnique = function (arr) {
    const reduced = Array.from(arguments).reduce(
      (prev, curr) => prev.concat(curr));

    const sorted = [];
    reduced.forEach((element) => {
      if (!sorted.includes(element)) {
        sorted.push(element);
      }
    });

    return sorted;
  };

*/
