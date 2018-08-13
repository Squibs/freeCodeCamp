console.log('Objective: check if string is a palindrome. \n');

function palindrome(str) {
  console.log(`Original string: "${str}"`);
  console.log(`Remove symbols:  "${str.toLowerCase().replace(/[\W_]/g, '')}"`);
  console.log(`Palindrome?:      ${str.toLowerCase().replace(/[\W_]/g, '').split('').every((value, index, array) => value === array[array.length - 1 - index])}\n`);

  return str.toLowerCase().replace(/[\W_]/g, '').split('')
    .every((value, index, array) => value === array[array.length - 1 - index]);
}

/* eslint-disable */
palindrome("eye"); // should return true
palindrome("_eye"); // should return true
palindrome("race car"); // should return true
palindrome("not a palindrome"); // should return false
palindrome("A man, a plan, a canal. Panama"); // should return true
palindrome("never odd or even"); // should return true
palindrome("nope"); // should return false
palindrome("almostomla"); // should return false
palindrome("My age is 0, 0 si ega ym."); // should return true
palindrome("1 eye for of 1 eye."); // should return false
palindrome("0_0 (: /-\ :) 0-0"); // should return true
palindrome("five|\_/|four"); // should return false


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function palindrome(str) {
    return str.toLowerCase().replace(/[\W_]/g, '').split('').every((value, index, array) => value === array[array.length - 1 - index]);
    }
    
*/
