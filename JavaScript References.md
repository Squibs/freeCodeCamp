# JavaScript References

I created this as I liked the reference pages that [W3Schools](https://www.w3schools.com/) (W3S) has setup, however I also liked how the [Mozilla Developer Network](https://developer.mozilla.org/en-US/) (MDN) separated the properties and methods. W3S also had a few missing methods that I would not use due to the list not having the method listed. So I created this list which combines the two.

<strong>I created this for personal use only.</strong> If you stumble upon this feel free to use this. Just know it's only a collection of references and links to more information. Some information might be outdated or missing from this list.

![beaker] <em>If this icon is in the <strong>ECMAScript</strong> column, the feature is currently experimental and probably shouln't be used.</em>

## Table of Contents

<!-- TOC -->

- [JavaScript References](#javascript-references)
	- [Table of Contents](#table-of-contents)
	- [Array Object](#array-object)
		- [Array Object Properties](#array-object-properties)
		- [Array Object Methods](#array-object-methods)
		- [Array Instance Methods](#array-instance-methods)
			- [Mutator Methods](#mutator-methods)
			- [Accessor Methods](#accessor-methods)
			- [Iteration methods](#iteration-methods)
	- [String Object](#string-object)
		- [String Object Properties](#string-object-properties)
		- [String Object Methods](#string-object-methods)
		- [String Instance Methods](#string-instance-methods)
	- [Regular Expression Reference](#regular-expression-reference)

<!-- /TOC -->

---

## Array Object

The Array object is used to store multiple values in a single variable:

```JavaScript
const cars = ["Saab", "Volvo", "BMW"];
```

Array indexes are zero-based: The first element in the array is 0, the second is 1, and so on.

For a tutorial about Arrays, read our [JavaScript Array Tutorial](https://www.w3schools.com/js/js_arrays.asp).

### Array Object Properties

|Property|Description|Links|
|--------|-----------|-----|
|`Array.constructor`|Returns the function that created the Array object's prototype.|[W3S](https://www.w3schools.com/jsref/jsref_constructor_array.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@species)|
|`Array.length`|Sets or returns the number of elements in an array|[W3S](https://www.w3schools.com/jsref/jsref_length_array.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)|
|`Array.prototype`|Allows you to add properties and methods to an Array object|[W3S](https://www.w3schools.com/jsref/jsref_prototype_array.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype)|

### Array Object Methods

|Property|Description|ECMAScript|Links|
|--------|-----------|:--------:|-----|
|`Array.from()`|Creates a new Array instance from an array-like or iterable object.|ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)|
|`Array.isArray()`|Returns true if a variable is an array, if not false.|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_isarray.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)|
|`Array.of()`|Creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.|ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)|

### Array Instance Methods

#### Mutator Methods
These methods modify the array.

|Method|Description|ECMAScript|Links|
|------|-----------|:--------:|-----|
|`copyWithin()`|Copies array elements within the array, to and from specified positions|ES6|[W3S](https://www.w3schools.com/jsref/jsref_copywithin.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)|
|`fill()`|Fill the elements in an array with a static value|ES6|[W3S](https://www.w3schools.com/jsref/jsref_fill.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)|
|`pop()`|Removes the last element of an array, and returns that element|ES3|[W3S](https://www.w3schools.com/jsref/jsref_pop.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)|
|`push()`|Adds new elements to the end of an array, and returns the new length|ES3|[W3S](https://www.w3schools.com/jsref/jsref_push.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)|
|`reverse()`|Reverses the order of the elements in an array|ES1|[W3S](https://www.w3schools.com/jsref/jsref_reverse.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)|
|`shift()`|Removes the first element of an array, and returns that element|ES3|[W3S](https://www.w3schools.com/jsref/jsref_shift.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)|
|`sort()`|Sorts the elements of an array|ES1|[W3S](https://www.w3schools.com/jsref/jsref_sort.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)|
|`splice()`|Adds/Removes elements from an array|ES3|[W3S](https://www.w3schools.com/jsref/jsref_splice.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)|
|`unshift()`|Adds new elements to the beginning of an array, and returns the new length|ES3|[W3S](https://www.w3schools.com/jsref/jsref_unshift.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)|

#### Accessor Methods
These methods do not modify the array and return some representation of the array.

|Method|Description|ECMAScript|Links|
|------|-----------|:--------:|-----|
|`concat()`|Joins two or more arrays, and returns a copy of the joined arrays.|ES3|[W3S](https://www.w3schools.com/jsref/jsref_concat_array.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)|
|`includes()`|Determines whether an array contains a certain element, returning true or false as appropriate.|![beaker] ES7|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)|
|`indexOf()`|Search the array for an element and returns its position|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_indexof_array.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)|
|`join()`|Joins all elements of an array into a string|ES1|[W3S](https://www.w3schools.com/jsref/jsref_join.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)|
|`lastIndexOf()`|Search the array for an element, starting at the end, and returns its position|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_lastindexof_array.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)|
|`slice()`|Selects a part of an array, and returns the new array|ES3|[W3S](https://www.w3schools.com/jsref/jsref_slice_array.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)|
|`toString()`|Converts an array to a string, and returns the result|ES1|[W3S](https://www.w3schools.com/jsref/jsref_tostring_array.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)|

#### Iteration methods

Several methods take as arguments functions to be called back while processing the array. When these methods are called, the length of the array is sampled, and any element added beyond this length from within the callback is not visited. Other changes to the array (setting the value of or deleting an element) may affect the results of the operation if the method visits the changed element afterwards. While the specific behavior of these methods in such cases is well-defined, you should not rely upon it so as not to confuse others who might read your code. If you must mutate the array, copy into a new array instead.

|Method|Description|ECMAScript|Links|
|------|-----------|:--------:|-----|
|`entries()`|Returns a new Array Iterator object that contains the key/value pairs for each index in the array.|ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)|
|`every()`|Checks if every element in an array pass a test|E5.1|[W3S](https://www.w3schools.com/jsref/jsref_every.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)|
|`filter()`|Creates a new array with every element in an array that pass a test|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_filter.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)|
|`find()`|Returns the value of the first element in an array that pass a test|ES6|[W3S](https://www.w3schools.com/jsref/jsref_find.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)|
|`findIndex()`|Returns the index of the first element in an array that pass a test|ES6|[W3S](https://www.w3schools.com/jsref/jsref_findindex.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)|
|`forEach()`|Calls a function for each array element|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_forEach.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)|
|`keys()`|Returns a new Array Iterator that contains the keys for each index in the array.|ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)|
|`map()`|Creates a new array with the result of calling a function for each array element|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_map.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)|
|`reduce()`|Reduce the values of an array to a single value (going left-to-right)|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_reduce.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)|
|`reduceRight()`|Reduce the values of an array to a single value (going right-to-left)|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_reduceright.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)|
|`some()`|Checks if any of the elements in an array pass a test|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_some.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)|
|`values()`|Returns a new Array Iterator object that contains the values for each index in the array.|ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)|

---

## String Object

A JavaScript string stores a series of characters like "John Doe".

A string can be any text inside double or single quotes:

```JavaScript
const carname = 'Volvo XC60';
const carname = "Volvo XC60";
```

String indexes are zero-based: The first character is in position 0, the second in 1, and so on.

For a tutorial about Strings, read our [JavaScript String Tutorial](https://www.w3schools.com/js/js_strings.asp).

### String Object Properties

|Property|Description|Links|
|--------|-----------|------|
|`String.constructor`|Returns the string's constructor function|[W3S](https://www.w3schools.com/jsref/jsref_constructor_string.asp)|
|`String.length`|Returns the length of a string|[W3S](https://www.w3schools.com/jsref/jsref_length_string.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)|
|`String.prototype`|Allows you to add properties and methods to an object|[W3S](https://www.w3schools.com/jsref/jsref_prototype_string.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype)|

### String Object Methods

|Method|Description|ECMAScript|Links|
|------|-----------|:--------:|-----|
|`String.fromCharCode()`|Returns a string created by using the specified sequence of Unicode values.|ES1|[W3S](https://www.w3schools.com/jsref/jsref_fromcharcode.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)|
|`String.fromCodePoint()`|Returns a string created by using the specified sequence of code points.|![beaker] ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)|
|`String.raw()`|Returns a string created from a raw template string.|![beaker] ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw)|

### String Instance Methods
|Method|Description|ECMAScript|Links|
|------|-----------|:--------:|-----|
|`charAt()`|Returns the character at the specified index (position)|ES1|[W3S](https://www.w3schools.com/jsref/jsref_charat.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)|
|`charCodeAt()`|Returns the Unicode of the character at the specified index|ES1|[W3S](https://www.w3schools.com/jsref/jsref_charcodeat.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)|
|`codePointAt()`|Returns a non-negative integer that is the UTF-16 encoded code point value at the given position.|ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)|
|`concat()`|Joins two or more strings, and returns a new joined strings|ES3|[W3S](https://www.w3schools.com/jsref/jsref_concat_string.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat)|
|`endsWith()`|Checks whether a string ends with specified string/characters|ES6|[W3S](https://www.w3schools.com/jsref/jsref_endswith.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)|
|`includes()`|Checks whether a string contains the specified string/characters|ES6|[W3S](https://www.w3schools.com/jsref/jsref_includes.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)|
|`indexOf()`|Returns the position of the first found occurrence of a specified value in a string|ES1|[W3S](https://www.w3schools.com/jsref/jsref_indexof.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)|
|`lastIndexOf()`|Returns the position of the last found occurrence of a specified value in a string|ES1|[W3S](https://www.w3schools.com/jsref/jsref_lastindexof.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)|
|`localeCompare()`|Compares two strings in the current locale|ES3|[W3S](https://www.w3schools.com/jsref/jsref_localecompare.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)|
|`match()`|Searches a string for a match against a regular expression, and returns the matches|ES3|[W3S](https://www.w3schools.com/jsref/jsref_match.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)|
|`normalize()`|Returns the Unicode Normalization Form of the calling string value.|ES6|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)|
|`padEnd()`|Pads the current string from the end with a given string to create a new string from a given length.|![beaker] ES7|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)|
|`padStart()`|Pads the current string from the start with a given string to create a new string from a given length.|![beaker] ES7|[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)|
|`repeat()`|Returns a new string with a specified number of copies of an existing string|ES6|[W3S](https://www.w3schools.com/jsref/jsref_repeat.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)|
|`replace()`|Searches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced|ES3|[W3S](https://www.w3schools.com/jsref/jsref_replace.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)|
|`search()`|Searches a string for a specified value, or regular expression, and returns the position of the match|ES3|[W3S](https://www.w3schools.com/jsref/jsref_search.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search)|
|`slice()`|Extracts a part of a string and returns a new string|ES3|[W3S](https://www.w3schools.com/jsref/jsref_slice_string.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)|
|`split()`|Splits a string into an array of substrings|ES3|[W3S](https://www.w3schools.com/jsref/jsref_split.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)|
|`startsWith()`|Checks whether a string begins with specified characters|ES6|[W3S](https://www.w3schools.com/jsref/jsref_startswith.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)|
|`substr()`|Extracts the characters from a string, beginning at a specified start position, and through the specified number of character|ES3|[W3S](https://www.w3schools.com/jsref/jsref_substr.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)|
|`substring()`|Extracts the characters from a string, between two specified indices|ES1|[W3S](https://www.w3schools.com/jsref/jsref_substring.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)|
|`toLocaleLowerCase()`|Converts a string to lowercase letters, according to the host's locale|ES3|[W3S](https://www.w3schools.com/jsref/jsref_tolocalelowercase.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase)|
|`toLocaleLUpperCase()`|Converts a string to uppercase letters, according to the host's locale|ES3|[W3S](https://www.w3schools.com/jsref/jsref_tolocaleuppercase.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase)|
|`toLowerCase()`|Converts a string to lowercase letters|ES1|[W3S](https://www.w3schools.com/jsref/jsref_tolowercase.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)|
|`toString()`|Returns the value of a String object|ES3|[W3S](https://www.w3schools.com/jsref/jsref_tostring_string.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toString)|
|`toUpperCase()`|Converts a string to uppercase letters|ES1|[W3S](https://www.w3schools.com/jsref/jsref_touppercase.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)|
|`trim()`|Removes whitespace from both ends of a string|ES5.1|[W3S](https://www.w3schools.com/jsref/jsref_trim_string.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)|
|`valueOf()`|Returns the primitive value of a String object|ES1|[W3S](https://www.w3schools.com/jsref/jsref_valueof_string.asp) \ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/valueOf)|

---
|`()`||ES|[W3S]() \ [MDN]()|
## Regular Expression Reference

[beaker]: http://res.cloudinary.com/squibs/image/upload/c_scale,w_15/v1499917997/beaker_gjjg7f.png "Experimental Feature"