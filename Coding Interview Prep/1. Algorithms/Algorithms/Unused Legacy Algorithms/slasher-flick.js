console.log("Objective: Return the remaining elements of an array after chopping off n elements from the head.\n");

function slasher(arr, howMany) {

	console.log("Passed array: 		" + JSON.stringify(arr));
	console.log("Passed number: 		" + howMany);

	arr.splice(0, howMany);

	console.log("Array to return: 	" + JSON.stringify(arr) + "\n");
	return arr;
}

slasher([1, 2, 3], 2); // should return [3]
slasher([1, 2, 3], 0); // should return [1, 2, 3]
slasher([1, 2, 3], 9); // should return []
slasher(["burgers", "fries", "shake"], 1); // should return ["fries", "shake"]
slasher([1, 2, "chicken", 3, "potatoes", "cheese", 4], 5); // should return ["cheese", 4]



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function slasher(arr, howMany) {
		var arrRemoved = [];
		arrRemoved = arr.splice(0, howMany);

		return arr;
	}

*/