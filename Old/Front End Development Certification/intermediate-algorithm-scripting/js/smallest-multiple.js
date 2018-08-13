console.log('Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters. \n');

const smallestCommons = function (arr) {
  console.log(`Passed numbers: ${JSON.stringify(arr)}`);

  // if total remainder (min through max) is not equal to 0 (integer) return false
  const multiples = function (total, max, min) {
    for (let i = min; i <= max; i += 1) {
      if (total % i !== 0) { return false; }
    }
    // return true when lowest common multiple is found
    return true;
  };

  const maximum = Math.max(arr[0], arr[1]);
  let total = maximum;

  while (!multiples(total, maximum, Math.min(arr[0], arr[1]))) {
    // keep adding the maximum of the passed values;
    // m + m can be divided by m
    total += maximum;
  }

  console.log(`Number to return ${total}\n`);
  return total;
};

smallestCommons([1, 5]); // should return 60.
smallestCommons([5, 1]); // should return 60.
smallestCommons([1, 13]); // should return 360360.
smallestCommons([23, 18]); // should return 6056820.


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const smallestCommons = function (arr) {
    const multiples = function (total, max, min) {
      for (let i = min; i <= max; i += 1) {
        if (total % i !== 0) { return false; }
      }
      return true;
    };

    const maximum = Math.max(arr[0], arr[1]);
    let total = maximum;

    while (!multiples(total, maximum, Math.min(arr[0], arr[1]))) {
      total += maximum;
    }

    return total;
  };

*/
