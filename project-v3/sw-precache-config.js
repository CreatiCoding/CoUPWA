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
		"build/static/**/**.css"
	],
	stripPrefix: "build/",
	bail: true,
	runtimeCaching: [
		{
			urlPattern: /\/react-pwa-webtoon\/thumb\/.*.(jpg|png)/,
			handler: "fastest"
		},
		{
			urlPattern: /^http:\/\/thumb\.comic\.naver\.net\/webtoon\/.*.\.(jpg|png)/,
			handler: "fastest"
		},
		{
			urlPattern: /\/react-pwa-webtoon\/banner\/.*.(jpg|png)/,
			handler: "fastest"
		},
		{
			urlPattern: /https:\/\/www\.google\.com\/images\/cleardot.*./,
			handler: "fastest"
		}
	]
};
