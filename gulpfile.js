var gulp = require("gulp"),
    $ = require("gulp-load-plugins")();

const config = {
    styles:{
        src:[],
        srcDirectory:[],
        dest:""
    },
    scripts:{
        src:["./js/**/*.js"],
        dest:"./src"
    }
};

gulp.task("dev:scripts",()=>{
    return gulp
        .src(config.scripts.src)
        .pipe(gulp.dest(config.scripts.dest))
        .pipe($.livereload());
});

gulp.task("watch",gulp.series("dev:scripts",
    ()=>{
        $.livereload.listen();
        gulp.watch(config.scripts.src, gulp.series("dev:scripts"));
    }
));