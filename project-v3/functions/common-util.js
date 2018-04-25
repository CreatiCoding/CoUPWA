const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const gm = require("gm");
const properties = require("./properties.json");

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
	 * 		.crawlingHTMLArray("<html><div class='target'>asd</div></html>",".target")
	 * 		.then(result=>{console.log(result);});
	 * */
	crawlingHTMLArray: args => {
		let src = args.src != undefined ? args.src : args[0];
		let selector = args.selector != undefined ? args.selector : args[1];
		return new Promise((resolve, reject) => {
			let $ = cheerio.load(src);
			let result = $(selector);
			if (result.length == 0) {
				console.log("result.length", result.length);
				reject(false);
			} else if (result != undefined) {
				resolve(result.map((i, ele) => ele.children[0].data));
			} else {
				reject(result);
			}
		});
	},
	requestImage: (url, referer) => {
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
				"use strict";
				if (!err && res.statusCode == 200) {
					fs.writeFile("./test10.jpg", body);
					//fs.createWriteStream("./test4.jpg").write(body);
					/*
					bucket
						.file("/test7.jpg")
						.createWriteStream({
							metadata: {
								contentType: res.headers["content-type"]
							}
						})
						.on("finish", () => {
							console.log("[다운로드 완료] : " + path);
							resolve("/test7.jpg");
						})
						.on("error", err => {
							console.log("error");
							console.log(err);
						})
						.end(body);
						*/
					resolve(res);
				} else {
					reject(err);
				}
			});
		});
	},
	isValidImage: path => {
		gm(path).identify((err, data) => {
			if (!err) console.log("not corrupt image");
			else console.log(err);
		});
	}
};

module.exports = commonUtil;
