var gulp = require('gulp');
var connect = require('gulp-connect');
var ts = require('gulp-typescript');

gulp.task('typescriptCompile', function(){
	var tsResult = gulp.src('app/typescript/*.ts')
	    .pipe(ts({
	        noImplicitAny: true,
	        out: 'app.js'
	      }));
  	return tsResult.js.pipe(gulp.dest('app/js'));
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/typescript/*.ts'], ['typescriptCompile']);
  gulp.watch(['./app/*.html'], ['html']);
});
 
gulp.task('default', ['typescriptCompile', 'connect', 'watch']);