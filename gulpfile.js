'use strict';
const gulp = require ('gulp'),
    eslint = require('gulp-eslint'),
    fileInclude = require('gulp-file-include'),
    bs = require('browser-sync').create(),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');
    //debug = require('gulp-debug'),
    //notify = require('gulp-notify');


const path = {
    // folder where the finished files are added
    build: {
        html: './build/',
        css: './build/css',
        js: './build/js',
        copy_js_libs: './build/libs',
        copy_fonts: './build/fonts'
    },
    // folder where to get files
    src: {
        html: 'src/[^_]*.html',
        style: 'src/css/scss/main.scss',
        js: 'src/js/**/*.js',
        copy_js_libs: 'src/libs/**/*.js',
        copy_fonts: 'src/fonts/**/*.*'
    },
    // watching files
    watch: {
        html: 'src/**/*.html',
        style: 'src/css/scss/**/*.scss',
        js: 'src/js/**/*.js'
    },
    browserSyncWatch:'build/**/*.{css,html,js}',
    clean: ['./build/**', '!./build']
};



function html(callback){
    gulp.src(path.src.html)
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.html));
    callback();
}


function browserSync(){
    bs.init({
        server: {
            baseDir: path.build.html
        }
    });

    gulp.watch(path.browserSyncWatch).on('change', bs.reload);
}

function styles(callback) {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('/', {
            sourceMappingURLPrefix: ''}))
        .pipe(gulp.dest(path.build.css));
    callback();
}

function scripts(callback) {
     gulp.src(path.src.js)
        .pipe(eslint())
        .pipe(eslint.format())// вывод ошибок
         /*.pipe(eslint.failAfterError())*/
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.js));
    callback();
}

function copyFiles(callback) {

   // js libs
    gulp.src(path.src.copy_js_libs)
        .pipe(gulp.dest(path.build.copy_js_libs));

    // fonts
    gulp.src(path.src.copy_fonts)
        .pipe(gulp.dest(path.build.copy_fonts));

    callback();
}

function clean(callback) {
    del(path.clean);
    callback();
}

function watch(){
    gulp.watch(path.watch.html, gulp.series(html));
    gulp.watch(path.watch.style, gulp.series(styles));
    gulp.watch(path.watch.js, gulp.series(scripts));
}

// initial build before watching
gulp.task('build',  gulp.series(clean, gulp.parallel(html, styles, scripts, copyFiles)));

// default task
exports.default = gulp.series('build', gulp.parallel(watch, browserSync));