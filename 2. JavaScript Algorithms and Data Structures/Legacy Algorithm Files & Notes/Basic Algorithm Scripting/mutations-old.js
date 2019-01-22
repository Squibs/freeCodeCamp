console.log ("Objective: Return true if the string in the first element of the array contains all the letters of second string.\n");

function mutation(arr) {

console.log("First string: 	\"" + arr[0] + "\"");
console.log("Second string: 	\"" + arr[1] + "\"");

	for (i = 0; i < arr[1].length; i++) {
		if (arr[0].toLowerCase().indexOf(arr[1].toLowerCase()[i]) == -1) {

			console.log("Return 			false\n");
			return false;
		}
	}

	console.log("Return:  		true\n");
	return true;
}

mutation(["Hello", "hey"]); // should return false
mutation(["hello", "Hello"]); // true
mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]); // true
mutation(["Mary", "Army"]); // true
mutation(["Mary", "Aarmy"]); // true
mutation(["Alien", "line"]); // true
mutation(["floor", "for"]); // true
mutation(["hello", "neo"]); // false
mutation(["voodoo", "no"]); // false



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function mutation(arr) {

		for (i = 0; i < arr[1].length; i++) {
			if (arr[0].toLowerCase().indexOf(arr[1].toLowerCase()[i]) == -1) {
				return false;
			}
		}

		return true;
	}

*/