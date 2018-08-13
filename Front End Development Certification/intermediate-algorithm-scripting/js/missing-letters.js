console.log('Find the missing letter in the passed letter range and return it \n');

const fearNotLetter = function (str) {
  console.log(`Passed string: ${str}`);

  const string = str.split('').map(curObj => curObj.charCodeAt(0));
  console.log(`Convert string into array of char codes: [${string}]`);

  let count = str.charCodeAt(0);
  string.filter((curObj) => {
    if (curObj === count) {
      count += 1;
      return true;
    }
    return false;
  });

  console.log(`if Current count: ${count} = ${str.charCodeAt(str.length - 1) + 1}`);
  if (count === str.charCodeAt(str.length - 1) + 1) {
    console.log('No missing char / undefined\n');
    return undefined;
  }
  console.log(`Missing Char: ${count}`);


  console.log(`Char to return: ${String.fromCharCode(count)}\n`);
  return String.fromCharCode(count);
};

fearNotLetter('abce'); // should return 'd'.
fearNotLetter('abcdefghjklmno'); // should return 'i'.
fearNotLetter('bcd'); // should return undefined.
fearNotLetter('yz'); // should return undefined.
fearNotLetter('abcdefghijklmnopqrstvwxyz'); // should return 'u'.

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const fearNotLetter = function (str) {
    const string = str.split('').map(curObj => curObj.charCodeAt(0));
    let count = str.charCodeAt(0);

    string.filter((curObj) => {
      if (curObj === count) {
        count += 1;
        return true;
      }
      return false;
    });

    if (count === str.charCodeAt(str.length - 1) + 1) {
      return undefined;
    }

    return String.fromCharCode(count);
  };

*/
