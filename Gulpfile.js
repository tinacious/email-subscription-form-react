var gulp    = require('gulp');
var webpack = require('webpack-stream');
var serve   = require('browser-sync');
var sync    = require('run-sequence');

gulp.task('build', function () {
    return gulp.src('client/app/index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('client'));
});

gulp.task('serve', function () {
    serve({
        port: 9778,
        open: false,
        server: {
            baseDir: 'client'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(['client/app/**/*.{js*,html}'], ['build', serve.reload]);
});

gulp.task('default', function (done) {
    sync('build', 'watch', 'serve', done);
});
