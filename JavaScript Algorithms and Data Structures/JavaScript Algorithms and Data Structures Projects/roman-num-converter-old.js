console.log('Objective: Convert the given number into a roman numeral\n');

const convertToRoman = function (num) {
  let number = [];
  console.log(`Passed number: ${num}`);

  const romanNumeralsOne = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  const romanNumeralsTen = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
  const romanNumeralsHundred = ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
  const romanNumeralsThousand = ['M', 'MM', 'MMM'];

  for (let i = 0; i < num.toString().length; i += 1) {
    number.push(num.toString().charAt(i));
  }
  console.log(number);

  if (number.length > 3) {
    number[0] = romanNumeralsThousand[(number[0] - 1)];
    number[1] = romanNumeralsHundred[(number[1] - 1)];
    number[2] = romanNumeralsTen[(number[2] - 1)];
    number[3] = romanNumeralsOne[(number[3] - 1)];
    console.log(number);
  } else if (number.length > 2) {
    number[0] = romanNumeralsHundred[(number[0] - 1)];
    number[1] = romanNumeralsTen[(number[1] - 1)];
    number[2] = romanNumeralsOne[(number[2] - 1)];
    console.log(number);
  } else if (number.length > 1) {
    number[0] = romanNumeralsTen[(number[0] - 1)];
    number[1] = romanNumeralsOne[(number[1] - 1)];
    console.log(number);
  } else {
    number[0] = romanNumeralsOne[(number[0] - 1)];
    console.log(number);
  }

  number = number.filter(val => val !== undefined).join('');

  console.log(`Roman numeral to return: ${number}\n`);
  return number;
};

convertToRoman(36);
convertToRoman(2); // should return "II".
convertToRoman(3); // should return "III".
convertToRoman(4); // should return "IV".
convertToRoman(5); // should return "V".
convertToRoman(9); // should return "IX".
convertToRoman(12); // should return "XII".
convertToRoman(16); // should return "XVI".
convertToRoman(29); // should return "XXIX".
convertToRoman(44); // should return "XLIV".
convertToRoman(45); // should return "XLV"
convertToRoman(68); // should return "LXVIII"
convertToRoman(83); // should return "LXXXIII"
convertToRoman(97); // should return "XCVII"
convertToRoman(99); // should return "XCIX"
convertToRoman(500); // should return "D"
convertToRoman(501); // should return "DI"
convertToRoman(649); // should return "DCXLIX"
convertToRoman(798); // should return "DCCXCVIII"
convertToRoman(891); // should return "DCCCXCI"
convertToRoman(1000); // should return "M"
convertToRoman(1004); // should return "MIV"
convertToRoman(1006); // should return "MVI"
convertToRoman(1023); // should return "MXXIII"
convertToRoman(2014); // should return "MMXIV"
convertToRoman(3999); // should return "MMMCMXCIX"

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const convertToRoman = function (num) {
    let number = [];

    const romanNumeralsOne = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    const romanNumeralsTen = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
    const romanNumeralsHundred = ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
    const romanNumeralsThousand = ['M', 'MM', 'MMM'];

    for (let i = 0; i < num.toString().length; i += 1) {
      number.push(num.toString().charAt(i));
    }

    if (number.length > 3) {
      number[0] = romanNumeralsThousand[(number[0] - 1)];
      number[1] = romanNumeralsHundred[(number[1] - 1)];
      number[2] = romanNumeralsTen[(number[2] - 1)];
      number[3] = romanNumeralsOne[(number[3] - 1)];
      console.log(number);
    } else if (number.length > 2) {
      number[0] = romanNumeralsHundred[(number[0] - 1)];
      number[1] = romanNumeralsTen[(number[1] - 1)];
      number[2] = romanNumeralsOne[(number[2] - 1)];
      console.log(number);
    } else if (number.length > 1) {
      number[0] = romanNumeralsTen[(number[0] - 1)];
      number[1] = romanNumeralsOne[(number[1] - 1)];
      console.log(number);
    } else {
      number[0] = romanNumeralsOne[(number[0] - 1)];
      console.log(number);
    }

    number = number.filter(val => val !== undefined).join('');

    return number;
  };

*/
