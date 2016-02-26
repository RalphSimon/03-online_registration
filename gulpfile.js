"use strict"

var    gulp = require('gulp'),
browserSync = require('browser-sync').create(),
        del = require('del'),
       sass = require('gulp-sass'),
     prefix = require('gulp-autoprefixer'),
       maps = require('gulp-sourcemaps');


var reload = browserSync.reload;
var paths = {
  app: "app/",
  scss: "app/sass",
  css: "app/css",
  js: "app/js"
};

/*********

  DEVELOPMENT

********/

// Compile sass and generate Source Map
gulp.task('compileSass', function() {
  return gulp.src('app/scss/main.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(prefix({
      browsers: ['> 5%']
    }))
    .pipe(maps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

// This task launches a static development server and watches scss/html files
gulp.task('serve', ['compileSass'], function() {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });

  // CSS is auto-injected into the browser with browserSync.stream() in the 'compileSass' task
  gulp.watch("app/scss/**/*.scss", ['compileSass']);

  // Changes in HTML files will automatically reload the page
  gulp.watch("app/*.html").on('change', reload);
});


/*********

  DFAULT GULP TASK

********/

// This task is supposed to change over time. During development, it will rely on the 'serve' task.
// During deployment, their will be a 'serve:dist' task.
// For reference checkout the gulp-file of Google's Web Starter Kit

gulp.task('default', ['serve']);
