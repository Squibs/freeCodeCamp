const bubbleSort = (array: number[]) => {
  let arr = array;
  let loopCount = 0;

  // // two for loop solution
  // for (let i = 0; i < arr.length; i += 1) {
  //   for (let j = 0; j < arr.length; j += 1) {
  //     if (arr[j] > arr[j + 1]) {
  //       const tmp = arr[j];
  //       arr[j] = arr[j + 1];
  //       arr[j + 1] = tmp;
  //       loopCount += 1;

  //       // secondary nonsense solution
  //       // const len = arr.length;
  //       // const eq = -(len - (j + 2));
  //       // arr = [...arr.slice(0, j), arr[j + 1], arr[j], ...arr.slice(eq >= 0 ? len : eq, len)]
  //       // loopCount += 1;
  //     }
  //   }
  // }


  // one for loop solution, saves some loops in certain conditions
  for (let j = 0; j < arr.length; j += 1) {
    if (arr[j] > arr[j + 1]) {
      const tmp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = tmp;
      j = 0;
      loopCount += 1;
    }
  }
  
  console.log(loopCount);
  return arr;
};

// requirements: without using the built-in .sort() method
// return array.sort((a, b) => a - b);

console.log(bubbleSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]));
console.log(bubbleSort([7,40,23,88,1,60,700,90,60,90,23,8,9,15]));
console.log(bubbleSort([42,393,67,88,45,798,76,3,22,6,246,75,60,359,731,351,38,54,84,35,1,6,7,4,4,81,20,4,6,3]))
