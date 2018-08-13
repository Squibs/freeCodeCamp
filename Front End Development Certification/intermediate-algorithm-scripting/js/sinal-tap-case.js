console.log('Convert a string to spinal case. (all-lowercase-words-joined-by-dashes.) \n');

const spinalCase = function (str) {
  console.log(`Passed String: ${str}`);

  console.log(`Add spaces where needed: ${JSON.stringify(str.replace(/[a-z](?=[A-Z])/g, '$& '))}`);
  const spinal = str.replace(/[a-z](?=[A-Z])/g, '$& ');

  console.log(`String to Return: ${JSON.stringify(spinal.split(/[\s_-]/g).join('-').toLowerCase())}\n`);
  return spinal.split(/[\s_-]/g).join('-').toLowerCase();
};


spinalCase('This Is Spinal Tap'); // should return 'this-is-spinal-tap'.
spinalCase('thisIsSpinalTap'); // should return 'this-is-spinal-tap'.
spinalCase('The_Andy_Griffith_Show'); // should return 'the-andy-griffith-show'.
spinalCase('Teletubbies say Eh-oh'); // should return 'teletubbies-say-eh-oh'.
spinalCase('AllThe-small Things'); // should return 'all-the-small-things'.


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const spinalCase = function (str) {
    const spinal = str.replace(/[a-z](?=[A-Z])/g, '$& ');
    return spinal.split(/[\s_-]/g).join('-').toLowerCase();
  };

*/
