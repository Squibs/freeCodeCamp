# Algorithms

List of sections:

<!-- TOC -->

- [Introduction to the Coding Interview Algorithms](#introduction-to-the-coding-interview-algorithms)
- [Find the Symmetric Difference](#find-the-symmetric-difference)
- [Inventory Update](#inventory-update)
- [No Repeats Please](#no-repeats-please)
- [Pairwise](#pairwise)
- [Implement Bubble Sort](#implement-bubble-sort)
- [Implement Selection Sort](#implement-selection-sort)
- [Implement Insertion Sort](#implement-insertion-sort)
- [Implement Quick Sort](#implement-quick-sort)
- [Implement Merge Sort](#implement-merge-sort)

<!-- /TOC -->

---

## Introduction to the Coding Interview Algorithms

These are extra Algorithms challenges, some of which are legacy challenges from the older freeCodeCamp curriculum, which can be completed for extra practice or to challenge yourself.

---

## Find the Symmetric Difference

```JavaScript
// CONDENSED VERSION - NO CONSOLE OUTPUTS

const sym = function (...argument) {
  let args = argument.map(value => value.sort().join(''));
  let symmilar = [];

  return args.reduce((prev, cur) => {
    symmilar = [];
    for (let i = 0; i < cur.length; i += 1) {
      if (!prev.includes(cur.charAt(i)) && !symmilar.join('').includes(cur.charAt(i))) {
        symmilar.push(cur.charAt(i));
      }
    }
    for (let i = 0; i < prev.length; i += 1) {
      if (!cur.includes(prev.charAt(i)) && !symmilar.join('').includes(prev.charAt(i))) {
        symmilar.push(prev.charAt(i));
      }
    }
    return symmilar.sort().join('');
  }).split('').map(value => parseInt(value, 10));
};
```

[(symmetric-difference.js)](https://github.com/Squibs/freeCodeCamp/blob/master/7.%20Coding%20Interview%20Prep%20and%20freeCodeCamp%20Legacy%20Projects/1.%20Algorithms/Algorithms/symmetric-difference.js#L1)

I had to redo this challenge several times. It definitely helps to understand what you are trying to accomplish before jumping in and finding an incorrect solution. Initially I grouped every argument into a single array, flattened the array, sorted the array, and the removed all duplicate values `(1, 1, 2, 2, 3, 4, 5, 5) => (3, 4)`; as this is what I believed this challenge was asking for. This was not the case, as I soon found out after trying to submit my answer. I then went back and modified my original answer several times, before finally giving into the fact that I had no idea what the challenge was asking for.

I ended up going through each case and breaking down what was happening step by step, until I figured out the answer. Below is an example of what I did to understand what was happening for this challenge:

```
[3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3] should return [2, 3, 4, 6, 7]
[3, 3, 3, 2, 5]     △     [2, 1, 5, 7]     =     [1, 3, 7]
          •  •             •     •
      [1, 3, 7]     △     [3, 4, 6, 6]     =     [1, 4, 6, 7]
          •                •
   [1, 4, 6, 7]     △     [1, 2, 3]        =     [2, 3, 4, 6, 7]
    •                      •
```

After going through the first few of cases for this challenge in the same manner as the above, I understood what was happening to get the desired results. Having examples written out like the above for each case was also useful for debugging my code.

Looking at the provided solutions, I feel as though I provided an adequate solution for this algorithm challenge. Of course as usual my solution could definitely be improved, but it does do what this challenge is asking for.

---

## Inventory Update

```JavaScript
// CONDENSED VERSION - NO CONSOLE OUTPUTS

const updateInventory = function (arr1, arr2) {
  let combined = [];
  let curInv = arr1.concat(arr2).sort((a, b) => {
    if (a[1] === b[1]) {
      return 0;
    }
    return a[1] < b[1] ? -1 : 1;
  }).reduce((prev, cur) => {
    let flag = true;
    if (combined.length === 0) {
      combined.push(prev);
    }
    combined.forEach((value, index) => {
      if (value[1] === cur[1]) {
        combined[index][0] += cur[0];
        flag = false;
      }
    });
    if (flag) {
      combined.push(cur);
      flag = true;
    }
    return combined;
  });

  return curInv;
};
```

[(inventory-update.js)](https://github.com/Squibs/freeCodeCamp/blob/master/7.%20Coding%20Interview%20Prep%20and%20freeCodeCamp%20Legacy%20Projects/1.%20Algorithms/Algorithms/inventory-update.js#L1)

For this challenge, I combined the two passed arrays into one with the `concat()` method. I then sorted the combined two dimensional array with the `sort()` method and from there I did the rest with the `reduce()` method.

I needed two things for of the `reduce()` method to get this to work. I needed an outside variable `combined` and a `flag` to control what was being pushed to `combined`. If the length of combined is 0 I would push the previous array into it, this would only run on the first iteration of the `reduce()` method. I then used the `forEach()` method on combined and tested if the current value of the `forEach()` method is equal to the current value of the `reduce()` method and if it is combine the total in the previous and current arrays and set the flag to false. Finally if the flag is true push the current value (to control repeats).

Looking at the provided solutions it is easy to see where I could have improved. Instead of using the `reduce()` method, I could have used nested `forEach()` methods. I had the right idea in using a flag to control whether or not to push the current value or not, I just was not sure how to go about comparing the values. I think my major issue / flaw / querk for this challenge was combining the two arrays right off the bat and trying to work with the combined array. It would have been much simpler to work with the two separate passed arrays.

---

## No Repeats Please

```JavaScript
// CONDENSED VERSION - NO CONSOLE OUTPUTS

const permAlone = function (str) {
  const array = str.split('');
  let counter = 0;

  const swap = function (a, b) {
    const holder = array[a];
    array[a] = array[b];
    array[b] = holder;
  };

  const heap = function (number) {
    const regex = /([a-zA-z])\1+/g;

    if (number === 1 && !regex.test(array.join(''))) {
      counter += 1;
    } else {
      for (let i = 0; i !== number; i += 1) {
        heap(number - 1);
        if (number % 2 === 0) {
          swap(i, number - 1);
        } else {
          swap(0, number - 1);
        }
      }
    }
  };
  heap(array.length);
  return counter;
};
```

[(no-repeats-please.js)](https://github.com/Squibs/freeCodeCamp/blob/master/7.%20Coding%20Interview%20Prep%20and%20freeCodeCamp%20Legacy%20Projects/1.%20Algorithms/Algorithms/no-repeats-please.js#L1)

This one was very difficult. I repeatedly tried to solve this with what I already know, and failed many times. Many of my attempts included this:

```JavaScript
const factorial = function (number) {
  if (number === 1) { return 1; }
  return number * factorial(number - 1);
};
```

I thought this would bring me success in solving this challenge on my own. It is just a simple method to get the factorial of a number. I tried many times to figure out how to get to the correct outcome for each case for this challenge, but I just could not figure it out on my own. I then tried using [this guide](https://stackoverflow.com/questions/32282607/permutations-excluding-repeated-characters/36178855#36178855) in order to create my solution. Ultimately I think my major problem with this algorithm challenge is not understanding how exactly to calculate the answers outside of programming; having basic fundamental knowledge in how to solve this with pen and paper. No matter what I did I could not understand how to get the answer for `permAlone("aaabb") should return 12`. Sure I can easily write out the combinations or visualize them, but I do not know the correct formula to calculate the answer.

In the end I had to resort to using [Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm) in order to solve this challenge:

```JavaScript
procedure generate(n : integer, A : array of any):
    if n = 1 then
          output(A)
    else
        for i := 0; i < n - 1; i += 1 do
            generate(n - 1, A)
            if n is even then
                swap(A[i], A[n-1])
            else
                swap(A[0], A[n-1])
            end if
        end for
        generate(n - 1, A)
    end if
```

Even having this pseudocode, I struggled to find a way to use this in order to solve this problem. I tried many different ways to use this algorithm in-conjunction with the passed string, but couldn't find an appropriate way to get the answer I desired. Many times I created infinite loops in my translated version of `Heap's Algorithm` or simply created stack overflow errors. Getting to the solution without additional help was just not going to happen.

I ended up watching many videos on using `Heap's Algorithm` and ended up borrowing ideas from different sources until I managed to solve this challenge. I do not feel all that successful at the end of this challenge; however this was a great learning experience. `Heap's Algorithm` is a great example of recursion with [multiple branches](https://discourse-user-assets.s3.amazonaws.com/optimized/2X/7/76fac6502eaadd8e1c63b223163ddcceef6cd3cf_1_690x387.png).

Looking for the provided solution to this challenge, it looks like a great deal of people struggled to solve this one as well; that makes me feel a bit better about how I went about solving it. In the end I believe that using either of `Heap's Algorithms` (recursive or non-recursive) is probably one of the more optimal ways to solve this challenge.

---

## Pairwise

```JavaScript
// CONDENSED VERSION - NO CONSOLE OUTPUTS

const pairwise = function (arr, arg) {
  const array = arr;
  let sum = 0;

  array.forEach((value, index) => {
    for (let i = 0; i < array.length; i += 1) {
      if (value + array[i] === arg && index !== i) {
        sum += index + i;
        array[i] = 'banana'; // could use delete, but i'd rather make it a banana
        array[index] = 'banana';
        break;
      }
    }
  });

  return sum;
};
```

[(pairwise.js)](https://github.com/Squibs/freeCodeCamp/blob/master/7.%20Coding%20Interview%20Prep%20and%20freeCodeCamp%20Legacy%20Projects/1.%20Algorithms/Algorithms/pairwise.js#L1)

This challenge wasn't all that hard either. Once again as long as I understand what is happening I think finding a solution is quite simple. For this challenge I stored the passed array in new variable `array`, as I would be changing values of the passed array and due to AirBnB / eslint standards you should not really be assigning values to passed arguments / variables. I then create a sum variable to hold the desired outcome for this challenge.

I iterate through the passed array with the `forEach()` method and create a for loop to through the same array again (I can probably do this in a better way rather than using a for loop). If the current value in the `forEach()` method is equal to the current value in the for loop and the indices are not the same, I would push the sum of their indices to the `sum` variable and set each element equal to 'banana'. I could also just use delete to remove the element, but I wanted to add a touch of yellow to my modified array. I then break out of the loop, otherwise it would continue to compare values with the value that was now removed (it would keep the value, as I'm not directly modifying that variable). I then return once the iterations are complete.

---

## Implement Bubble Sort

```JavaScript
```

---

## Implement Selection Sort

```JavaScript
```

---

## Implement Insertion Sort

```JavaScript
```

---

## Implement Quick Sort

```JavaScript
```

---

## Implement Merge Sort

```JavaScript
```
