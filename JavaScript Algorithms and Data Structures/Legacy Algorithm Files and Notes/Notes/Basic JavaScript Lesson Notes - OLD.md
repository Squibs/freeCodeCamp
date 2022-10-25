# Basic Javascript

<img src="/Images/screenshots/screenshot-basic-javascript.png" height="400" alt="Screenshot of some JavaScript source code."/>

<em>Completed May 23, 2017</em>

This was a series of many lessons relating to:
- Arrays and a few methods to retrieve or store from the front or back of the array.
- Regular Expressions.
- Creating random numbers in various ranges with Math.random();
- JSON objects.
- Various further uses out of if-statements and operators.

View the "Random JavaScript examples I learned something from:" at the end of my notes to see various created functions from these lessons that I myself found to be useful or ended up teaching me something of value.

<img src="/Images/icons/icon-javascript.png" height="48" alt="JavaScript Icon"/>

---

## My notes for these lessons:

<b>Basic JavaScript Lessons:</b>

1. [Basic Notes](#basic-notes)
2. [Examples](#examples)
	1. [Stand in Line](#stand-in-line)
	2. [Counting Cards](#counting-cards)
	3. [Returning Boolean Values from Functions](#returning-boolean-values-from-functions)
	4. [Using Objects for Lookups](#using-objects-for-lookups)
	5. [Testing Objects for Properties](#testing-objects-for-properties)
	6. [Manipulating Complex Objects](#manipulating-complex-objects)
	7. [Nesting For Loops](#nesting-for-loops)
	8. [Profile Lookup](#profile-lookup)
	9. [Generate Random Whole Numbers within a Range](#generate-random-whole-numbers-within-a-range)


### Basic Notes

Arrays:
- ```.unshift()``` Add to front of an array.
- ```.push()``` Add to the end of an array.
- ```.shift()``` Removed from the front of an array and store value.
- ```.pop()``` Removed from the end of an array and store value.

Local variables take precedence over global variables.

If statement conditions can be considered boolean conditions.
```	
function ourTrueOrFalse(isItTrue) {
  if (isItTrue) { return "Yes, it's true"; } 
  return "No, it's false";
}
ourTrueOrFalse(true);
```
- The variable ourTrueOrFalse is set to true so when it is passed to the function it will trigger the return for "Yes, it's true".
-If statements just need to be true or false; so running a variable, set to true or false, through an if statment with the argument of just that variable.
	- Will determine the action based on the variable boolean value.

In order for JavaScript to compare two different data types (for example, numbers and strings), it must convert one type to another. Once it does, however, it can compare terms as follows:
```
1 == 1 		// true
1 == 2 		// false
1 == '1' 	// true
"3" == 3	// true
```

The strict equality (===) operator is similar to the equality operator (==) only the strict equality operator also compares the data type of the variables being compared.
```
1 === 1		// true
2 === '2'	// false
```

The logical or operator (||) returns true if either of the oeprands is true, otherwise it returns false.

JavaScript objects are defined like this:

```JavaScript
var myDog = {
  "name": "Squibs",
  "legs": 4,
  "tails": 1,
  "friends": ["Jasmine", "Maus", "Cargo", "Mushi"]
};
```

- Access Object properties with a dot operator, with bracket notation, or with a variable

```
var dogName = myDog.name;
var dogName = myDog["name"];
var dogName = myDog[exampleVariable];
```

- Update Object properties in a similar way:

```
myDog.name = "Max"; //"Squibs" changed to "Max"
myDog["name"] = "Max";
myDog.name = "Happy " + myDog.name; //"Squibs" to "Happy Squibs"
```

- Manipulate Objects in similar ways:

```
myDog.bark = "BARRRRRRRRRRRRRRRRRRRRRRRR"; //Adds bark property to myDog object
delete myDog.bark; //Removes the "bark" property
```

JSON:
```
var ourStorage = {
  "desk": {
    "drawer": "stapler"
  },
  "cabinet": {
    "top drawer": { 
      "folder1": "a file",
      "folder2": "secrets"
    },
    "bottom drawer": "soda"
  }
};
ourStorage.cabinet["top drawer"].folder2;  // "secrets"
ourStorage.desk.drawer; // "stapler"
var folder1Contents = ourStorage.cabinet["top drawer"].folder1; // folder1Contents is set to "a file"
```
	- This is how to access various parts of a complex object.

Use ```Math.random();``` to create a random decimal between 0 and 1.
- ```return Math.floor(Math.random() * 10); // returns a number between 0 and 9```

Regular Expressons (regex)
- For example, if we wanted to find the word "the" in the string "The dog chased the cat", we could use the following reguar expression: ```/the/gi```.
	- List of Selectors:
		- ```/``` Start and end of the regular expression.
		- ```g``` Means global, which will return all matches in the string and not just the first one
		- ```i``` Means that we want to ignroe the casing of letters when searching.
		- ```\d``` Retrieves one digit (e.g.) numbers 0 to 9 in a string
			- ```/\d/g``` Retrieves one digit in a string
		- ```+``` Allows for matches of one or more digits.
			- ```/\d+/g``` Retrieves one or more digits in a string.

```
// Setup
var testString = "There are 3 cats but 4 dogs.";

var expression = /\d+/g;  

var digitCount = testString.match(expression).length; // digitCount is set to 2; as there were two matches	
```
		- ```\s``` Use to find whitespace in a string
			- Whitespace characters are ```" "``` (space), ```\r``` (carriage return), ```\n``` (newline), ```\t``` (tab), and ```\f``` (form feed).
- Invert any match by using the uppercase version of the regular expression selector.
	- For example ```\s``` will match any whitespace while ```\S``` will match anything that isn't whitespace.
```
var testString = "How many non-space characters are there in this sentence?";

var expression = /\S/g;  // Change this line

var nonSpaceCount = testString.match(expression).length; // nonSpaceCount will be set to 49
```


### Examples

Random examples I learned something from:

#### Stand in Line
Function takes two arguments, an array and a number. Puts the number at the end of the array and removes the first element of the array and returns that value

```JavaScript
function nextInLine(arr, item) {
  // Your code here
  arr.push(item);
  item = arr.shift();
  return item;  // Change this line
}

// Test Setup
var testArr = [1,2,3,4,5];

// Display Code
console.log("Before: " + JSON.stringify(testArr));
console.log(nextInLine(testArr, 6)); // Modify this line to test
console.log("After: " + JSON.stringify(testArr));
```

#### Counting Cards
A mini-challenge within the basic javascript lessions. Create a function that will state whether or not to hold or bet after a sequence of cards.

```Javascript
var count = 0;

function cc(card) {
  // Only change code below this line
  
  var s = " ";
  
  if (card >= 2 && card <= 6) {
    count++;
  } else if (card >= 7 && card <= 9) {
    count = count;
  } else {
    count--;
  }
  
  if (count >= 1) {
    return count + s + "Bet";
  } else if ( count <= -1) {
    return count + s + "Hold";
  } else {
    return count + s + "Hold";
  }
  
  // Only change code above this line
}

// Add/remove calls to test your function.
// Note: Only the last will display
cc(2); cc(3); cc(7); cc('K'); cc('A');
```

#### Returning Boolean Values from Functions
These functions (top compared to bottom) test for and return the same values. Returns either true or false.

```JavaScript
function isEqual(a,b) {							function isLess(a,b) {
	if (a === b) {									if (a < b) {
		return true;									return true;
	} else {										} else {
		return false;									return false;
	}												}
}												}

function isEqual(a,b) {							function is less(a,b) {
	return a === b;									return a < b;
}												}
```

#### Using Objects for Lookups
You can use Objects as way to lookup values rather than using a switch statement or an if/else chain.

```JavaScript
// Setup
function phoneticLookup(val) {
  var result = "";

  // Only change code below this line
  
  var lookup = {
    "alpha": "Adams",
    "bravo": "Boston",
    "charlie": "Chicago",
    "delta": "Denver",
    "echo": "Easy",
    "foxtrot": "Frank"
  };
  
  result = lookup[val];

  // Only change code above this line
  return result;
}

// Change this value to test
phoneticLookup("charlie");
```

#### Testing Objects for Properties
Using a function to test if an object has a property and returning the value of that property if it exists within the object.

```JavaScript
// Setup
var myObj = {
  gift: "pony",
  pet: "kitten",
  bed: "sleigh"
};

function checkObj(checkProp) {
  // Your Code Here
  
  if (myObj.hasOwnProperty(checkProp)) {
    return myObj[checkProp];
  }
  return "Not Found";
}

// Test your code by modifying these values
checkObj("gift");
```

#### Manipulating Complex Objects
A complex object is created like this in JSON.

```JavaScript
var myMusic = [
  {
    "artist": "Billy Joel",
    "title": "Piano Man",
    "release_year": 1973,
    "formats": [ 
      "CS", 
      "8T", 
      "LP" ],
    "gold": true
  },
  // Add record here
  {
    "artist": "The Constructus Corporation",
    "title": "The Ziggurat",
    "release_year": 2002,
    "formats": ["CD", "LP", "download"],
    "gold": false
  }
];
```


#### Nesting For Loops
You can use nested For loops to loop through an array and any sub-arrays.

```JavaScript
function multiplyAll(arr) {
  var product = 1;
  // Only change code below this line
  
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr[i].length; j++) {
      console.log(arr[i][j]);
      product *= arr[i][j];
    }
  }
  
  // Only change code above this line
  return product;
}

// Modify values below to test your code
multiplyAll([[1,2],[3,4],[5,6,7]]);
```


#### Profile Lookup
Send a name as well as a property through a function. The property is returned if the name and the property exist in the complex object.

```JavaScript
//Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["Javascript", "Gaming", "Foxes"]
    }
];


function lookUpProfile(firstName, prop){
// Only change code below this line

  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].firstName == firstName) {
      output = contacts[i].firstName;
      
      if (contacts[i][prop]) {
        return contacts[i][prop];     
      } else {
        return "No such property";
      }
    } 
  }
  
  return "No such contact";

  
// Only change code above this line
}

// Change these values to test your function
lookUpProfile("Sherlock", "likes"); //returns ["Intriguing Cases","Violin"]
```

#### Generate Random Whole Numbers within a Range
A way to generate a random number within a given range.

```JavaScript
// Example
function ourRandomRange(ourMin, ourMax) {

  return Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin;
}

ourRandomRange(1, 9);

// Only change code below this line.

function randomRange(myMin, myMax) {

  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin; // Change this line

}

// Change these values to test your function
var myRandom = randomRange(5, 15);
```
