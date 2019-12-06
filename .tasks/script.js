import {
	src,
	dest
} from "gulp";
import babel from "gulp-babel-minify";
import rename from "gulp-rename";
import plumber from "gulp-plumber";
import uglifyBabel from "gulp-terser";
import sourcemap from "gulp-sourcemaps";
import babelify from "babelify";
import browserify from "browserify";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";

const jsTask = () => {
	return browserify({
			basedir: '.',
			entries: ['src/js/main.js'],
			debug: true,
			sourceMaps: true
		})
		.transform(babelify, {
			presets: ["@babel/preset-env"]
		})
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(plumber(function(err) {
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemap.init({
			loadMaps: true
		}))
		.pipe(uglifyBabel())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(sourcemap.write('.'))
		.pipe(dest('./_dist/js'));
};

const jsTask2 = () => {
	return src([
			'src/js/**.js',
			'!src/js/main.js'
		])
		.pipe(plumber(function(err) {
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemap.init({
			loadMaps: true
		}))
		.pipe(babel({
			mangle: {
				keepClassName: true
			}
		}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(sourcemap.write('.'))
		.pipe(dest('./_dist/js'));
}

module.exports = {
	jsTask,
	jsTask2
};