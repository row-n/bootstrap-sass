var gulp        = require('gulp');
var prefix      = require('gulp-autoprefixer');
var cssnano     = require('gulp-cssnano');
var concat      = require('gulp-concat');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var runSequence = require('run-sequence');

var messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

gulp.task('sass', function () {
  return gulp.src(['./frontend/_sass/**/*.scss'])
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('./aem/css'));
});

gulp.task('scripts', function() {
  return gulp.src(['./frontend/_js/**/*.js'])
  .pipe(concat('scripts.js'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('./aem/js'));
});

gulp.task('jekyll-dev', function (done) {
  browserSync.notify(messages.jekyllDev);
  return cp.spawn('jekyll', ['build', '--config', './config/_config.yml'], {stdio: 'inherit'})
 .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-dev'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: "aem",
    port: 1234
  });
});

gulp.task('watch', function () {
  gulp.watch(['./frontend/_global/**/*.scss', './frontend/_sass/**/*.scss'], ['sass']);
  gulp.watch(['./frontend/_js/**/*.js'], ['scripts']);
  gulp.watch(['index.html', './templates/**/*.html'], ['jekyll-rebuild']);
});

gulp.task('default', function(done) {
  return runSequence(
    'jekyll-dev',
    'sass',
    'scripts',
    'browser-sync',
    'watch',
    done);
});
