console.log('Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays. \n');

// using rest parameters, rather than having to pull from arguments
const sym = function (...argument) {
  console.log(`Passed args: ${JSON.stringify(argument)}`);

  let args = argument.map(value => value.sort().join(''));
  console.log(args);

  args = args.reduce((prev, cur) => {
    // similar + symmetrical.. get it? hahaa
    const symmilar = [];
    for (let i = 0; i < cur.length; i += 1) {
      if (!prev.includes(cur.charAt(i)) && !symmilar.join('').includes(cur.charAt(i))) {
        symmilar.push(cur.charAt(i));
      }
    }
    for (let i = 0; i < prev.length; i += 1) {
      if (!cur.includes(prev.charAt(i)) && !symmilar.join('').includes(prev.charAt(i))) {
        symmilar.push(prev.charAt(i));
      }
    }
    return symmilar.sort().join('');
  }).split('').map(value => parseInt(value, 10));

  console.log(args);
  console.log('\n');
  return args;
};

/* eslint-disable max-len */
sym([1, 2, 3], [5, 2, 1, 4]); // should return [3, 4, 5] & should contain only three elements.
sym([1, 2, 5], [2, 3, 5], [3, 4, 5]); // should return [1, 4, 5] & should contain only three elements.
sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]); // should return [1, 4, 5] & should contain only three elements.
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]); // should return [2, 3, 4, 6, 7] & should contain only five elements.
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]); // should return [1, 2, 4, 5, 6, 7, 8, 9] & should contain only eight elements.


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const sym = function (...argument) {
    let args = argument.map(value => value.sort().join(''));
    let symmilar = [];

    return args.reduce((prev, cur) => {
      symmilar = [];
      for (let i = 0; i < cur.length; i += 1) {
        if (!prev.includes(cur.charAt(i)) && !symmilar.join('').includes(cur.charAt(i))) {
          symmilar.push(cur.charAt(i));
        }
      }
      for (let i = 0; i < prev.length; i += 1) {
        if (!cur.includes(prev.charAt(i)) && !symmilar.join('').includes(prev.charAt(i))) {
          symmilar.push(prev.charAt(i));
        }
      }
      return symmilar.sort().join('');
    }).split('').map(value => parseInt(value, 10));
  };

*/
