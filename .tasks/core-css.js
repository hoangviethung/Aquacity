import {
	src,
	dest,
} from 'gulp';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import postcss from 'gulp-postcss';
import cssSort from 'css-declaration-sorter';
import autoprefixer from 'autoprefixer';
import sourcemap from 'gulp-sourcemaps';
import {
	readFileSync,
} from 'graceful-fs';

const cssCore = (cb) => {
	const glob = JSON.parse(readFileSync('config.json'));
	const cssVendorList = glob.vendor.css;
	if(cssVendorList.length > 0){
		return src(cssVendorList, {
				allowEmpty: true,
			})
			.pipe(sourcemap.init())
			.pipe(concat('core.min.css'))
			.pipe(postcss([
				autoprefixer({
					cascade: false,
				}),
				cssSort({
					order: 'concentric-css',
				}),
			]))
			.pipe(cleanCSS({
				compatibility: 'ie8'
			}))
			.pipe(sourcemap.write('.'))
			.pipe(dest('./_dist/css'))
	} else {
		return cb();
	}

};

module.exports = {
	cssCore
}