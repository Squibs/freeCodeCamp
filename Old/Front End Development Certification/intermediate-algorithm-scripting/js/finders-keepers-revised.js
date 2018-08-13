console.log('Create a function that looks through an array (first argument) and returst he first element in the array that passes a truth test (second argument). \n');

const findElement = function (arr, func) {
  return arr.find(value => func(value));
};


findElement([1, 2, 3, 4], function(num) { return num % 2 === 0; });
findElement([1, 2, 3, 4], num => num % 2 === 0);
findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; }); // should return 8.
findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; }); // should return undefined.
