console.log('Sum all the prime numbers up to and including the provided number. \n');

const sumPrimes = function (num) {
  console.log(`Passed Number: ${num}`);
  if (num === 1) {
    console.log('Passed number is 1, which is not prime; return 0\n');
    return 0;
  }

  let sieve = [];
  const primes = [];

  for (let i = 2; i <= num; i += 1) {
    sieve.push(i);
  }

  while (sieve.length) {
    primes.push(sieve.shift());
    sieve = sieve.filter(value => value % primes[primes.length - 1] !== 0);
  }

  console.log(JSON.stringify(primes));

  console.log(`${primes.reduce((acc, cur) => acc + cur, 0)}\n`);
  return primes.reduce((acc, cur) => acc + cur, 0);
};

sumPrimes(4);
sumPrimes(8);
sumPrimes(10); // should return 17.
sumPrimes(42);
sumPrimes(88);
sumPrimes(59);
sumPrimes(977); // should return 73156.

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const sumPrimes = function (num) {
    if (num === 1) {
      console.log('Passed number is 1, which is not prime; return 0\n');
      return 0;
    }

    let sieve = [];
    const primes = [];

    for (let i = 2; i <= num; i += 1) {
      sieve.push(i);
    }

    while (sieve.length) {
      primes.push(sieve.shift());
      sieve = sieve.filter(value => value % primes[primes.length - 1] !== 0);
    }

    return primes.reduce((acc, cur) => acc + cur, 0);
  };

*/
