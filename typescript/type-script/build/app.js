function log(value) {
    //  console.log("*****************************************");
    console.info("" + value);
    //  console.log("*****************************************");
}
//log(10);
//log("Hello World");
var array = ["one", "two", "three", "four"];
/**
 * For loop
 */
for (var index in array) {
    var value = array[index];
    log(index + " item is " + value);
}
for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var value_1 = array_1[_i];
    // var value = array[index];
    log("item is " + value_1);
}
