console.log('Given a positive integer (num), return the sum of all odd Fibonacci numbers that are less than equal (num). \n');

const sumFibs = function (num) {
  console.log(`Passed number: ${num}`);

  if (num < 3) {
    console.log(`Number below 3, return ${num}\n`);
    return num;
  }

  let fib = [0, 1, 1, 2];

  console.log('Create array of fibonacci numbers:');
  for (let i = 3; fib[i] < num; i += 1) {
    fib.push(fib[i] + fib[i - 1]);
    console.log(JSON.stringify(fib));
  }

  if (fib[fib.length - 1] > num) {
    console.log(`Remove numbers greater than ${num} from array:`);
    fib.pop();
    console.log(JSON.stringify(fib));
  }

  // if 0: even; if 1: odd
  fib = fib.filter((value) => {
    if (value % 2 === 0) {
      return false;
    }
    return true;
  });

  console.log(`Value to return: ${JSON.stringify(fib.reduce((prev, curr) => prev + curr))}\n`);
  return fib.reduce((prev, curr) => prev + curr);
};

sumFibs(1); // should return a number.
sumFibs(2);
sumFibs(3);
sumFibs(1000); // should return 1785.
sumFibs(4000000); // should return 4613732.
sumFibs(4); // should return 5.
sumFibs(75024); // should return 60696.
sumFibs(75025); // should return 135721.

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const sumFibs = function (num) {
    if (num < 3) { return num; }

    let fib = [0, 1, 1, 2];

    for (let i = 3; fib[i] < num; i += 1) {
      fib.push(fib[i] + fib[i - 1]);
    }

    if (fib[fib.length - 1] > num) { fib.pop(); }

    fib = fib.filter((value) => {
      if (value % 2 === 0) {
        return false;
      }
      return true;
    });

    return fib.reduce((prev, curr) => prev + curr);
  };

*/
