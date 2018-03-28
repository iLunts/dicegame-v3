/// <binding AfterBuild='scripts' />
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var inlineCss = require('gulp-inline-css');
var sass = require('gulp-sass');


// ---------------------------------------
// ---------------------------------------
// Less
// ---------------------------------------
// ---------------------------------------

gulp.task('css.site', function () {
    gulp.src(['web-src/less/site.less'])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('site.min.css'))
        .pipe(clean({
            force: true
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('content/css/'));
});

// gulp.task('scss.site', function () {
//     gulp.src(['html/sass/base/_base.scss'])
//         .pipe(less({
//             paths: [path.join(__dirname, 'less', 'includes')]
//         }))
//         .pipe(concat('site.min.css'))
//         .pipe(clean({
//             force: true
//         }))
//         .pipe(cleanCSS({
//             compatibility: 'ie8'
//         }))
//         .pipe(autoprefixer({
//             browsers: ['last 4 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('content/css/'));
// });

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass({
      paths: [path.join(__dirname, 'sass', 'includes')]
    }))
    .pipe(concat('main.css'))
    .pipe(clean({
      force: true
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./sass/'));
});


gulp.task('css.inline', function () {
    return gulp.src('./index.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('build/'));
});

