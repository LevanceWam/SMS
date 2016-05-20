var fs = require('fs')
var gulp = require('gulp');

fs.readdirSync('./gulp').forEach(function (module) {
    require('./gulp/' + module)
})

gulp.task('build', ['js:build'])
gulp.task('watch', ['js:watch'])
gulp.task('default', ['watch', 'server'])
