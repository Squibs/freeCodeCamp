const Person = function (firstAndLast) {
  let fullName = firstAndLast;

  this.getFirstName = function () {
    return fullName.split(' ')[0];
  };

  this.getLastName = function () {
    return fullName.split(' ')[1];
  };

  this.getFullName = function () {
    return fullName;
  };

  this.setFirstName = function (first) {
    fullName = `${first} ${fullName.split(' ')[1]}`;
  };

  this.setLastName = function (last) {
    fullName = `${fullName.split(' ')[0]} ${last}`;
  };

  this.setFullName = function (firstAndLast) {
    fullName = firstAndLast;
  };
};

const bob = new Person('Bob Ross');
bob.getFullName();

console.log(`Object Length: ${Object.keys(bob).length} (should return 6).`);
console.log(`Is bob an instance of Person?: ${bob instanceof Person} (should return true).`);
console.log(`bob.firstName: ${bob.firstName} (should return undefined).`);
console.log(`bob.lastName: ${bob.lastName} (should return undefined).`);
console.log(`bob.getFirstName: ${bob.getFirstName()} (should return "Bob").`);
console.log(`bob.getLastName: ${bob.getLastName()} (should return "Ross").`);
console.log(`bob.getFullName: ${bob.getFullName()} (should return "Bob Ross").`);

bob.setFirstName('Haskell');
console.log(`bob.getLastName: ${bob.getFullName()} (should return "Haskell Ross").`);

bob.setLastName('Curry');
console.log(`bob.getLastName: ${bob.getFullName()} (should return "Haskell Curry").`);

bob.setFullName('Zachary Holman');
console.log(`Clearing for next test: ${bob.getFullName()} (should reuturn "Zachary Holman").`);

bob.setFullName('Haskell Curry');
console.log(`bob.getLastName: ${bob.getFullName()} (should return "Haskell Curry").`);
console.log(`bob.getLastName: ${bob.getFirstName()} (should return "Haskell").`);
console.log(`bob.getLastName: ${bob.getLastName()} (should return "Curry").`);

console.log(`bob.fullName: ${bob.fullName} (should return undefined).`);

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const Person = function (firstAndLast) {
    let fullName = firstAndLast;

    this.getFirstName = function () {
      return fullName.split(' ')[0];
    };

    this.getLastName = function () {
      return fullName.split(' ')[1];
    };

    this.getFullName = function () {
      return fullName;
    };

    this.setFirstName = function (first) {
      fullName = `${first} ${fullName.split(' ')[1]}`;
    };

    this.setLastName = function (last) {
      fullName = `${fullName.split(' ')[0]} ${last}`;
    };

    this.setFullName = function (firstAndLast) {
      fullName = firstAndLast;
    };
  };

  const bob = new Person('Bob Ross');
  bob.getFullName();

*/
