console.log('Check if the predicate (second argument) is truthy on all elements on a collection (first argument) \n');

const truthCheck = function (collection, pre) {
  console.log(`Passed collection: ${JSON.stringify(collection)}`);
  console.log(`Passed predicate: ${JSON.stringify(pre)}`);

  console.log(`Return: ${collection.every((value) => {
    console.log(`Value: ${value[pre]}`);
    console.log(`Truthy?: ${!!value[pre]}`);
    return !!value[pre];
  })}\n`);

  return collection.every(value => !!value[pre]);
};


truthCheck([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }, { user: 'Laa-Laa', sex: 'female' }, { user: 'Po', sex: 'female' }], 'sex'); // should return true.
truthCheck([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy' }, { user: 'Laa-Laa', sex: 'female' }, { user: 'Po', sex: 'female' }], 'sex'); // should return false.
truthCheck([{ user: 'Tinky-Winky', sex: 'male', age: 0 }, { user: 'Dipsy', sex: 'male', age: 3 }, { user: 'Laa-Laa', sex: 'female', age: 5 }, { user: 'Po', sex: 'female', age: 4 }], 'age'); // should return false.
truthCheck([{ name: 'Pete', onBoat: true }, { name: 'Repeat', onBoat: true }, { name: 'FastFoward', onBoat: null }], 'onBoat'); // should return false
truthCheck([{ name: 'Pete', onBoat: true }, { name: 'Repeat', onBoat: true, alias: 'Repete' }, { name: 'FastFoward', onBoat: true }], 'onBoat'); // should return true
truthCheck([{ single: 'yes' }], 'single'); // should return true
truthCheck([{ single: '' }, { single: 'double' }], 'single'); // should return false
truthCheck([{ single: 'double' }, { single: undefined }], 'single'); // should return false
truthCheck([{ single: 'double' }, { single: NaN }], 'single'); // should return false

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const truthCheck = function (collection, pre) {
    return collection.every(value => !!value[pre]);
  };

*/
