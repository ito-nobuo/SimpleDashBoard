var gulp = require('gulp');

var browserify = require('browserify');
var parcelify = require('parcelify');

var licensify = require('licensify');
var watchify = require('watchify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var uglify = require('gulp-uglify');
var path   = require('path');

var watch = false;
var outputDir = './static/bundle/';

var br = browserify({
    entries: './src/js/app.js', // どのファイルからビルドするか
    cache: {},
    packageCache: {},
    plugin: [licensify]
});

gulp.task('build', function () {
    bundle();
    parcelify(br, {
        bundles: { style: path.join(outputDir, 'bundle.css') }
    });

    if (watch) {
        br = br.plugin('watchify');
    }

    if (watch) {
        br.on('update', bundle);
    }

    return br;
});

function bundle() {
    br.bundle() // browserifyの実行
        .pipe(source('bundle.js')) //出力ファイル名
        .pipe(buffer())
        .pipe(gulp.dest(outputDir)); // 出力先
}

gulp.task('compress', function () {
    return gulp.src(path.join(outputDir, '*.js'))
        .pipe(uglify({
            preserveComments: 'license' // ライセンスコメントを残しつつminify
        }))
        .pipe(gulp.dest(outputDir)); // 出力先
});

gulp.task('watch', function () {
    watch = true;    
});
