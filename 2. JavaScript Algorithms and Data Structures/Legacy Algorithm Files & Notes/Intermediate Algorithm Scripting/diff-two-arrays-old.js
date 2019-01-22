console.log('Objective: Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. \n');

const diffArray = function (arr1, arr2) {
  console.log(`First Array: [${arr1}] \nSecond Array: [${arr2}]`);

  const newArr = arr1.concat(arr2).filter(cur => !arr1.includes(cur) || !arr2.includes(cur));

  console.log(`Array to return: [${newArr}]\n`);
  return newArr;
};

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]); // should return an array.
diffArray(['diorite', 'andesite', 'grass', 'dirt', 'pink wool', 'dead shrub'], ['diorite', 'andesite', 'grass', 'dirt', 'dead shrub']); // should return ['pink wool'].
diffArray(['andesite', 'grass', 'dirt', 'pink wool', 'dead shrub'], ['diorite', 'andesite', 'grass', 'dirt', 'dead shrub']); // should return ['diorite', 'pink wool'].
diffArray(['andesite', 'grass', 'dirt', 'dead shrub'], ['andesite', 'grass', 'dirt', 'dead shrub']); // should return [].
diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]); // should return [4].
diffArray([1, 'calf', 3, 'piglet'], [1, 'calf', 3, 4]); // should return ['piglet', 4].
diffArray([], ['snuffleupagus', 'cookie monster', 'elmo']); // should return ['snuffleupagus', 'cookie monster', 'elmo'].
diffArray([1, 'calf', 3, 'piglet'], [7, 'filly']); // should return [1, 'calf', 3, 'piglet', 7, 'filly'].

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const diffArray = function (arr1, arr2) {
    const newArr = arr1.concat(arr2).filter(cur => !arr1.includes(cur) || !arr2.includes(cur));
    return newArr;
  };

*/
