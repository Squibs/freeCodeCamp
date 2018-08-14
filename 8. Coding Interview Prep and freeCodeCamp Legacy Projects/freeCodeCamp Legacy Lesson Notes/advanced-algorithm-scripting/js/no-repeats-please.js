console.log('Return the number of total permutations of the provided string that don\'t have repeated consecutive letters. Assume that all characters in the provided string are each unique.\n');

const permAlone = function (str) {
  console.log(`Passed String: ${str}`);

  // split passed string into an array
  const array = str.split('');
  console.log(`As Array: ${JSON.stringify(array)} for heap's algorithm`);
  let counter = 0;

  // swaps array values based on passed indexes
  const swap = function (a, b) {
    const holder = array[a];
    array[a] = array[b];
    array[b] = holder;
  };

  // heap's algorithm
  const heap = function (number) {
    // select characters that are in a row
    const regex = /([a-zA-z])\1+/g;

    // if the number is one or does not have repeated characters in a row
    if (number === 1 && !regex.test(array.join(''))) {
      // increase the counter
      counter += 1;
      // console.log(array); view combinations that pass argument
    } else {
      for (let i = 0; i !== number; i += 1) {
        // much recursion
        heap(number - 1);
        // if even
        if (number % 2 === 0) {
          // swap with current loop value
          swap(i, number - 1);
        } else {
          // swap with with first char
          swap(0, number - 1);
        }
      }
    }
  };

  heap(array.length);
  console.log(`Permutations without repeated consecutive letters: ${counter}\n`);
  return counter;
};


permAlone('aab'); // should return 2.
permAlone('aaa'); // should return 0.
permAlone('aabb'); // should return 8.
permAlone('abcdefa'); // should return 3600.
permAlone('abfdefa'); // should return 2640.
permAlone('zzzzzzzz'); // should return 0.
permAlone('a'); // should return 1.
permAlone('aaab'); // should return 0.
permAlone('aaabb'); // should return 12.

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const permAlone = function (str) {
    const array = str.split('');
    let counter = 0;

    const swap = function (a, b) {
      const holder = array[a];
      array[a] = array[b];
      array[b] = holder;
    };

    const heap = function (number) {
      const regex = /([a-zA-z])\1+/g;

      if (number === 1 && !regex.test(array.join(''))) {
        counter += 1;
      } else {
        for (let i = 0; i !== number; i += 1) {
          heap(number - 1);
          if (number % 2 === 0) {
            swap(i, number - 1);
          } else {
            swap(0, number - 1);
          }
        }
      }
    };
    heap(array.length);
    return counter;
  };

*/
