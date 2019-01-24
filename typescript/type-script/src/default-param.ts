function countDown(init: number, final: number = 100, interval: number = 3) {
  var current = init;

  while (current <= final) {
    console.log("current : " + current);
    current = current + interval;
  }
}

countDown(10, 10, 10);

countDown(10, 10);
countDown(10);
