var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    meta = require('./package.json');

var jsDir     = 'assets/js/',
    sassDir   = 'assets/sass/',
    fontsDir  = 'assets/fonts/',
    imagesDir = 'assets/images/',
    distDir   = 'build';


var onError = function (err) {
    $.util.beep();
    console.log(err.toString());
    this.emit('end');
};

gulp.task('fonts', function() {
    return gulp.src(fontsDir + '**/*')
        .pipe(gulp.dest(distDir + "/fonts"));
});

gulp.task('images', function() {
    return gulp.src(imagesDir + '**/*')
        .pipe(gulp.dest(distDir + "/images"));
});

gulp.task('sass-dev', function() {
    return gulp.src(sassDir + '*.scss')
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(distDir + "/css"));
});
gulp.task('sass-prod', function() {
    return gulp.src(sassDir + '*.scss')
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.minifyCss())
        .pipe(gulp.dest(distDir + "/css"));
});

gulp.task('scripts-dev', function() {
    return gulp.src([jsDir + '*.js'])
        .pipe(gulp.dest(distDir + "/js"))
        .pipe(gulp.dest(distDir + "/js"));
});
gulp.task('scripts-prod', function() {
    return gulp.src([jsDir + '*.js'])
        .pipe(gulp.dest(distDir + "/js"))
        .pipe($.uglify())
        .pipe(gulp.dest(distDir + "/js"));
});



gulp.task('default', ['sass-prod', 'scripts-prod', 'fonts', 'images'], function() {
    gulp.watch(jsDir + '**/*.js', ['scripts-prod']);
    gulp.watch(sassDir + '**/*.scss', ['sass-prod']);
});
gulp.task('dev', ['sass-dev', 'scripts-dev', 'fonts', 'images'], function() {
    gulp.watch(jsDir + '**/*.js', ['scripts-dev']);
    gulp.watch(sassDir + '**/*.scss', ['sass-dev']);
});
gulp.task('install', ['sass-prod', 'scripts-prod', 'fonts']);
