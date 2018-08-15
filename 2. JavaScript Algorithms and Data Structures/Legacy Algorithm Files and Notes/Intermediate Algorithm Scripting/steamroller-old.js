console.log('Flatten a nested array. You must account for varying levels of nesting. \n');

const steamrollArray = function (arr) {
  console.log(`Passed array ${JSON.stringify(arr)}`);

  const flattenArray = function (array) {
    return array.reduce((prev, cur) =>
    prev.concat(Array.isArray(cur) ? flattenArray(cur) : cur), []);
  };

  console.log(`Array to return ${JSON.stringify(flattenArray(arr))}`);
  return flattenArray(arr);
};

steamrollArray([[['a']], [['b']]]); // should return ["a", "b"].
steamrollArray([1, [2], [3, [[4]]]]); // should return [1, 2, 3, 4].
steamrollArray([1, [], [3, [[4]]]]); // should return [1, 3, 4].
steamrollArray([1, {}, [3, [[4]]]]); // should return [1, {}, 3, 4].

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const steamrollArray = function (arr) {
    const flattenArray = function (array) {
      return array.reduce((prev, cur) =>
      prev.concat(Array.isArray(cur) ? flattenArray(cur) : cur), []);
    };

    return flattenArray(arr);
  };

*/
