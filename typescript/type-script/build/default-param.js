function countDown(init, final, interval) {
    if (final === void 0) { final = 100; }
    if (interval === void 0) { interval = 3; }
    var current = init;
    while (current <= final) {
        console.log("current : " + current);
        current = current + interval;
    }
}
countDown(10, 10, 10);
countDown(10, 10);
countDown(10);
