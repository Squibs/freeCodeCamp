console.log("Objective: Write a function which takes a ROT13 encoded string as input and returns a decoded string.\n");

function rot13(str) { 

	console.log("Passed string: 		" + JSON.stringify(str));

	// A is 65, a is 97; Z is 90, z is 122

	console.log("String length: 		" + str.length);

	var decodedStr = "";

	for (var i = 0; i < str.length; i++) {

		var letterPos = str.charCodeAt(i) - 64;

		if (letterPos > 13 && letterPos <= 26) {
			decodedStr += String.fromCharCode(str.charCodeAt(i) - 13);
		} else if (letterPos <= 13 && letterPos > 0) {
			decodedStr += String.fromCharCode(str.charCodeAt(i) + 13);
		} else {
			decodedStr += String.fromCharCode(str.charCodeAt(i));
		}
	}

	console.log("String to return: 	" + JSON.stringify(decodedStr) + "\n");
	return decodedStr;
}

rot13("SERR PBQR PNZC"); // decode to "FREE CODE CAMP"
rot13("SERR CVMMN!"); // "FREE PIZZA!"
rot13("SERR YBIR?"); // "FREE LOVE?"
rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK."); // "THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX."



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function rot13(str) { 

		var decodedStr = "";

		for (var i = 0; i < str.length; i++) {

			var letterPos = str.charCodeAt(i) - 64;

			if (letterPos > 13 && letterPos <= 26) {
				decodedStr += String.fromCharCode(str.charCodeAt(i) - 13);
			} else if (letterPos <= 13 && letterPos > 0) {
				decodedStr += String.fromCharCode(str.charCodeAt(i) + 13);
			} else {
				decodedStr += String.fromCharCode(str.charCodeAt(i));
			}
		}
		return decodedStr;
	}

*/