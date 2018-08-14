console.log('Return a new array that transforms the element\'s average altitude into their orbital periods\n');
// 2π * square √((avgAlt + earthRadius)³ / GM) https://en.wikipedia.org/wiki/Orbital_period#Small_body_orbiting_a_central_body

const orbitalPeriod = function (arr) {
  console.log(`Passed Array: ${JSON.stringify(arr)}`);
  const GM = 398600.4418;
  const earthRadius = 6367.4447; // in kilometers
  const array = [];

  arr.forEach((value) => {
    array.push({ name: value.name, orbitalPeriod: Math.round(2 * Math.PI * Math.sqrt(Math.pow(earthRadius + value.avgAlt, 3) / GM)) });
  });

  console.log(array);

  console.log('\n');
  return array;
};

orbitalPeriod([{ name: 'sputnik', avgAlt: 35873.5553 }]); // should return [{name: 'sputnik', orbitalPeriod: 86400}].
orbitalPeriod([{ name: 'iss', avgAlt: 413.6 }, { name: 'hubble', avgAlt: 556.7 }, { name: 'moon', avgAlt: 378632.553 }]); // should return [{name : 'iss', orbitalPeriod: 5557}, {name: 'hubble', orbitalPeriod: 5734}, {name: 'moon', orbitalPeriod: 2377399}].

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const orbitalPeriod = function (arr) {
    const GM = 398600.4418;
    const earthRadius = 6367.4447;
    const array = [];

    arr.forEach((value) => {
      array.push({ name: value.name, orbitalPeriod: Math.round(2 * Math.PI * Math.sqrt(Math.pow(earthRadius + value.avgAlt, 3) / GM)) });
    });

    return array;
  };

*/
