function log() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    //  console.log("*****************************************");
    var consValue = " ";
    for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
        var value = values_1[_a];
        consValue = consValue + value + " ";
    }
    console.info("Message : " + consValue);
    //  console.log("*****************************************");
}
log("Loading app.ts");
