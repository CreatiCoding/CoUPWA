let appBuild = "./build";

let getYYYYMMDDHHmmss = () => {
	let date = new Date();
	let src = date.toString().split(" ");
	let month = date.getMonth() + 1;
	let time = src[4].split(":");
	return (
		src[3] +
		(parseInt(String(month / 10)) > 0 ? month : "0" + String(month)) +
		src[2] +
		time[0] +
		time[1] +
		time[2]
	);
};

module.exports = {
	cacheId: getYYYYMMDDHHmmss(),
	staticFileGlobs: [
		"build/index.html",
		"build/manifest.json",
		"build/service-worker.js",
		"build/images/**.png",
		"build/icon/**.png",
		"build/js/**.js",
		"build/css/**.css",
		"build/favicon.ico",
		"build/static/**/**.js",
		"build/static/**/**.css",
		"build/static/**/**.wott",
		"build/static/**/**.eot",
		"build/static/**/**.ttf",
		"build/static/**/**.svg"
	],
	stripPrefix: "build/",
	bail: true,
	runtimeCaching: [
		{
			urlPattern: /\/react-pwa-webtoon.appspot.com\/thumb\/.*.(jpg|png|webp)/,
			handler: "cacheFirst"
		},
		{
			urlPattern: /^https:\/\/us-central1-react-pwa-webtoon\.cloudfunctions\.net\/requestImage.*/,
			handler: "cacheFirst"
		},
		{
			urlPattern: /\/react-pwa-webtoon.appspot.com\/banner\/.*.(jpg|png|webp)/,
			handler: "cacheFirst"
		}
	]
};
