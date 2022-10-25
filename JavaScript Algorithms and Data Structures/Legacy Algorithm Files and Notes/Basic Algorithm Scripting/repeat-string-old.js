console.log("Objective: Repeat a given string num times. Return an empty string if num is not a positive number \n");

function repeatStringNumTimes(str, num) {

	console.log("Passed string: 		\"" + str + "\"");
	console.log("Repeat string: 		" + num + " times");

	if (num < 0) {

		console.log("num was not positive\n");

		str = "";
		return str;
	}

	var repeat = str;

	while (num > 1) {
		str = str.concat(repeat);
		num--;
	}

	console.log("String to return: 	\"" + str + "\"\n");

	return str;
}

repeatStringNumTimes("*", 3);
repeatStringNumTimes("abc", 3); // should return "abcabcabc"
repeatStringNumTimes("abc", 4);
repeatStringNumTimes("abc", 1);
repeatStringNumTimes("*", 8);
repeatStringNumTimes("abc", -2);



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function repeatStringNumTimes(str, num) {

		if (num < 0) {
			str = "";
			return str;
		}

		var repeat = str;

		while (num > 1) {
			str = str.concat(repeat);
			num--;
		}

		return str;
	}

*/