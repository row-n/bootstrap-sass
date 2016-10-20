var gulp        = require('gulp');
var prefix      = require('gulp-autoprefixer');
var cssnano     = require('gulp-cssnano');
var combineMq   = require('gulp-combine-mq');
var concat      = require('gulp-concat');
var minifyCSS   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var scsslint    = require('gulp-scss-lint');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var runSequence = require('run-sequence');

gulp.task('fonts', function() {
  return gulp.src(['./frontend/_fonts/**/*'])
  .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('icons', function() {
  return gulp.src(['./frontend/_icons/**/*'])
    .pipe(gulp.dest('./dist/assets/icons/'));
});

gulp.task('javascript:bootstrap', function () {
  return gulp.src(['./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'])
    .pipe(rename('bootstrap-3.3.7.js'))
    .pipe(gulp.dest('./frontend/_js/etc/designs/myob/footlibs/js/vendor'))
});

gulp.task('javascript:jquery', function () {
  return gulp.src(['./node_modules/jquery/dist/jquery.js'])
    .pipe(rename('jquery-2.2.4.js'))
    .pipe(gulp.dest('./frontend/_js/etc/designs/myob/footlibs/js/vendor'))
});

gulp.task('javascript:jquery-lazyload', function () {
  return gulp.src(['./node_modules/jquery-lazyload/jquery.lazyload.js'])
    .pipe(rename('jquery.lazyload-1.9.7.js'))
    .pipe(gulp.dest('./frontend/_js/etc/designs/myob/footlibs/js/vendor'))
});

gulp.task('javascript', function() {
  return gulp.src(['./frontend/_js/**/*.js'])
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts', [
  'javascript:bootstrap',
  'javascript:jquery',
  'javascript:jquery-lazyload',
  'javascript'
]);

gulp.task('sass', function () {
  return gulp.src(['./frontend/_sass/**/*.scss'])
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(combineMq({
        beautify: false
    }))
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scss-lint', function() {
  return gulp.src('frontend/_sass/**/*.scss')
    .pipe(scsslint());
});

gulp.task('jekyll', function (done) {
  return cp.spawn('jekyll', ['build', '--config', './config/_config.yml'], {stdio: 'inherit'})
 .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: "dist",
    port: 1234
  });
});

gulp.task('styles', ['scss-lint', 'sass']);

gulp.task('watch', function () {
  gulp.watch(['./frontend/_global/**/*.scss', './frontend/_sass/**/*.scss'], ['sass']);
  gulp.watch(['./frontend/_js/**/*.js'], ['scripts']);
  gulp.watch(['index.html', './templates/**/*.html'], ['jekyll-rebuild']);
});

gulp.task('default', function(done) {
  return runSequence(
    'jekyll',
    // 'fonts',
    // 'icons',
    'styles',
    'scripts',
    'browser-sync',
    'watch',
    done);
});
