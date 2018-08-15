console.log("Objective: Removed from the passed array the following 2nd and so-on arguments.\n");

function destroyer(arr) {

	console.log("Passed array: 		" + JSON.stringify(arr));

	var otherArguments = [].slice.call(arguments);

	console.log("Convert Arguments:	" + JSON.stringify(otherArguments));


	for (i = 0; i < arr.length; i++) {
		for (j = 0; j < otherArguments.length; j++) {
			if (arr[i] === otherArguments[j]) {
				delete arr[i];
			}
		}
	}

	console.log("Array to return: 	" + JSON.stringify(arr.filter(Boolean)) + "\n");

	return arr.filter(Boolean);
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3); // should return [1, 1]
destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3); // [1, 5, 1]
destroyer([3, 5, 1, 2, 2], 2, 3, 5); // [1]
destroyer([2, 3, 2, 3], 2, 3); // []
destroyer(["tree", "hamburger", 53], "tree", 53); // ["hamburger"].



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

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

*/