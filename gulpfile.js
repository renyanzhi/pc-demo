
	var gulp = require("gulp");
	var concat = require("gulp-concat");//合并
	var sass = require("gulp-sass");//编译scss文件
	var cleancss = require("gulp-clean-css");//压缩
	var rename = require("gulp-rename");//重命名
	var uglify = require("gulp-uglify");//js压缩混淆
	var inject = require("gulp-inject");//注入
	var connect = require("gulp-connect");//服务器搭建
	var imagemin = require("gulp-imagemin")//图像压缩
	var	watch = require("gulp-watch")//监听

	gulp.task("default",["css","javascript","html","img","server","watch"]);

	gulp.task("css",function(){
		 gulp.src('./resource/**/*.scss')
		.pipe(concat('all.scss'))
		.pipe(sass())
		.pipe(cleancss())
		.pipe(gulp.dest('./dest/css'))
		.pipe(connect.reload());
	});

	gulp.task("javascript",function(){
		 gulp.src('./resource/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(rename('all.min.js'))
		.pipe(gulp.dest('dest/js/'))
		.pipe(connect.reload());
	});

	gulp.task("html",function(){
		 gulp.src('./resource/index.html')
		.pipe(gulp.dest('./dest/'))
		.pipe(inject(gulp.src(['./dest/css/all.css','./dest/js/all.min.js']),{relative:true}))
		.pipe(gulp.dest('dest/'))
		.pipe(connect.reload());
	});

	gulp.task("img",function(){
		gulp.src('./resource/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dest/images/'));
	})

	gulp.task("watch",function(){
		gulp.watch(['./resource/*.html'],['html']);
		gulp.watch(['./resource/**/*.scss'],['css']);
		gulp.watch(['./resource/**/*.js'],['javascript']);
		watch('./resource/images/*',function(){
			gulp.src('./resource/images/*')
			.pipe(gulp.dest('./dest/images/'));
		})
	})//监听

	gulp.task("server",function(){
		connect.server({
			port:8888,
			root:"dest",
			livereload:true
		});
	})

	




/* gulp.src("文件目录")
   .pipe(concat("合并后的文件名称"))
   .pipe(uglify())
   .pipe(rename("新的文件名称"))
   .pipe(gulp.dest("输出目录")); */