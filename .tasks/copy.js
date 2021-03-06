import {
	src,
	dest
} from "gulp";
import {
	readFileSync
} from "graceful-fs";

const copyAssets = () => {
	return src("./src/assets/**/**.{svg,png,jpg,jpeg,gif,mp4,flv,avi,pdf,webp}")
		.pipe(dest("./_dist/assets"))
};

const copyFonts = () => {
	let glob = JSON.parse(readFileSync("config.json"));
	let fontList = glob.vendor.font;
	return src(fontList, {
			allowEmpty: true
		})
		.pipe(dest("./_dist/fonts"));
};

const copyFavicon = () => {
	return src("src/assets/favicon.ico", {
			allowEmpty: true
		})
		.pipe(dest("./_dist"));
};

module.exports = {
	copyAssets,
	copyFonts,
	copyFavicon,
};
