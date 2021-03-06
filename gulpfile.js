const browserify = require('browserify');
const fs = require("fs-extra");
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require("gulp-sourcemaps");
const uglify = require('gulp-uglify');

var buildDir = 'dist';

gulp.task('browserify', function() {
      fs.emptyDirSync(buildDir);

      var browserifyOptions = {
        basedir: buildDir,
        debug: true,
        entries: ['../index.js'],
        standalone: 'markdown-it-action',
        cache: {},
        packageCache: {}
      };
      return bundleStream = browserify(browserifyOptions)
        .bundle()
        .pipe(source('mdItCheAction.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true, sourceRoot: '../lib'}))
//        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('default', ['browserify']);
