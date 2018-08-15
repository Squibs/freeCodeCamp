console.log("Objective: check if string is a palindrome \n");

function palindrome(str) {

	console.log("Original string: 									\"" + str + "\"");

	str = str.toLowerCase().replace(/\s|[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, '');

	console.log("Convert to lower case and removed spaces/numbers: 	\"" + str + "\"");

	for (i = 0; i < str.length; i++) {

		if (str[i] == str[str.length - 1 - i]) {
			// do nothing

		} else {
			console.log("false \n");
			return false;
		}
	}
	console.log("true \n");
	return true;
}

palindrome("eye"); //true
palindrome("_eye"); //true
palindrome("race car"); //true
palindrome("not a palindrome"); //false
palindrome("A man, a plan, a canal. Panama"); //true
palindrome("never odd or even"); //true
palindrome("nope"); //false
palindrome("almostomla"); //false
palindrome("My age is 0, 0 si ega ym."); //true
palindrome("1 eye for of 1 eye."); //false
palindrome("0_0 (: /-\ :) 0-0"); //true
palindrome("five|\_/|four"); //false




/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function palindrome(str) {

		str = str.toLowerCase().replace(/\s|[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, '');

		for (i = 0; i < str.length; i++) {
			if (str[i] == str[str.length - 1 - i]) {} else { return false; }
		}
		return true;
	}

*/