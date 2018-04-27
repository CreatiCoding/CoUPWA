const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const gm = require("gm");
const properties = require("./properties.json");
const gcloud = require("google-cloud");
const bucket = gcloud
	.storage({
		projectId: "react-pwa-webtoon",
		keyFilename: properties.index.serviceAccount
	})
	.bucket("react-pwa-webtoon");

const commonUtil = {
	/**
	 * request module
	 * ex) commonUtil.requestHTML("http://www.naver.com","")
	 * 				.then(result=>{console.log(result);});
	 * */
	requestHTML: args => {
		let url = args.url != undefined ? args.url : args[0];
		let referer = args.referer != undefined ? args.referer : args[1];
		var options = {
			url: url,
			headers: {
				Referer: referer,
				"user-agent": properties.userAgent
			}
		};
		return new Promise((resolve, reject) => {
			request(options, (err, res, body) => {
				if (!err && res.statusCode == 200) {
					resolve(body);
				} else {
					reject(err);
				}
			});
		});
	},
	/**
	 * crawling module
	 * ex) commonUtil
	 * 		.crawlingHTMLArray("<html><div class='target'><li>asd</li></div></html>",".target")
	 * 		.then(result=>{console.log(result);});
	 * */
	crawlingHTMLArray: args => {
		let src = args.src != undefined ? args.src : args[0];
		let selector = args.selector != undefined ? args.selector : args[1];
		//return
		return new Promise((resolve, reject) => {
			let $ = cheerio.load(src);
			let result = $(selector);
			//console.log("result");
			if (result.length == 0) {
				//console.log("result.length", result.length);
				reject(false);
			} else if (result != undefined) {
				resolve(result.map((i, ele) => cheerio(ele).html()));
			} else {
				reject(result);
			}
		});
	},
	/**
	 * requestImage
	 * @param argsurl, referer
	 * @returns {Promise<any>}
	 */
	requestImage: args => {
		let url = args.url != undefined ? args.url : args[0];
		let referer = args.referer != undefined ? args.referer : args[1];
		var options = {
			url: url,
			headers: {
				Referer: referer,
				"user-agent": properties.userAgent
			},
			encoding: null
		};
		return new Promise((resolve, reject) => {
			request(options, (err, res, body) => {
				("use strict");
				if (!err && res.statusCode == 200) {
					resolve(res);
				} else {
					reject([res.statusCode, res.statusMessage]);
				}
			});
		});
	},
	/**
	 * storeImageToBucket
	 * @param args pipe, path,type,tag
	 * @returns {Promise<any>}
	 */
	storeImageToBucket: args => {
		let body = args.body != undefined ? args.body : args[0];
		let path = args.path != undefined ? args.path : args[1];
		let type = args.type != undefined ? args.type : args[2];
		let file = bucket.file(path);
		return new Promise((resolve, reject) => {
			file
				.createWriteStream({
					metadata: {
						contentType: type
					}
				})
				.on("error", function(err) {
					reject(err);
				})
				.on("finish", function() {
					resolve(true);
					// The file upload is complete.
				})
				.end(body);
		});
	},
	isValidImage: args => {
		let path = args.path != undefined ? args.path : args[0];
		let file = bucket.file(path);

		return new Promise((resolve, reject) => {
			file.download((err, contents) => {
				gm(contents).identify((err, data) => {
					if (!err) {
						resolve(true);
					} else {
						reject(err);
					}
				});
			});
		});
	}
};

module.exports = commonUtil;
