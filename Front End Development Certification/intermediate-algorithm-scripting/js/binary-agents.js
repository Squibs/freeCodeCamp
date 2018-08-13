console.log('Return an English translated sentence of the passed binary string. \n');

const binaryAgent = function (str) {
  console.log(`Passed string: ${str}`);

  const array = str.split(' ');
  console.log(JSON.stringify(array));

  array.forEach((value, index) => {
    const binary = [128, 64, 32, 16, 8, 4, 2, 1];
    let sum = 0;
    for (let i = 0; i < value.length; i += 1) {
      sum += value.charAt(i) * binary[i];
    }
    array[index] = String.fromCharCode(sum);
    console.log(String.fromCharCode(sum));
    return value;
  });

  console.log(array.join(''));
  return array.join('');
};

binaryAgent('01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111'); // should return "Aren't bonfires fun!?"
binaryAgent('01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001'); // should return "I love FreeCodeCamp!"

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const binaryAgent = function (str) {
    const array = str.split(' ');

    array.forEach((value, index) => {
      const binary = [128, 64, 32, 16, 8, 4, 2, 1];
      let sum = 0;
      for (let i = 0; i < value.length; i += 1) {
        sum += value.charAt(i) * binary[i];
      }
      array[index] = String.fromCharCode(sum);
      return value;
    });

    return array.join('');
  };

*/
