// // var gulpversion = '3';


// var gulp = require('gulp'), 					// Подключаем Gulp
// 	sass = require('gulp-sass'), 				//Подключаем Sass пакет,
// 	browserSync = require('browser-sync'), 		// Подключаем Browser Sync
// 	concat = require('gulp-concat'), 			// Подключаем gulp-concat (для конкатенации файлов)
// 	uglify = require('gulp-uglifyjs'), 			// Подключаем gulp-uglifyjs (для сжатия JS)
// 	cssnano = require('gulp-cssnano'), 			// Подключаем пакет для минификации CSS
// 	rename = require('gulp-rename'), 			// Подключаем библиотеку для переименования файлов
// 	del = require('del'), 						// Подключаем библиотеку для удаления файлов и папок
// 	imagemin = require('gulp-imagemin'), 		// Подключаем библиотеку для работы с изображениями
// 	pngquant = require('imagemin-pngquant'), 	// Подключаем библиотеку для работы с png
// 	cache = require('gulp-cache'), 				// Подключаем библиотеку кеширования
// 	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

// gulp.task('styles', function () {
// 	return gulp.src('app/scss/**/*.scss')
// 		.pipe(sass())																		 // Преобразуем Sass в CSS посредством gulp-sass
// 		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
// 		.pipe(gulp.dest('app/css')) 														 // Выгружаем результата в папку app/css
// 		.pipe(browserSync.reload({ stream: true })) 										 // Обновляем CSS на странице при изменении
// });

// gulp.task('browser-sync', function () {
// 	browserSync({
// 		server: { 											// Определяем параметры сервера
// 			baseDir: 'app' 									// Директория для сервера - app
// 		},
// 		notify: false 										// Отключаем уведомления
// 	});
// });

// gulp.task('scripts', function () {
// 	return gulp.src([ 													// Берем все необходимые библиотеки
// 		'app/libs/jquery/dist/jquery.min.js', 							// Берем jQuery
// 		'app/js/common.js'
// 	])
// 		.pipe(concat('scripts.min.js')) 									// Собираем их в кучу в новом файле libs.min.js
// 		.pipe(uglify()) 												// Сжимаем JS файл
// 		.pipe(gulp.dest('app/js')); 									// Выгружаем в папку app/js
// });


// // gulp.task('css-libs', ['styles'], function () {
// // 	return gulp.src('app/css/libs.css') 								// Выбираем файл для минификации
// // 		.pipe(cssnano()) 												// Сжимаем
// // 		.pipe(rename({ suffix: '.min' })) 								// Добавляем суффикс .min
// // 		.pipe(gulp.dest('app/css')); 									// Выгружаем в папку app/css
// // });

// gulp.task('clean', function () {
// 	return del.sync('dist'); 											// Удаляем папку dist перед сборкой
// });

// gulp.task('img', function () {
// 	return gulp.src('app/img/**/*') 									// Берем все изображения из app
// 		.pipe(cache(imagemin({ 											// С кешированием
// 			interlaced: true,
// 			progressive: true,
// 			svgoPlugins: [{ removeViewBox: false }],
// 			use: [pngquant()]
// 		})))
// 		.pipe(gulp.dest('dist/img')); 									// Выгружаем на продакшен
// });

// gulp.task('clear', function () {
// 	return cache.clearAll();
// })


// // if (gulpversion == 3) {
// // 	gulp.task('watch', ['browser-sync'], function () {
// // 		gulp.watch('app/scss/**/*.scss', ['styles']);
// // 		gulp.watch('app/*.html', browserSync.reload);
// // 		gulp.watch('app/js/**/*.js', browserSync.reload);
// // 	});

// // 	gulp.task('default', ['watch']);
// // }

// // if (gulpversion == 4) {
// 	gulp.task('watch', function () {
// 		gulp.watch('app/scss/**/*.sass', gulp.parallel('styles'));
// 		gulp.watch('app/*.html', browserSync.reload);
// 		gulp.watch('app/js/**/*.js', browserSync.reload);
// 	});

// 	gulp.task('default', gulp.parallel('watch', 'browser-sync', 'css-libs', 'scripts'));
// // }
"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
// const eslint = require("gulp-eslint");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
// const newer = require("gulp-newer");
// const plumber = require("gulp-plumber");
// const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
// const webpack = require("webpack");
// const webpackconfig = require("./webpack.config.js");
// const webpackstream = require("webpack-stream");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./_site/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}

// Optimize Images
function images() {
  return gulp
    .src("./app/img/**/*")
    .pipe(newer("./_site/assets/img"))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./_site/assets/img"));
}

// CSS task
function css() {
  return gulp
    .src("./app/scss/**/*.scss")
    // .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./_site/assets/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./_site/assets/css/"))
    .pipe(browsersync.stream());
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(["./app/js/**/*", "./gulpfile.js"])
    // .pipe(plumber())
    // .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(["./app/js/**/*"])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest("./_site/assets/js/"))
      .pipe(browsersync.stream())
  );
}

// Jekyll
function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
}

// Watch files
function watchFiles() {
  gulp.watch("./app/scss/**/*", css);
  gulp.watch("./app/js/**/*", gulp.series(scriptsLint, scripts));
  gulp.watch(
    [
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
      "./_posts/**/*",
      "./_projects/**/*"
    ],
    gulp.series(jekyll, browserSyncReload)
  );
  gulp.watch("./app/img/**/*", images);
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;