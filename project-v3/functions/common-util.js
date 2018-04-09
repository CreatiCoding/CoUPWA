const request = require("request");
const cheerio = require("cheerio");

const commonUtil = {
	/**
	 * request module
	 * ex) commonUtil.requestHTML("http://www.naver.com","").then(result=>{console.log(result);});
	 * */
	requestHTML: (url, referer) => {
		var options = {
			url: url,
			headers: {
				Referer: referer,
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
			}
		};
		return new Promise((resolve, reject) => {
			request(options, (err, res, body) => {
				"use strict";
				if (!err && res.statusCode == 200) {
					resolve(res);
				} else {
					reject(err);
				}
			});
		});
	},
	/**
	 * crawling module
	 * ex) commonUtil.crawlingHTMLArray("<html><div class='target'>asd</div></html>",".target").then(result=>{console.log(result);});
	 * */
	crawlingHTMLArray: (src, selector) => {
		return new Promise((resolve, reject) => {
			let $ = cheerio.load(src);
			let result = $(selector);
			if (result) {
				resolve(result.html());
			} else {
				reject(result);
			}
		});
	}
};

module.exports = commonUtil;
