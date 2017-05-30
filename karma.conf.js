module.exports = function (karma) {
  karma.set({
    basePath: './',
    frameworks: ['mocha'],
    files: [
      {pattern: 'node_modules/chai/chai.js', include: true},
      'monads/**/*.js',
      'specs/**/*.js'
    ],
    exclude: [
      'karma.conf.js'
    ],
    reporters: ['mocha', 'junit', 'coverage'],
    junitReporter: {
      outputDir: 'coverage',
      // will be resolved to basePath (in the same way as files/exclude patterns)
      outputFile: 'junit-report/test-results.xml'
    },
    preprocessors: {
      'monads/**/*.js': ['coverage', 'webpack', 'sourcemap'],
      'specs/**/*.js': ['webpack', 'sourcemap']
    },
    //Code Coverage options. report type available:
    //- html (default)
    //- lcov (lcov and html)
    //- lcovonly
    //- text (standard output)
    //- text-summary (standard output)
    //- cobertura (xml format supported by Jenkins)
    coverageReporter: {
      // cf. http://gotwarlost.github.com/istanbul/public/apidocs/
      type: 'lcov',
      dir: 'coverage/'
    },
    // web server port
    port: 9876,
    // cli runner port
    runnerPort: 9100,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: karma.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: ['PhantomJS'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 6000,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    webpack: {
      // you don't need to specify the entry option because
      // karma watches the test entry points
      // webpack watches dependencies

      // ... remainder of webpack configuration (or import)
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.ts', '.js', '.json'],

        // Make sure root is src
        // root: __dirname,

        // remove other default values
        modules: ['./node_modules']
      },
      module: {
        // preLoaders: [{
        //   test: /\.js$/,
        //   loader: 'source-map-loader'
        // }],
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
        }, {
          test: /\.js$/,
          loader: 'eslint-loader',
          options: {
            outputReport: {
              filePath: 'checkstyle.xml',
              formatter: require('eslint/lib/formatters/checkstyle')
            }
          }
        }]
      },
      plugins: [
      ]
    },
    webpackServer: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    },
    plugins: [
      'karma-babel-preprocessor',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-junit-reporter',
      'karma-coverage',
      'karma-webpack'
    ]
  });
}