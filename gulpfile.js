(function main() {

    var gulp       = require('gulp'),
        karma      = require('gulp-karma'),
        jshint     = require('gulp-jshint'),
        uglify     = require('gulp-uglify'),
        rename     = require('gulp-rename'),
        fs         = require('fs'),
        yaml       = require('js-yaml'),
        browserify = require('browserify'),
        babelify   = require('babelify'),
        config     = yaml.safeLoad(fs.readFileSync('./draft.yml', 'utf8'));

    var compile = function(destPath, entryFile) {

        return browserify({ debug: true })
            .transform(babelify)
            .require(entryFile, { entry: true })
            .bundle()
            .on('error', function (model) { console.error(['Error:', model.message].join(' ')); })
            .pipe(fs.createWriteStream(destPath));

    };

    gulp.task('karma', function() {

        return gulp.src([].concat(config.polyfills, config.src, config.tests))
                   .pipe(karma({
                       configFile: 'karma.conf.js',
                       action: 'run'
                   }))
                   .on('error', function(error) {
                       throw error;
                   });

    });

    gulp.task('lint', function() {

        return gulp.src(config.src)
                   .pipe(jshint())
                   .pipe(jshint.reporter('default', {
                       verbose: true
                   }));

    });

    gulp.task('compile', function() {
        return compile('dist/' + config.release, 'src/Draft.js');
    });

    gulp.task('vendor', function() {
        return compile('public/vendor/draft/' + config.release, 'src/Draft.js');
    });

    gulp.task('minify', ['compile'], function() {

        return gulp.src('dist/' + config.release)
                   .pipe(uglify())
                   .pipe(rename({ suffix: '.min' }))
                   .pipe(gulp.dest('dist'));

    });

    gulp.task('test', ['lint', 'karma']);
    gulp.task('build', ['compile', 'minify']);
    gulp.task('default', ['test', 'build']);

})();