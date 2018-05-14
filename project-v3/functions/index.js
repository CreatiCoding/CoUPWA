const functions = require("firebase-functions");
const admin = require("firebase-admin");
const properties = require("./properties.json");
const customLoader = require(properties.index.customLoader);
const serviceAccount = require(properties.index.serviceAccount);
const crawlingUtil = require("./util/crawlingUtil");
const commonUtil = require("./util/commonUtil");

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: properties.admin.databaseURL,
		storageBucket: properties.admin.storageBucket
	});
}
for (var i in customLoader) {
	exports[i] = customLoader[i];
}
exports.images = functions.https.onRequest((request, response) => {
	const url =
		request.body.url === undefined
			? request.query.url === undefined ? 0 : request.query.url
			: request.body.url;
	crawlingUtil
		.requestImageCache(url)
		.then(r => {
			response.end(r);
			return true;
		})
		.catch(err => {
			response.json({Err: err});
		});
});

exports.toonDetail = functions.https.onRequest((request, response) => {
	const toon_info_idx =
		request.body.toon === undefined
			? request.query.toon === undefined ? 0 : request.query.toon
			: request.body.toon;
	const toon_data_idx =
		request.body.no === undefined
			? request.query.no === undefined ? 0 : request.query.no
			: request.body.no;

	return commonUtil
		.requestHTML([
			properties.url.toonDetail.value +
				(toon_info_idx + "&no=" + toon_data_idx),
			properties.url.toonDetail.referer
		])
		.then(r => {
			return commonUtil.crawlingHTMLArray([r, ".wt_viewer"]);
		})
		.then(r => {
			return r.prevObject[0].children
				.filter(ele => ele.name === "img")
				.map(ele => ele.attribs.src);
		})
		.then(r => response.json(r));
});
