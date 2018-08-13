console.log('Perform a search and repalce on the sentence using the arguments provided and return the new sentence \n');

const myReplace = function (str, before, after) {
  console.log(`Passed string: ${str}\nPassed before: ${before}\nPassed after: ${after}`);
  let string = str.split(' ');

  string = string.map((cur) => {
    console.log(cur);
    if (cur.toLowerCase() === before.toLowerCase()) {
      if (before.charAt(0) === before.charAt(0).toUpperCase()) {
        return after.charAt(0).toUpperCase() + after.slice(1);
      }
      return after.charAt(0).toLowerCase() + after.slice(1);
    }
    return cur;
  });

  string = string.join(' ');

  console.log(`String to return: ${string}\n`);
  return string;
};

myReplace('A quick brown fox jumped over the lazy dog', 'jumped', 'leaped'); // should return 'A quick brown fox leaped over the lazy dog'.
myReplace('Let us go to the store', 'store', 'mall'); // should return 'Let us go to the mall'.
myReplace('He is Sleeping on the couch', 'Sleeping', 'sitting'); // should return 'He is Sitting on the couch'.
myReplace('This has a spellngi error', 'spellngi', 'spelling'); // should return 'This has a spelling error'.
myReplace('His name is Tom', 'Tom', 'john'); // should return 'His name is John'.
myReplace('Let us get back to more Coding', 'Coding', 'algorithms'); // should return 'Let us get back to more Algorithms'.

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const myReplace = function (str, before, after) {
    let string = str.split(' ');

    string = string.map((cur) => {
      if (cur.toLowerCase() === before.toLowerCase()) {
        if (before.charAt(0) === before.charAt(0).toUpperCase()) {
          return after.charAt(0).toUpperCase() + after.slice(1);
        }
        return after.charAt(0).toLowerCase() + after.slice(1);
      }
      return cur;
    });

    string = string.join(' ');

    return string;
  };

*/
