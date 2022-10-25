console.log("Objective: Check if a string ends with the given target string. \n");

function confirmEnding(str, target) {

	console.log("Original string: 	" + str);
	console.log("Original target: 	" + target);
	console.log("String length: 		" + str.length);
	console.log("String substring: 	" + (str.substring(str.length - target.length)));

	if (str.substring(str.length - target.length) === target) {
		console.log("True \n");
		return true;
	}

	console.log("False \n");
	return false;
}

confirmEnding("Bastian", "n"); //should return true
confirmEnding("Connor", "n"); // true
confirmEnding("Walking on water and developing software from a specification are easy if both are frozen", "specification"); // false
confirmEnding("He has to give me a new name", "name"); // true
confirmEnding("Open sesame", "same"); // true
confirmEnding("Open sesame", "pen"); // false
confirmEnding("If you want to save our world, you must hurry. We dont know how much longer we can withstand the nothing", "mountain"); // false



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function confirmEnding(str, target) {
		if (str.substring(str.length - target.length) === target) { return true; }
		return false;
	}

*/