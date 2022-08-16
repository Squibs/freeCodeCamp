console.log('Take each character, get its pair, and return the results as a 2d array. \n');

const pairElement = function (str) {
  console.log(`Passed string: ${str}`);
  // JSON like data
  const pairs = { T: ['T', 'A'], A: ['A', 'T'], C: ['C', 'G'], G: ['G', 'C'] };

  // Use map method to itterate through array
  // use currently selected object/value as array index on pairs
  const result = str.split('').map(curObj => pairs[curObj]);

  console.log(`Pairs to return ${result}\n`);
  return result;
};

// A 'G' will return a match of 'C'; a 'T' will return a match of 'A' both rules can be reversed
pairElement('GCG'); // should return [['G', 'C'], ['C', 'G'], ['G', 'C']].
pairElement('ATCGA'); // should return [['A','T'],['T','A'],['C','G'],['G','C'],['A','T']].
pairElement('TTGAG'); // should return [['T','A'],['T','A'],['G','C'],['A','T'],['G','C']].
pairElement('CTCTA'); // should return [['C','G'],['T','A'],['C','G'],['T','A'],['A','T']].

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const pairElement = function (str) {
    const pairs = { T: ['T', 'A'], A: ['A', 'T'], C: ['C', 'G'], G: ['G', 'C'] };

    const result = str.split('').map(curObj => pairs[curObj]);

    return result;
  };

*/
