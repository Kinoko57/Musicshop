let gulp=require("gulp");
let uglify=require("gulp-uglify");
let babel=require("gulp-babel");//ES6的编译模块
let htmlmin = require("gulp-htmlmin");//html压塑模板
let cleanCSS=require("gulp-clean-css");
let webserver = require('gulp-webserver');
let sass=require("gulp-sass");//编译sass到css
let imgs=require("gulp-imagemin");//压缩图片
gulp.task("copy",()=>{
	gulp.src("./src/**/*.*").pipe(gulp.dest("./dist"))
})
//复制压缩js

gulp.task("buildJS",()=>{
	//只复制
	gulp.src("./src/scripts/libs/*.js")
		.pipe( gulp.dest("./dist/scripts/libs") )	
	//编译压缩复制
	gulp.src("./src/scripts/*.js")
		.pipe(babel({
            presets: ['env']
        }))
		.pipe( uglify() )
		.pipe( gulp.dest("./dist/scripts") );
})
//复制压缩图片
gulp.task("buildIMG", () =>
    gulp.src("./src/images/**/*.*")
//      .pipe(imagemin())
        .pipe(gulp.dest("./dist/images"))
);
gulp.task("buildHTML",()=>{
	gulp.src("./src/pages/*.*").pipe(gulp.dest("./dist/pages"));
})
gulp.task("buildCSS",()=>{
	gulp.src("./src/styles/**/*.*")
//	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(sass().on('error', sass.logError))
	.pipe(sass())
    .pipe(gulp.dest('./dist/styles'));
})
gulp.task("buildStaticResource", ()=>{
	gulp.src("./src/static/**/*.*").pipe( gulp.dest("./dist") );
})
gulp.task("watching",()=>{
	gulp.watch("./src/**/*.scss",["buildCSS"]);
	gulp.watch("./src/pages/*.*",["buildHTML"]);
	gulp.watch("./src/**/*.js",["buildJS"]);
})
gulp.task('webserver',["watching"],()=>{
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
//    directoryListing: true,
//    open: true,
//	  https:true,
	  port:10000,
	proxies:[
			{
			source:'/list',
			target:'http://shop.yinyuetai.com/shopRec/list.json'
			}
		]
    }));
});
gulp.task("build",["buildJS","buildHTML","buildCSS","buildIMG","buildStaticResource"])