const gulp = require("gulp4");
const babel = require("gulp-babel");
const uglyfy = require("gulp-uglify");
const concat = require("gulp-concat");
const del = require("del");

const paths = {

    scripts: {
        src: "src/**/*.js",
        dest: "assets/scripts/"
    },

    jsons: {
        src: "src/**/*.json",
        dest: "assets/jsons/"
    }
};

let clean = () => del(["assets"]);

let scripts = () => {
    return gulp
    .src(paths.scripts.src)
    .pipe(
        babel({
            presets: ["env"]
        })
    )
    .pipe(uglyfy())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}

let jsons = () => {
    return gulp.src(paths.jsons.src).pipe(gulp.dest(paths.jsons.dest));
}

gulp.task("default", gulp.series(clean, scripts, jsons));
gulp.task("clean", clean);
gulp.task("scripts", scripts);
gulp.task("jsons", jsons);