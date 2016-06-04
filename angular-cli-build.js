/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    polyfills: [
      'vendor/core-js/client/core.js',
      'vendor/systemjs/dist/system.src.js',
      'vendor/zone.js/dist/zone.js',
    ],
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'core-js/client/core.js',
      'rxjs/**/*.+(js|js.map)',
      'ng2-material/**/*.+(js|js.map|css)',
      '@angular/**/*.+(js|js.map)',
      '@angular2-material/**/*.+(js|js.map)',
      '@ngrx/**/*.+(js|js.map)',
      'angualar2-jwt/**/*.+(js|js.map)'
    ]
  });
};
