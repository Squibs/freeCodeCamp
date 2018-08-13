console.log("Objective: Return the lowest index at which a value should be inserted into an array once it has been sorted.\n");

function getIndexToIns(arr, num) {

	console.log("Passed array: 		" + JSON.stringify(arr));
	console.log("Passed number: 		" + num);

	arr.sort(function(a, b) { return a - b; });

	console.log("Sort array: 		" + JSON.stringify(arr));

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] >= num) { 

			console.log("Return i: " + i + "\n");
			return i;
		} 
	}

	console.log("Return length: " + arr.length + "\n");
	return arr.length;
}

getIndexToIns([40, 60], 50); // should return 1
getIndexToIns([10, 20, 30, 40, 50], 35); // should return 3
getIndexToIns([10, 20, 30, 40, 50], 30); // should return 2
getIndexToIns([3, 10, 5], 3); // should return 0
getIndexToIns([5, 3, 20, 3], 5); // should return 2
getIndexToIns([2, 20, 10], 19); // should return 2
getIndexToIns([2, 5, 10], 15); // should return 3



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function getIndexToIns(arr, num) {

		arr.sort(function(a, b) { return a - b });

		for (var i = 0; i < arr.length; i++) {
			if (arr[i] >= num) { return i; } 
		}

		return arr.length;
	}

*/