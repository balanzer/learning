const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  framework: 'jasmine',
  baseUrl: "http://127.0.0.1:8080",
  specs: [
    '*/e2e/**.e2e-spec.ts',
    'catch-all.e2e-spec.ts'
  ],
  SELENIUM_PROMISE_MANAGER: false,
  directConnect: true,
  jasmineNodeOpts: {
    showColors: true,
    // Timeout for an "it()" to run.
    defaultTimeoutInterval: 10 * 1000
  },
  capabilities: {
    browserName: 'chrome',
    loggingPrefs: {
      "driver": "INFO",
      "browser": "INFO"
    }
  },
  jasmineNodeOpts: {
    print: function () { }  // no '........' while running
  },
  onPrepare() {
    require('ts-node').register({
      project: 'tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
}
