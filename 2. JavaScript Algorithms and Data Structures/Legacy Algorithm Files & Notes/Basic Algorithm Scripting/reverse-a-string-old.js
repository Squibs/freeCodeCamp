console.log("Objective: Take a string of characters and reverse it. \n");

function reverseString(str) {

	console.log("Original string: 													\"" + str + "\"");

	str = str.split('');

	console.log("Split string characters up into an array (using split() method) 	[" + str + "]");

	str = str.reverse();

	console.log("Reverse the array (using reverse() method) 						[" + str + "]");

	str = str.join('');

	console.log("Join the array back into a string using (join() method) 			\"" + str + "\" \n");

	return str;
}

reverseString("hello");
reverseString("Howdy");
reverseString("Greetings from Earth");



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function reverseString(str) {
		str = str.split('');
		str = str.reverse();
		str = str.join('');
		return str;
	}
	
*/