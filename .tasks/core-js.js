import {
	src,
	dest,
} from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import sourcemap from 'gulp-sourcemaps';
import {
	readFileSync,
} from 'graceful-fs';

const jsCore = (cb) => {
	const glob = JSON.parse(readFileSync('config.json'));
	const jsVendorList = glob.vendor.js;
	if(jsVendorList.length > 0){
		return src(jsVendorList, {
				allowEmpty: true,
			})
			.pipe(sourcemap.init())
			.pipe(concat('core.min.js'))
			.pipe(uglify())
			.pipe(sourcemap.write('.'))
			.pipe(dest('./_dist/js'))
	} else {
		return cb();
	}
};

module.exports = {
	jsCore
};