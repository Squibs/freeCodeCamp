console.log("Objective: Return the factorial of the provided integer \n");

function factorialize(num) {

	console.log("Number entered: " + num);

	if (num > 0) {
		for (i = num - 1; i > 1; i--) {
			num *= i;
			console.log(num);
		}
		console.log("Factorial: " + num + "\n");
		return num;
	} else {
		num++;
		console.log("Factorial: " + num + "\n");
		return num;
	}
}

factorialize(5);
factorialize(10);
factorialize(20);
factorialize(0);
factorialize(3);
factorialize(1);



/* CONDENSED VERSION - NO CONSOLE OUTPUTS

	function factorialize(num) {

		if (num > 0){
			for (i = num - 1; i > 1; i--) {
				num *= i;
			}

			return num;

		} else {
			return num + 1;
		}
	}

*/