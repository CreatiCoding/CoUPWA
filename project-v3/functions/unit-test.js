const commonUtil = require("./common-util");
const crawlService = require("./service/crawlService");
const imageDownloader = require("./service/imageDownloader");
const BannerImage = require("./model/BannerImage");

const jsTester = {
	assertResult: (caller, unitTest, args) => {
		return new Promise((resolve, reject) => {
			unitTest(args)
				.then(result => {
					if (result === false) {
						console.log("[failure]:", caller);
						console.trace(result);
						reject(result);
					} else {
						console.log("[success]:", caller);
						// console.log(result);
						resolve(true);
					}
				})
				.catch(result => {
					console.log("[failure]:", caller);
					console.trace(result);
					reject(result);
				});
		}).catch(err => {
			throw "error occur";
			console.error(err);
			process.exit(1);
		});
	},
	testInSequence: testList => {
		let result = Promise.resolve();
		testList.forEach(task => {
			result = result.then(() => task()).catch(err => {
				console.log(err);
			});
		});
		return result;
	},
	doTest: unitTest => {
		let testList = [];

		for (var i in unitTest) {
			if (
				unitTest[i].name != undefined &&
				unitTest[i].name.includes("test")
			)
				testList[testList.length] = unitTest[i];
		}

		jsTester.testInSequence(testList);
	}
};

const unitTest = {
	/**
	 * testRequestHtml
	 * requestHTML html 파일 요청 테스트
	 * 실패시 failuer 뜸
	 * @returns {*}
	 */
	testRequestHtml: () => {
		return jsTester.assertResult(
			"testRequestHtml",
			commonUtil.requestHTML,
			["http://www.naver.com", ""]
		);
	},
	/**
	 * testCrawlingHTMLArray
	 * 실패하거나 길이가 0일때 에러 발생
	 * @returns {*}
	 */
	testCrawlingHTMLArray: () => {
		let HTML = `
			<html>
				<head>
					<title>helloWorld</title>
				</head>
				<body>
					<div class='target'>
						<div class='ele1'>ele1</div>
						<div class='ele2'>ele2</div>
					</div>
				</body>
			</html>
			`;
		return jsTester.assertResult(
			"testCrawlingHTMLArray",
			commonUtil.crawlingHTMLArray,
			[HTML, ".target"]
		);
	},
	/**
	 * testNaverWebtoon
	 * 네이버 웹툰 갯수가 196개 이며 아닌경우 오류 발생
	 * @returns {*}
	 */
	testNaverWebtoon: () => {
		return jsTester.assertResult(
			"testNaverWebtoon",
			args => {
				return commonUtil.requestHTML([args[0], ""]).then(result => {
					return commonUtil
						.crawlingHTMLArray([result, args[1]])
						.then(result2 => {
							return result2.length == 197;
						});
				});
			},
			["http://comic.naver.com/webtoon/weekday.nhn", ".title"]
		);
	},
	/**
	 * testCrawlToon
	 * 네이버 웹툰 중 메인 페이지에 있는 웹툰 크롤링
	 * @returns {*}
	 */
	testCrawlToon: () => {
		return jsTester.assertResult(
			"testCrawlToon",
			() => {
				return crawlService.crawlToon("ViewCount").then(result => {
					return result[0].toon_info_idx == 183559;
				});
			},
			[]
		);
	},
	/**
	 * testCrawlToonInfo
	 * 네이버 웹툰 중 요일별로 크롤링
	 */
	testCrawlToonInfo: () => {
		return jsTester.assertResult(
			"testCrawlToonInfo",
			() => {
				return crawlService.crawlToonInfo("mon").then(result => {
					return result.length == 27;
				});
			},
			[]
		);
	},
	/**
	 * testRequestImage
	 * @returns {*}
	 */
	testRequestImage: () => {
		return jsTester.assertResult(
			"testRequestImage",
			commonUtil.requestImage,
			[
				"http://imgcomic.naver.net/webtoon/641253/thumbnail/thumbnail_IMAG02_e046a3f5-9825-495b-a61c-fc8162fa6da4.jpg",
				"http://comic.naver.com/index.nhn"
			]
		);
	},
	/**
	 * testStoreImageToBucket
	 * @returns {*}
	 */
	testStoreImageToBucket: () => {
		return jsTester.assertResult(
			"testStoreImageToBucket",
			args => {
				return commonUtil
					.requestImage([args[0], args[1]])
					.then(result => {
						let path =
							args[2] +
							result.req.path.substr(
								result.req.path.lastIndexOf("/") + 1
							);
						return commonUtil
							.storeImageToBucket([
								result.body,
								path,
								result.headers["content-type"],
								result,
								{}
							])
							.then(() => {
								return path;
							});
					})
					.catch(err => {
						return err;
					})
					.then(result3 => {
						return commonUtil
							.isValidImage([result3])
							.then(result => {
								return result;
							});
					});
			},
			[
				"http://imgcomic.naver.net/webtoon/641253/thumbnail/thumbnail_IMAG02_e046a3f5-9825-495b-a61c-fc8162fa6da4.jpg",
				"http://comic.naver.com/index.nhn",
				"/test/"
			]
		);
	},
	/**
	 * testCrawlBannerImage
	 * @returns {*}
	 */
	testCrawlBannerImage: () => {
		return jsTester.assertResult(
			"testCrawlBannerImage",
			args => {
				return imageDownloader.crawlBannerImage().then(result => {
					// console.log(result);
					return true;
				});
			},
			[]
		);
	},
	testDownloadBannerImage: () => {
		let bannerImage = new BannerImage(
			"20180427027",
			"http://imgcomic.naver.net/webtoon/710649/thumbnail/thumbnail_IMAG02_7956ae54-647e-4ff2-9d69-91241c6bdb31.jpg",
			"710649"
		);
		return jsTester.assertResult(
			"testDownloadBannerImage",
			args => {
				return imageDownloader.crawlBannerImage().then(result => {
					return imageDownloader.downloadBannerImage([result[0]]);
				});
			},
			[]
		);
	},
	testDownloadBannerImageList: () => {
		return jsTester.assertResult(
			"testDownloadBannerImageList",
			args => {
				return imageDownloader
					.crawlBannerImage()
					.then(result => {
						return imageDownloader.downloadBannerImageList([
							result
						]);
					})
					.then(result2 => {
						return result2;
					});
			},
			[]
		);
	}
};

jsTester.doTest(unitTest);
