var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
  //  sass = require('gulp-sass'),
    nodemon = require('nodemon'),
    livereload = require('gulp-livereload'),
    ngAnnotate = require('gulp-ng-annotate'),
    //cssnano = require('gulp-cssnano'),
    del = require('del'),
    gulpIf = require('gulp-if');


// var path = 'dist';
// var isDev;
// function setIsDev(value) {
//     isDev = true;
//     path = value ? 'app' : 'dist';
//
// }
//
livereload({ start: true })


gulp.task('js', function () {

    gulp.src(['app/js/app.js', 'app/js/*.js'])
        .pipe(concat('script.js'))
        .pipe(ngAnnotate())
        // .pipe(gulpIf(!isDev, minify({
        //     ext: {
        //         src: '-debug.js',
        //         min: '.js'
        //     }
        // })))
        .pipe(gulp.dest('app/'));

});

gulp.task('css', function () {

    gulp.src(['app/css/style.css', 'app/css/*.css'])
        .pipe(concat('style.css'))
        // .pipe(ngAnnotate())
        // .pipe(gulpIf(!isDev, minify({
        //     ext: {
        //         src: '-debug.js',
        //         min: '.js'
        //     }
        // })))
        .pipe(gulp.dest('app/'));

});


// gulp.task('sass', function () {
//
//     gulp.src('src/styles/*.scss')
//         .pipe(sass())
//         .pipe(gulpIf(!isDev, cssnano()))
//         .pipe(gulp.dest(path + '/styles'))
// });


// gulp.task('clean', function () {
//
//     return del.sync('dist/*');
// });

//This sub-task pipes the images to dist folder
// gulp.task('images', function () {
//     return gulp.src('app/assets/**/*')
//         .pipe(gulp.dest(path + '/assets'));
// });

//This sub-task pipes all the views to the dist folder
// gulp.task('templates', function () {
//     return gulp.src('app/templates/*')
//         .pipe(gulp.dest(path + '/templates'));
// });

// //This sub-task pipes all fonts to the dist folder
// gulp.task('fonts', function () {
//     return gulp.src('src/fonts/**/*')
//         .pipe(gulp.dest(path + '/fonts'))
// })

//This sub-task pipes the index.html and the icons to the dist folder
// gulp.task('index', function () {
//     return gulp.src('app/index.html')
//         .pipe(gulp.dest(path + '/'));
// });


//refresh task - refreshes the browsee
gulp.task('refresh', function () {

    livereload.reload();
});

//server task - responsilbe for running our express server
gulp.task('server', function () {

     //start listening for changes

    nodemon({
        'script': 'server.js',
        //nodemon should only restart the server when `server.js` changes so we ignore the rest:
        'ignore': ['app/index.html', 'package.json', 'gulpfile.js', 'app/js/*.js', 'tmp']
    }).on('restart', function () {
        livereload.reload(); //on server restart, refresh the browser
    })
});



gulp.task('dummy', function(){
  console.log('html file changes');
});


gulp.task('watch', function () {

    //livereload.listen();
    // setIsDev(true);

    gulp.watch('app/css/*.css', ['css', 'refresh']);
    gulp.watch('app/js/**/*.js', ['js', 'refresh']);
    gulp.watch('app/**/*.html', ['dummy', 'refresh']);

});

gulp.task('start', ['server', 'watch', 'css', 'js']);


//gulp.task('build', ['clean', 'css', 'js', 'images', 'templates', 'index']);
