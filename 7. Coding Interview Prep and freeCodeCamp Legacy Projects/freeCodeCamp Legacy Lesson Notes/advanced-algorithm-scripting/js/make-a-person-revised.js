class Person {
  constructor(firstAndLast) {
    this.fullName = firstAndLast;
  }

  getFirstName() {
    return this.fullName.split(' ')[0];
  }

  getLastName() {
    return this.fullName.split(' ')[1];
  }

  getFullName() {
    return this.fullName;
  }

  setFirstName(first) {
    this.fullName = `${first} ${this.fullName.split(' ')[1]}`;
  }

  setLastName(last) {
    this.fullName = `${this.fullName.split(' ')[0]} ${last}`;
  }

  setFullName(firstAndLast) {
    this.fullName = firstAndLast;
  }
}

const bob = new Person('Bob Ross');
console.log(bob.getFullName());

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

// Issue with private variables using this method. You can access the variable;
// not sure if this is a limitation, or something I'm doing wrong.
console.log(`bob.fullName: ${bob.fullName} (should return undefined but does not).`);


/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  class Person {
    constructor(firstAndLast) {
      this.fullName = firstAndLast;
    }

    getFirstName() {
      return this.fullName.split(' ')[0];
    }

    getLastName() {
      return this.fullName.split(' ')[1];
    }

    getFullName() {
      return this.fullName;
    }

    setFirstName(first) {
      this.fullName = `${first} ${this.fullName.split(' ')[1]}`;
    }

    setLastName(last) {
      this.fullName = `${this.fullName.split(' ')[0]} ${last}`;
    }

    setFullName(firstAndLast) {
      this.fullName = firstAndLast;
    }
  }

*/
