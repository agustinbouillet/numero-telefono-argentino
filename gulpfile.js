var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var generalCompressOptions = {
    compress: {
        drop_console: true
    }
};


/**
 * Monitor
 * Mapa
 */
gulp.task('js__telefonos_argentinos', function(){
    return gulp.src([
            'src/telefonos_argentinos.js'
        ])
        .pipe(concat('telefonos_argentinos.js'))
        .pipe(uglify(generalCompressOptions))
        .pipe(gulp.dest('dist/'));
});

// Execute
gulp.task('default', gulp.series(
    'js__telefonos_argentinos'
));