console.log("Objective: Output the length of the longest word in a string \n");

function findLongestWord(str) {

	console.log("Original string: " + str);

	var myArray = [];
	var arrayControl = 0;
	var lengthControl = 0;

	for (i = 0; i < str.length; i++) {

		if (str[i] == " ") {
			arrayControl++; //add one to array control to move on to the next array spot
			lengthControl = 0;
		} else {
			lengthControl++;
			myArray[arrayControl] = lengthControl; //add one to current array spot
		}
	}

	console.log("Word count: " + (arrayControl + 1));
	console.log("Count characters until whitespace and put into array: [" + myArray +"]");

	myArray.sort(function(a, b) {
		return a - b;
	});

	
	console.log("Sort array smallest to largest: [" + myArray + "]" + "\n");

	return myArray.pop();
}

findLongestWord("The quick brown fox jumped over the lazy dog");
findLongestWord("May the force be with you");
findLongestWord("Google do a barrel roll");
findLongestWord("What is the average airspeed velocity of an unladen swallow");
findLongestWord("What if we try a super-long word such as otorhinolaryngology");


/* CONDENSED VERSION - NO NOTES OR CONSOLE OUTPUTS

	function findLongestWord(str) {

		var myArray = [];
		var arrayControl = 0;
		var lengthControl = 0;

		for (i = 0; i < str.length; i++) {

			if (str[i] == " ") {
				arrayControl++;
				lengthControl = 0;
			} else {
				lengthControl++;
				myArray[arrayControl] = lengthControl;
			}
		}

		myArray.sort(function(a, b) {
			return a - b;
		});

		return myArray.pop();
	}

*/