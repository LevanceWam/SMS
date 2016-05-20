var gulp = require('gulp')
var wiredep = require('wiredep').stream;
var ngAnnotate = require('gulp-ng-annotate')
var inject = require('gulp-inject')

gulp.task('js:build', function () {

    // gulp.src(['./public/js/app.js', 'public/js/**/*.js'])
    //     .pipe(ngAnnotate())
    //     .pipe(gulp.dest('./public'))

    gulp.src('./public/index.html')
      .pipe(wiredep())
      .pipe(gulp.dest('./public'))

    var target = gulp.src('./public/index.html');

    var sources = gulp.src(['./public/js/app.js', './public/js/**/*.js'], {read: false})

    return target.pipe(inject(sources, {ignorePath: 'public'}))
        .pipe(gulp.dest('./public/'))
})

gulp.task('js:watch', ['js:build'], function () {
  gulp.watch('./public/js/**/*.js', ['js:build'])
})
