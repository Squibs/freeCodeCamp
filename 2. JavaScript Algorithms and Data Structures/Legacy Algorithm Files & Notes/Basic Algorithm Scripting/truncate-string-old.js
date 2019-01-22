console.log("Objective: Truncate a string if it is longer than the given maximum string length. \n");

function truncateString(str, num) {

	console.log("Passed string: 			\"" + str + "\"");

	console.log("String length: 			" + str.length);

	console.log("Passed number: 			" + num);

	var toggle = false;
	
	if (num > 3 && num < str.length - 3) {
		num -= 3;

		console.log("Lrg Num; New number: 	" + num);
	} else if (num >= str.length - 3 && str.length - 3 > 0) {
		toggle = true;
	}

	str = str.slice(0, num);

	if (toggle === false) {
		str = str.concat("...");
	}

	console.log("String to return: 		\"" + str + "\"\n");

	return str;
}

truncateString("A-tisket a-tasket A green and yellow basket", 11); // should return "A-tisket..."
truncateString("Peter Piper picked a peck of pickled peppers", 14); // should return "Peter Piper..."
truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length); // should return "A-tisket a-tasket A green and yellow basket"
truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length + 2); // should return "A-tisket a-tasket A green and yellow basket"
truncateString("A-", 1); // should return "A..."
truncateString("Absolutely Longer", 2); // should return "Ab..."



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function truncateString(str, num) {

		var toggle = false;
		
		if (num > 3 && num < str.length - 3) {
			num -= 3;
		} else if (num >= str.length - 3 && str.length - 3 > 0) {
			toggle = true;
		}

		str = str.slice(0, num);

		if (toggle === false) {
			str = str.concat("...");
		}

		return str;
	}

*/