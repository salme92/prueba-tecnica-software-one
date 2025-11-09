// karma.conf.js
// Configuración estándar para Angular + Karma + Jasmine

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // puedes añadir config de jasmine aquí
      },
      clearContext: false, // deja el resultado visible en el navegador
    },
    jasmineHtmlReporter: {
      suppressAll: true, // quita trazas duplicadas
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/user-dashboard'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
