console.log('Objective: Look through an array of objects, and return an arry of all objects that have matching property and value pairs. \n');

const whatIsInAName = function (collection, source) {
  console.log(`Passed collection: ${JSON.stringify(collection)} \nPassed source: ${JSON.stringify(source)}`);

  let arr = [];
  const keys = Object.keys(source);

  console.log(`Convert source to an array of keys: [${keys}]`);

  const hasOwnProperty = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };

  arr = collection.filter((curObject) => {
    for (let i = 0; i < Object.keys(source).length; i += 1) {
      /* if the current target doesn't contain the selected key
         or the current object selected key value is not equal to the source selected key value */
      if (!hasOwnProperty(curObject, keys[i]) || curObject[keys[i]] !== source[keys[i]]) {
        return false;
      }
    }
    return true;
  });

  console.log(`Array to return: ${JSON.stringify(arr)}\n`);
  return arr;
};

/* eslint-disable */
whatIsInAName([{ first: 'Romeo', last: 'Montague' }, { first: 'Mercutio', last: null }, { first: 'Tybalt', last: 'Capulet' }], { last: 'Capulet' }); // should return [{ first: 'Tybalt', last: 'Capulet' }].
whatIsInAName([{ a: 1 }, { a: 1 }, { a: 1, b: 2 }], { a: 1 }); // should return [{ a: 1 }, { a: 1 }, { a: 1, b: 2 }].
whatIsInAName([{ a: 1, b: 2 }, { a: 1 }, { a: 1, b: 2, c: 2 }], { a: 1, b: 2 }); // should return [{ a: 1, b: 2 }, { a: 1, b: 2, c: 2 }].
whatIsInAName([{ a: 1, b: 2 }, { a: 1 }, { a: 1, b: 2, c: 2 }], { a: 1, c: 2 }); // should return [{ a: 1, b: 2, c: 2 }].


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

const whatIsInAName = function (collection, source) {
  const keys = Object.keys(source);

  let arr = collection.filter((curObject) => {
    for (let i = 0; i < Object.keys(source).length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(curObject, keys[i]) || curObject[keys[i]] !== source[keys[i]]) {
        return false;
      }
    }
    return true;
  });

  return arr;
};

*/
/* eslint-enable */
