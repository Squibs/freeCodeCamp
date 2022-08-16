# Basic Algorithm Scripting

<img src="/Images/screenshots/screenshot-basic-algorithms.png" height="400" alt="Screenshot of algorithms"/>

<em>Completed May 27, 2017</em>

This was a series of challenges in which I had to create basic functions (algorithms) to convert passed information to the function into the correct result. The challenge of this series of lessons was to figure out my own way through each algorithm and achieve the correct result, while also trying not to stumble upon a solution and ruin the learning experience. I was able to do this for most of it, with a couple mistakes of reading too far and ruining the solution for myself. I would say any of the solutions I finished with can be optimized much further or made simpler; I however, am happy with what I have done with each of these algorithms and look forward to learning how I could have optimized them in the future.

<img src="/Images/icons/icon-javascript.png" height="48" alt="JavaScript Icon"/>

---

## My notes for these algorithms:

<b>Basic Algorithms</b>

1. [General Notes](#general-notes)
2. [Reverse a String](#reverse-a-string)
3. [Factorialize a Number](#factorialize-a-number)
4. [Check for Palindromes](#check-for-palindromes)
5. [Find the Longest Word in a String](#find-the-longest-word-in-a-string)
6. [Title Case a Sentence](#title-case-a-sentence)
7. [Return Largest Numbers in Arrays](#return-largest-numbers-in-arrays)
8. [Confirm the Ending](#confirm-the-ending)
9. [Repeat a String Repeat a String](#repeat-a-string-repeat-a-string)
10. [Truncate a String](#truncate-a-string)
11. [Chunky Monkey](#chunky-monkey)
12. [Slasher Flick](#slasher-flick)
13. [Mutations](#mutations)
14. [Falsy Bouncer](#falsy-bouncer)
15. [Seek and Destroy](#seek-and-destroy)
16. [Where do I Belong](#where-do-i-belong)
17. [Caesars Cipher](#caesars-cipher)


### General Notes
To start off, I created these algorithms based on how I thought this would be accomplished at the time. I new going into each and every one of these that there would almost always be a way better solution than what I could come up with. These are just the solutions that I came up with using what I have learned in previous freeCodeCamp lessons and what I stumbled across while looking up exactly how several functions/methods worked.

IMPORTANT methods to use for any of these algorithms would be the [string methods](https://www.w3schools.com/js/js_string_methods.asp) and the [array methods](https://www.w3schools.com/js/js_array_methods.asp).

I know any of these algorithms can be optimized, over the solutions I created. Perhaps even all of them can be as simple as one or two lines. You can view my comments and non-condensed versions of all of these algorithm solutions I came up within their files above.

---

### Reverse a String
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function reverseString(str) {
  str = str.split('');
  str = str.reverse();
  str = str.join('');
  return str;
}
```

[(reverse-a-string.js)](./../Basic%20Algorithm%20Scripting/reverse-a-string-old.js#L1)

I saw two ways of handling this challenge. Either use the array methods I learned just moments before starting these challenges, or using for/while loops to go through each string and retrieve characters and put them back together. In my mind everything seemed it would be much simpler. In summary I took the string, split it into an array by each character, reversed the array, and put the array back into a string using the array methods taught in the object oriented and functional programming lessons. (split(), reverse(), join())

---

### Factorialize a Number
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function factorialize(num) {

  if (num > 0){
    for (i = num - 1; i > 1; i--) {
      num *= i;
    }

    return num;

  } else {
    return num + 1;
  }
}
```
[(factorialize-a-number.js)](./../Basic%20Algorithm%20Scripting/factorialize-a-number-old.js#L1)

The only method of solving this one that I could think of was to use an if statement with a nested for loop. The number would only go through the loop if it was greater than 0. Otherwise it would just add 1 to the argument and return it. I'm not sure if negative numbers can be factorialized or not, and there were no examples or tests that included negative numbers so I saw this as an appropriate way to solve this challenge.

---

### Check for Palindromes
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function palindrome(str) {

  str = str.toLowerCase().replace(/\s|[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, '');

  for (i = 0; i < str.length; i++) {
    if (str[i] == str[str.length - 1 - i]) {} else { return false; }
  }

  return true;
}
```
[(check-for-palindromes.js)](./JavaScript%20Algorithms%20and%20Data%20Structures%20Projects/check-for-palindromes-old.js#L1)

At first I felt the need to convert the passed string to an array. But I quickly found myself making things to complicated going down that route. I restarted and tried just modifying the passed string itself and comparing characters with bracket notation. This ended up being my solution. Convert the string to all lowercase and remove any symbols or whitespace with regex. Use a for loop to iterate through the string based on the length of the string. I used bracket notation to select the current character and the length of the string minus one and minus the loop control (i) to select characters from the end of the string to compare to the front of the string.

---

### Find the Longest Word in a String
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function findLongestWord(str) {

  var myArray = [];
  var arrayControl = 0;
  var lengthControl = 0;

  for (i = 0; i < str.length; i++) {

    if (str[i] == " ") {
      arrayControl++;
      lengthControl = 0;
    } else {
      lengthControl++;
      myArray[arrayControl] = lengthControl;
    }
  }

  myArray.sort(function(a, b) {
    return a - b;
  });

  return myArray.pop();
}

```
[(longest-word.js)](./../Basic%20Algorithm%20Scripting/longest-word-old.js#L1)

I was able to use what I was trying to do in the Check for Palindromes challenge, so this challenge did not take me very long at all. I used the same loop to step through each character in the string and compare that character to a regex for whitespace. If there was whitespace it would increase my arrayControl variable by one, which controls which element of the array I am currently going to replace, and reset a character count variable. If the character was not equal to a whitespace I would increase a character count variable and set the current array element equal to it. In the end this would create an array of numbers each number representing the length of each word in the argument string. From here the array would be sorted lowest to highest with the sort() method. I would then use the array .pop() method to return the length of the largest word in the string.

---

### Title Case a Sentence
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function titleCase(str) {

  str = str.toLowerCase();

  str = str.charAt(0).toUpperCase() + str.slice(1);

  for (i = 0; i < str.length; i++) {
    if (str[i] == " ") {
      str = str.slice(0, i + 1) + str.charAt(i + 1).toUpperCase() + str.slice(i + 2, str.length);
    }
  }

  return str;
}

```
[(title-case-sentence.js)](./../Basic%20Algorithm%20Scripting/title-case-sentence-old.js#L1)

For this algorithm I decided to use what I had made for finding the longest word. Which was main just looping through the string and finding any whitespace. I then would use the splice() and toUpperCase() to update the string with each loop capitalizing the first char after a whitespace. When nearly complete I found a way to do this same using regex (regex word boundary something like: /\s\b/) and the replace method. This may be a more simplified way to do the same thing that I did for this algorithm.

---

### Return Largest Numbers in Arrays
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function largestOfFour(arr) {

  var newArray = [0];

  for (i = 0; i < arr.length; i++) {
    arr[i].sort(function(a, b) { return b - a });
    newArray[i] = arr[i].shift();
  }

  arr = newArray;

  return arr;
}
```
[(largest-numbers.js)](./../Basic%20Algorithm%20Scripting/largest-numbers-old.js#L1)

Immediately I thought to use the sort() method taught in the lessons before these algorithms. Use a for loop to loop through each sub-array and use sort() to sort from largest to smallest. Then I used shift() to remove the first number (the largest) and store that into a new array. When the for loop is done the new array with the largest numbers is complete and that is returned. I wonder if the map() method could have been used here.

---

### Confirm the Ending
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function confirmEnding(str, target) {
  if (str.substring(str.length - target.length) === target) { return true; }
  return false;
}
```
[(confirm-ending.js)](./../Basic%20Algorithm%20Scripting/confirm-ending-old.js#L1)

freeCodeCamp states this can be solved with the .endsWith() method, but they would like if we found a solution using the substring methods instead. This one was very easy, especially since freeCodeCamp gave a specific method that should be used to accomplish this algorithm. Basically I just checked the end of the string based off the length of the passed target with the substring() method. If the target string and the end of the string to be checked were equal to each other then return true, otherwise return false.

---

### Repeat a String Repeat a String
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function repeatStringNumTimes(str, num) {

  if (num < 0) {
    str = "";
    return str;
  }

  var repeat = str;

  while (num > 1) {
    str = str.concat(repeat);
    num--;
  }

  return str;
}
```
[(repeat-string.js)](./../Basic%20Algorithm%20Scripting/repeat-string-old.js#L1)

I used the concat method to solve this algorithm. I stored the original string in a new variable and used a for loop to loop the passed amount of times concacting the now stored string in the new variable onto the passed string. Before this is a check if the passed num is greater than 0, if it is return an empty string.

---

### Truncate a String
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function truncateString(str, num) {

  var toggle = false;

  if (num > 3 && num < str.length - 3) {
    num -= 3;
  } else if (num >= str.length - 3 && str.length - 3 > 0) {
    toggle = true;
  }

  str = str.slice(0, num);

  if (toggle === false) {
    str = str.concat("...");
  }

  return str;
}
```
[(truncate-string.js)](./../Basic%20Algorithm%20Scripting/truncate-string-old.js#L1)

This is the first algorithm that I felt the need to use a toggle due to the many conditions that were given for whether or not to add "..." to the truncated string. I checked whether or not the passed num was greater than three and whether or not the string length minus three (for the "...") were true or false and acted accordingly. Then I needed to use a toggle alongside this for very-short, 1-letter strings that may have been passed, which would help control whether or not to concat ("...") onto the end of the truncated string to be returned. I feel I accomplished this algorithm fairly poorly, however it still works.

---

### Chunky Monkey
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function chunkArrayInGroups(arr, size) {

  var tempArray = [];

  for (i = 0; i < arr.length; i += size) {
    tempArray.push(arr.slice(i, i + size));
  }

  return tempArray;
}
```
[(chunky-monkey.js)](./../Basic%20Algorithm%20Scripting/chunkey-monkey-old.js#L1)

This one was probably the hardest yet for me. I believe the main issue I had was thinking that the slice() method would always remove the specified potion off of the array no matter what. Once I figured out that this is not the case, unless you set the array equal to itself with the slice, then I was able to solve this algorithm. I needed a temporary array inside this function in order to accomplish the objective. I looped through the passed array in increments related to the passed size. Then I pushed the passed array onto the temp array and used the slice method on the passed array in relation to the loop number and the size that was passed. This created the array that was need to be returned.

---

### Slasher Flick
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function slasher(arr, howMany) {
  var arrRemoved = [];
  arrRemoved = arr.splice(0, howMany);

  return arr;
}
```
[(slasher-flick.js)](/7.%20Coding%20Interview%20Prep%20and%20freeCodeCamp%20Legacy%20Projects/1.%20Algorithms/Algorithms/Unused%20Legacy%20Algorithms/slasher-flick.js#L1)

This one was very simple. You can just use the splice method to remove the passed amount and return the array.

---

### Mutations
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function mutation(arr) {

  for (i = 0; i < arr[1].length; i++) {
    if (arr[0].toLowerCase().indexOf(arr[1].toLowerCase()[i]) == -1) {
      return false;
    }
  }

  return true;
}
```
[(mutations.js)](./../Basic%20Algorithm%20Scripting/mutations-old.js#L1)

The tricky part of this one was figuring out where I was able to use the toLowerCase() method. Being able to put it in-between an array element selection was useful (arr[1].tolowercase[i]). I created a loop to iterate through the array and compare the first element in the array to each character in the second element in the array. If any of the comparisons returned -1, then I returned false, otherwise I returned true.

---

### Falsy Bouncer
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function bouncer(arr) {
  return arr.filter(Boolean);
}
```
[(falsy-bouncer.js)](./../Basic%20Algorithm%20Scripting/falsy-bouncer-old.js#L1)

Unfortunately I stumbled across the solution for this while looking up an easier way to filter boolean values rather than comparing against each falsy value separately. I learned that the Boolean constructor can be used as a function for this case exactly and will remove an anything that can be considered falsy when used with the filter method. I learned that you can achieve the same in the same line as the return, cutting out the need for two lines of code for this solution turning it into one line.

---

### Seek and Destroy
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function destroyer(arr) {

  var otherArguments = [].slice.call(arguments);

  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < otherArguments.length; j++) {
      if (arr[i] === otherArguments[j]) {
        delete arr[i];
      }
    }
  }

  return arr.filter(Boolean);
}
```

[(seek-and-destroy.js)](./../Intermediate%20Algorithm%20Scripting/seek-and-destroy-old.js#L1)

This one was interesting due to the function calls passing more arguments than the function has declared to accept. The only reason I was able to solve this one was due to freeCodeCamp explicitly listing a page to the Arguments object, which has an example for this exact situation. I assigned the additional arguments to a variable and used a for loop to iterate through the passed arguments, which is just a single array with no nested array and compared it to the now stored corrected arguments and deleted the current element if they were equal to each other. This would effectively ignore the now nested array in the new arguments variable as the passed arr technically does not have a nested array.

---

### Where do I Belong
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function getIndexToIns(arr, num) {

  arr.sort(function(a, b) { return a - b });

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] >= num) { return i; } 
  }

  return arr.length;
}
```
[(where-do-i-belong.js)](./../Basic%20Algorithm%20Scripting/where-do-i-belong-old.js#L1)

This is a point where I have realized all my previous for loops, I never declared the i variable, and should from now on. This algorithm wasn't terribly hard; again it can probably be optimized in ways I'm just not capable of thinking of quite yet. I sorted the function from lowest to highest, used a for loop to iterate through the passed array and compared each value in the array to the passed number. If the array value was greater than the passed number I would return i, which would be the array index; otherwise I would return the length of the array, which would result in the last index value of the array being returned.

---

### Caesars Cipher
```JavaScript
// CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS
function rot13(str) { 

  var decodedStr = "";

  for (var i = 0; i < str.length; i++) {

    var letterPos = str.charCodeAt(i) - 64;

    if (letterPos > 13 && letterPos <= 26) {
      decodedStr += String.fromCharCode(str.charCodeAt(i) - 13);
    } else if (letterPos <= 13 && letterPos > 0) {
      decodedStr += String.fromCharCode(str.charCodeAt(i) + 13);
    } else {
      decodedStr += String.fromCharCode(str.charCodeAt(i));
    }
  }

  return decodedStr;
}
```
[(caesars-cipher.js)](./JavaScript%20Algorithms%20and%20Data%20Structures%20Projects/caesars-cipher-old.js#L1)

This was the last algorithm challenge. This one involved using charCodeAt and fromCharCode in order to solve. I created a variable to store the decipher, used a loop to iterate through the passed string and checked if the current characters charcode was greater than 78 (13th letter in alphabet) or not. If it was greater than 78 I subtracted 13 from the characters charcode and added it to the decipher string. If it was less than 78 I added 13 to the charcode and did the same. If the charcode was above 90 or less than 65 I left the charcode alone and added it to the decipher string. 
