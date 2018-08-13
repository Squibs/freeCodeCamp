console.log("Objective: Split an array into groups the length of the passed size argument and return them as a two-dimensional array\n");

function chunkArrayInGroups(arr, size) {

	console.log("Passed array: 		" + JSON.stringify(arr));
	console.log("Passed size: 		" + size);

	var tempArray = [];

	for (i = 0; i < arr.length; i += size) {
		tempArray.push(arr.slice(i, i + size));
	}

	console.log("Array to return: 	" + JSON.stringify(tempArray) + "\n");
	return tempArray;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2); // should return [["a", "b"], ["c", "d"]]
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3);
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2);
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4);
chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3);
chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4);
chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 2);



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function chunkArrayInGroups(arr, size) {

		var tempArray = [];

		for (i = 0; i < arr.length; i += size) {
			tempArray.push(arr.slice(i, i + size));
		}

		return tempArray;
	}

*/