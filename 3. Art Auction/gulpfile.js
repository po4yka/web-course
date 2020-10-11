const { src, dest, parallel, series, task } = require('gulp4');
const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const cleanHTML = require('gulp-htmlmin');
const beautify = require('gulp-beautify');

function clean(cb) {
	console.log("Clean function");
	del(["build"]);
	cb();
};

function templates(cb) {
	console.log("Templates function");
	src('src/client/templates/*.pug')
		.pipe(pug())
		.pipe(cleanHTML())
		.pipe(beautify.html({ indent_size: 4 }))
		.pipe(dest('build/html'));
	cb();
};

function styles(cb) {
	console.log("Styles function");
	src('src/client/styles/*.less')
		.pipe(less())
		.pipe(cleanCSS())
		.pipe(dest('build/css'));
	cb();
};

function code(cb) {
	console.log("Code function");
	src('src/client/js/*.js')
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(concat('app.min.js'))
		.pipe(dest('build/js'));
	cb();
};

function img(cb) {
	console.log("Img function");
	src('src/client/img/**')
		.pipe(dest('build/img'));
	cb();
}

function build(cb) {
	console.log("Build function");
	return parallel(templates, styles, code, img)(cb);
}

exports.clean = clean;
exports.build = build;
exports.default = series(clean, build);