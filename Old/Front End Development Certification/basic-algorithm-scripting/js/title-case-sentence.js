console.log("Objective: Output the length of the longest word in a string \n");

function titleCase(str) {

	console.log("Original string:   							\"" + str + "\"");
	console.log("String length: 								" + str.length);

	str = str.toLowerCase();

	console.log("Convert everything to lowercase: 			\"" + str + "\"");

	str = str.charAt(0).toUpperCase() + str.slice(1); //Make first char in string capital

	console.log("Convert first char in string to uppercase: 	\"" + str + "\"");

	for (i = 0; i < str.length; i++) {

		if (str[i] == " ") {

			str = str.slice(0, i + 1) + str.charAt(i + 1).toUpperCase() + str.slice(i + 2, str.length);

		}
	}

	console.log("Capitalize chars after a whitespace:   		\"" + str + "\"\n");

	return str;
}

titleCase("I'm a little tea pot"); // should return "I'm A Little Tea Pot"
titleCase("sHoRt AnD sToUt");
titleCase("HERE IS MY HANDLE HERE IS MY SPOUT");



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function titleCase(str) {

		str = str.toLowerCase();

		str = str.charAt(0).toUpperCase() + str.slice(1);

		for (i = 0; i < str.length; i++) {
			if (str[i] == " ") {
				str = str.slice(0, i + 1) + str.charAt(i + 1).toUpperCase() + str.slice(i + 2, str.length);
			}
		}

	  return str;
	}

*/