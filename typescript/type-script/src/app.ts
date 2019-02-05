function log(...values) {
  //  console.log("*****************************************");
  let consValue = " ";
  for (let value of values) {
    consValue = consValue + value + " ";
  }
  console.info(`Message : ${consValue}`);
  //  console.log("*****************************************");
}

log("Loading app.ts");
