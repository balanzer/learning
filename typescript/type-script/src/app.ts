function log(value) {
  //  console.log("*****************************************");
  console.info(`${value}`);
  //  console.log("*****************************************");
}

//log(10);
//log("Hello World");

let array = ["one", "two", "three", "four"];

/**
 * For loop
 */

for (let index in array) {
  var value = array[index];
  log(`${index} item is ${value}`);
}

for (let value of array) {
  // var value = array[index];
  log(`item is ${value}`);
}
