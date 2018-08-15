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

[(symmetric-difference.js)]()

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

[(inventory-update.js)]()

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

[(no-repeats-please.js)]()

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

[(pairwise.js)]()

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
