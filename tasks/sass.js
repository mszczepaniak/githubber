var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../gulp.config')();
var replace = require('gulp-replace');
var argv = require('yargs').argv;
var fs = require('fs');
var runSequence = require('run-sequence');


gulp.task('set-theme', function () {
    var theme = argv.name;
    if (!theme) {
      console.log('ERROR: set-theme needs name argument like --name=paper');
    } else {
      var p = 'node_modules/bootswatch/';
      try {
        if (fs.statSync(p + theme).isDirectory()) {
          if (fs.statSync(p + theme + '/_bootswatch.scss')){
            return gulp.src(config.assetsPath.styles + 'bootswatch.scss')
                .pipe(replace(/bootswatch\/[^\/]+\//g, 'bootswatch/'+ theme + '/'))
                .pipe(gulp.dest(config.assetsPath.styles));
          }
        }
      } catch (err) {
        console.log('ERROR: theme "' + theme + '" is not found');
      }
    }
    process.exit(1);
});

gulp.task('sass', function (done) {
    runSequence('sass-global', 'sass-components', done);
});

gulp.task('sass-global', function () {
    return gulp.src(config.assetsPath.styles + 'main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.assetsPath.styles));
});

gulp.task('sass-components', function () {
  return gulp.src(config.app + '**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(config.app));
})

gulp.task('watch-sass', function () {
    gulp.watch(config.assetsPath.styles + '**/*.scss', ['sass-global']);
});

gulp.task('watch-sass-components', function () {
    gulp.watch(config.app + '**/*.scss', ['sass-components']);
});
