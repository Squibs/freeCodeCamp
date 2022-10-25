console.log('Objective: Write a function which takes a ROT13 encoded string as input and returns a decoded string.\n');

function rot13(str) {
  // A is 65, a is 97; Z is 90, z is 122
  console.log(`Passed string:         "${str}"`);

  console.log(`Adjusted 13 positions: "${str.replace(/[A-Z]/g, letter => String.fromCharCode((letter.charCodeAt(0) % 26) + 65))}"\n`);

  return str.replace(/[A-Z]/g, letter => String.fromCharCode((letter.charCodeAt(0) % 26) + 65));
}


/* eslint-disable */
rot13("SERR PBQR PNZC"); // decode to "FREE CODE CAMP"
rot13("SERR CVMMN!"); // "FREE PIZZA!"
rot13("SERR YBIR?"); // "FREE LOVE?"
rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK."); // "THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX."


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  function rot13(str) {
    return str.replace(/[A-Z]/g, letter => String.fromCharCode((letter.charCodeAt(0) % 26) + 65));
  }

*/
