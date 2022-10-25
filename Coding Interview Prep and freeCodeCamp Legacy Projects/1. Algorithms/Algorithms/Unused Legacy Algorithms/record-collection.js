console.log('Modify the collection object based on the passed arguments. \n');

// Setup
const collection = {
  2548: {
    album: 'Slippery When Wet',
    artist: 'Bon Jovi',
    tracks: [
      'Let It Rock',
      'You Give Love a Bad Name',
    ],
  },
  2468: {
    album: '1999',
    artist: 'Prince',
    tracks: [
      '1999',
      'Little Red Corvette',
    ],
  },
  1245: {
    artist: 'Robert Palmer',
    tracks: [],
  },
  5439: {
    album: 'ABBA Gold',
  },
};
// Keep a copy of the collection for tests
const collectionCopy = JSON.parse(JSON.stringify(collection));

console.log('Collection before modificatons:');
console.log(collection);
console.log('\n');

// Only change code below this line
const updateRecords = function (id, prop, value) {
  console.log(`Passed id: ${id}\nPassed prop: ${prop}\nPassed value: ${value}`);
  if (!collection[id][prop]) {
    if (prop === 'tracks') {
      collection[id][prop] = [];
    } else {
      collection[id][prop] = value;
    }
  }
  if (value === '') {
    delete collection[id][prop];
  } else if (Array.isArray(collection[id][prop])) {
    collection[id][prop].push(value);
  } else {
    collection[id][prop] = value;
  }
  console.log(collection);
  console.log('\n');
  return collection;
};

// Alter values below to test your code
updateRecords(5439, 'artist', 'ABBA');
updateRecords(5439, 'tracks', 'Take a Chance on Me');
updateRecords(2548, 'artist', '');
updateRecords(1245, 'tracks', 'Addicted to Love');
updateRecords(2468, 'tracks', 'Free');
updateRecords(2548, 'tracks', '');

console.log('Final collection:');
console.log(collection);
console.log('\nFinal collectionCopy:');
console.log(collectionCopy);


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const updateRecords = function (id, prop, value) {
    if (!collection[id][prop]) {
      if (prop === 'tracks') {
        collection[id][prop] = [];
      } else {
        collection[id][prop] = value;
      }
    }
    if (value === '') {
      delete collection[id][prop];
    } else if (Array.isArray(collection[id][prop])) {
      collection[id][prop].push(value);
    } else {
      collection[id][prop] = value;
    }
    return collection;
  };

*/
