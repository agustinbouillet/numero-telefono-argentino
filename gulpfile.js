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
gulp.task('js__telefono-argentino', function(){
    return gulp.src([
            'src/telefono-argentino.js'
        ])
        .pipe(concat('telefono-argentino.js'))
        .pipe(uglify(generalCompressOptions))
        .pipe(gulp.dest('dist/'));
});

// Execute
gulp.task('default', gulp.series(
    'js__telefono-argentino'
));