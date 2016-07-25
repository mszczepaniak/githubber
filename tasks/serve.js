var gulp = require('gulp');
var config = require('../gulp.config')();
var bs = require("browser-sync");

function startBrowsersync(config) {
    bsIns = bs.create();
    bsIns.init(config);
    bsIns.reload();
}

/* Start live server dev mode */
gulp.task('serve-dev', ['sass', 'watch-ts', 'watch-sass', 'watch-sass-components'], function () {
    startBrowsersync(config.browserSync.dev);
});

/* Start live server production mode */
gulp.task('serve-build', ['build'], function () {
    startBrowsersync(config.browserSync.prod);
});