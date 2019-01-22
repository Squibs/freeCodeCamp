console.log('Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum. \n');

const addTogether = function () {
  const args = Array.from(arguments);

  if (typeof args[0] === 'number') {
    if (typeof args[1] === 'number') {
      return args[0] + args[1];
    } else if (!args[1]) {
      return (value) => {
        if (typeof value === 'number') {
          return args[0] + value;
        }
        return undefined;
      };
    }
  }
  return undefined;
};

addTogether(2, 3); // should return 5.
addTogether(2)(3); // should return 5.
addTogether('http://bit.ly/IqT6zt'); // should return undefined.
addTogether(2, '3'); // should return undefined.
addTogether(2)([3]); // should return undefined.
