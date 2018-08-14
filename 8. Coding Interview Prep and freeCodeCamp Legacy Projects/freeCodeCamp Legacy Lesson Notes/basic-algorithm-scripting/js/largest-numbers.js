console.log ("Objective: Return an array consisting of the largest number from each provided sub-array. \n");

function largestOfFour(arr) {

	console.log("Original array: 	" + JSON.stringify(arr));

	var newArray = [0];

	for (i = 0; i < arr.length; i++) {

		arr[i].sort(function(a, b) { return b - a; });

		console.log("Current sub-array: 	" + arr[i]);

		newArray[i] = arr[i].shift();

		console.log("Largest number: 	" + newArray[i]);

		//use this if you want to do something with each element in a sub-array
		//for (j = 0; j < arr[i].length; j++) {}
	}

	arr = newArray;

	console.log("Array to return: 	[" + arr + "]\n");

	return arr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]);



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function largestOfFour(arr) {

		var newArray = [0];

		for (i = 0; i < arr.length; i++) {
			arr[i].sort(function(a, b) { return b - a });
			newArray[i] = arr[i].shift();
		}

		arr = newArray;

		return arr;
	}

*/