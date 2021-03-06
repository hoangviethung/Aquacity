import {
	watch,
	series,
	parallel
} from "gulp"
import bSync from "browser-sync";
import {
	jsCore
} from "./core-js"
import {
	jsTask,
	jsTask2
} from "./script"
import {
	pugTask
} from "./html"
import {
	cssCore
} from "./core-css"
import {
	cssTask
} from "./css"
import {
	copyAssets
} from "./copy";
import {
	cleanAssets
} from "./clean";

const server = () => {
	bSync.init({
		notify: false,
		server: {
			baseDir: "_dist",
		},
		port: 8000
	})

	watch([
		"src/js/main.js",
		"src/js/lib/**.js"
	], series(jsTask));

	watch([
		"src/js/**.js",
		"!src/js/main.js"
	], series(jsTask2));

	watch([
		"src/**.pug",
		"src/_components/**/**.pug"
	], series(pugTask));

	watch([
		"src/css/**/**.scss"
	], {
		delay: 600
	}, series(cssTask));

	watch([
		"src/assets/**/**.{svg,png,jpg,speg,gif,mp4,flv,avi,pdf}"
	], series(cleanAssets, copyAssets));


	watch([
		"vendors/**/**.css",
		"vendors/**/**.js",
		"config.json"
	], parallel(jsCore, cssCore));

	watch([
		"_dist"
	]).on("change", bSync.reload);
}

module.exports = {
	server
};