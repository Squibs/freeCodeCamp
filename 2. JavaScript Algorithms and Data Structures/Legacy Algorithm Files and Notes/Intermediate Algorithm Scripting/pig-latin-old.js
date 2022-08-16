console.log('Translate the provided string to pig latin \n');

const translatePigLatin = function (str) {
  console.log(`Passed string: ${str}`);
  let pigLatin = str;
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  const ay = 'ay';
  const way = 'way';

  for (let k = 0; k < str.length; k += 1) {
    for (let i = 0; i < vowels.length; i += 1) {
      if (str.toLowerCase().search(vowels[i]) === 0) {
        console.log('Vowel at start. Add \'way\' to end.');
        pigLatin = str + way;
        console.log(`String to return: ${pigLatin}\n`);
        return pigLatin;
      }

      if (str.charAt(k) === vowels[i]) {
        console.log('Word contains a vowel. Split string before vowel and add to end of string, then add \'ay\' to end of that');
        pigLatin = str.substr(k) + str.slice(0, k) + ay;
        console.log(`String to return: ${pigLatin}\n`);
        return pigLatin;
      }
    }
  }

  console.log('Word does not contain a vowel. Add \'ay\' to end of string');
  pigLatin += ay;
  console.log(`String to return: ${pigLatin}\n`);
  return pigLatin + ay;
};

translatePigLatin('consonant'); // should return 'onsonantcay'.
translatePigLatin('california'); // should return 'aliforniacay'.
translatePigLatin('paragraphs'); // should return 'aragraphspay'.
translatePigLatin('glove'); // should return 'oveglay'.
translatePigLatin('algorithm'); // should return 'algorithmway'.
translatePigLatin('eight'); // should return 'eightway'.
translatePigLatin('tsk'); // should return 'tskay'.

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const translatePigLatin = function (str) {
    let pigLatin = str;
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    const ay = 'ay';
    const way = 'way';

    for (let k = 0; k < str.length; k += 1) {
      for (let i = 0; i < vowels.length; i += 1) {
        if (str.toLowerCase().search(vowels[i]) === 0) {
          pigLatin = str + way;
          return pigLatin;
        }

        if (str.charAt(k) === vowels[i]) {
          pigLatin = str.substr(k) + str.slice(0, k) + ay;
          return pigLatin;
        }
      }
    }

    pigLatin += ay;
    return pigLatin + ay;
  };

*/
