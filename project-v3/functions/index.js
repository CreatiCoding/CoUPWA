const functions = require("firebase-functions");
const admin = require("firebase-admin");
const properties = require("./properties.json");
const customLoader = require(properties.index.customLoader);
const serviceAccount = require(properties.index.serviceAccount);
const crawlingUtil = require("./util/crawlingUtil");
const commonUtil = require("./util/commonUtil");
const request = require("request");

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

/**
 * imagePipe
 * @paramter	url, referer
 * referer로 이미지(url)요청해 받습니다.
 */
exports.images = functions.https.onRequest((req, res) => {
	const url =
		req.body.url === undefined
			? req.query.url === undefined ? "" : req.query.url
			: req.body.url;
	const options = {
		headers: {
			Referer: properties.url.toonDetail.referer,
			"User-Agent": properties.userAgent
		},
		url: url,
		encoding: null
	};
	return request(options).pipe(res);
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
