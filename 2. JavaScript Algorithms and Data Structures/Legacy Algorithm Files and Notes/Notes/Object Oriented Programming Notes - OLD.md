# Object Oriented and Functional Programming

<img src="/Images/screenshots/screenshot-oop.png" height="400" alt="Screenshot of JavaScript objects."/>

<em>Completed May 24, 2017</em>

This was a small series of lessons that featured:
- Compact amount of object-oriented programming "philosophy".
- Differences between constructors and objects.
- Many useful array methods.

I learned quite a bit about object-oriented programming previously, before I started learning from freeCodeCamp. Much of this section of lessons was just a refresher for me. View my notes on this section for what I found to be useful.

<img src="/Images/icons/icon-javascript.png" height="48" alt="JavaScript Icon"/>

---

## My notes for these lessons:

<b>Object Oriented and Functional Programming Lessons</b>

1. [Constructor Functions](#constructor-functions)
2. [Useful Array Methods](#useful-array-methods)
	1. [Map()](#map)
	2. [Reduce()](#reduce)
	3. [Filter()](#filter)
	4. [Sort()](#sort)
	5. [Reverse()](#reverse)
	6. [Concat()](#concat)
	7. [Split()](#split)
	8. [Join()](#join)
3. [Examples](#examples)
	1. [Make Object Properties Private](#make-object-properties-private)


### Constructor Functions

A constructor function is given a capitalized name to make it clear that it is a constructor. For example:
```JavaScript
var Car = function() { // Car is capitalized
  this.wheels = 4;
  this.engines = 1;
  this.seats = 5;
}
```

You can create instances of constructors like this:
```JavaScript
var myCar = new Car();
```

You can add parameters to a constructor like this:
```JavaScript
var Car = function(wheels, seats, engines) {
  this.wheels = wheels;
  this.seats = seats;
  this.engines = engines;
};

var myCar = new Car(4, 8, 1); // 4 wheels, 8 seats, 1 engine
```

Objects have their own attributes (called properties) and functions (called methods).
- Objects can have private properties and methods.
	- To do this, declare the variable instead of using the this.property() method.
		- var speed = 10; instead of this.speed = 10;


### Useful Array Methods

#### Map()

The map() method is a way to iterate through arrays:
```JavaScript
var oldArray = [1,2,3,4,5];

var newArray = oldArray.map(function(val){
  return val + 3;
});

//newArray is now set equal to [4,5,6,7,8]
```

---

#### Reduce()

The reduce() method is a way to iterate through an array and condense it into one value:
```JavaScript
var array = [4,5,6,7,8];
var singleVal = 0;

singleVal = array.reduce(function(previousVal, currentVal) {
  return previousVal + currentVal;
});

// singleVal is set equal to 30	
```

---

#### Filter()

The filter() method is used to iterate through an array and filter out elements where a given condition is not true:
```JavaScript
var oldArray = [1,2,3,4,5,6,7,8,9,10];

var newArray = oldArray.filter(function(val) {
  return val < 6;
}); 

//newArray is set equal to [1,2,3,4,5]
```

---

#### Sort()

The sort() method is used to sort the values in an array alphabetically or numerically (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?v=example)

```JavaScript
var array = [1, 12, 21, 2];

array.sort(function(a, b) {
  return b - a; 
}); 

// b-a sorts from largest to smallest ... use a - b for smallest to largest; if no compare (callback) function is passed in it will convert the values to strings and sort alphabetically.
```

---

#### Reverse()

The reverse() method is used to reverse the elements in an array:

```JavaScript
var array = [1,2,3,4,5,6,7];
var newArray = [];

newArray = array.reverse();

// newArray is set equal to [7,6,5,4,3,2,1]
```

---

#### Concat()

The concat() method can be used to merge the contents of two arrays into one:

```JavaScript
var oldArray = [1,2,3];
var newArray = [];

var concatMe = [4,5,6];

newArray = oldArray.concat(concatMe);

// newArray is set equal to [1,2,3,4,5,6]
```

---

#### Split()

The split() method can be used to split a string into an array:

```JavaScript
var string = "Split me into an array";
var array = [];

array = string.split(' '); //splits at every space

// array is set equal to ["Split", "me", "into", "an", "array"]
```

---

#### Join()

The join() method is used to join each element of an array into a string separated by whatever delimiter that is used as an argument:

```JavaScript
var joinMe = ["Split","me","into","an","array"];
var joinedString = '';

joinedString = joinMe.join(' ');

// joinedString is set equal to "Split me into an array"
```


### Examples

Random examples I learned something from:

#### Make Object Properties Private

Private gear property. Two public methods that allow the private gear property to be set.

```JavaScript
var Bike = function() {

  var gear = 1;
  
  this.getGear = function(getGear) {
    getGear = gear;
    return getGear;
  };
  
  this.setGear = function(setGear) {
    gear = setGear;
  };

};

var myBike = new Bike();

myBike.setGear(4); // sets gear to 4
myBike.getGear(); // returns 4
```
