const ViewService = require("./service/ViewService");
const commonUtil = require("./util/commonUtil");
const firestoreUtil = require("./util/firestoreUtil");
const crawlingUtil = require("./util/crawlingUtil");
const imageDownloadUtil = require("./util/imageDownloadUtil");

const BannerImageService = require("./service/BannerImageService");
const ThumbImageService = require("./service/ThumbImageService");
const toonService = require("./service/ToonService");
const toonInfoService = require("./service/ToonInfoService");

const jsTester = {
	assertResult: (caller, unitTest, args) => {
		return new Promise((resolve, reject) => {
			unitTest(args)
				.then(result => {
					if (result === false) {
						console.log(
							"\x1b[1;31m",
							"\b✘[failure]",
							"\x1b[0;30m",
							":",
							caller
						);
						console.trace(result);
						reject(result);
						process.exit(1);
						return false;
					} else {
						console.log(
							"\x1b[1;32m",
							"\b✔[success]",
							"\x1b[0;30m",
							":",
							caller
						);
						// console.log(result);
						return resolve(true);
					}
				})
				.catch(result => {
					console.log(
						"\x1b[1;31m",
						"\b✘[failure]",
						"\x1b[0;30m",
						":",
						caller
					);
					console.trace(result);
					process.exit(1);
				});
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
			if (process.argv[2] === undefined) {
				if (
					unitTest[i].name !== undefined &&
					unitTest[i].name.includes("test")
				)
					testList[testList.length] = unitTest[i];
			} else if (process.argv[2] === "1") {
				if (
					unitTest[i].name !== undefined &&
					!unitTest[i].name.includes("test")
				)
					testList[testList.length] = unitTest[i];
			} else if (process.argv[2] === "2") {
				if (
					unitTest[i].name !== undefined &&
					unitTest[i].name.includes("zzzz")
				)
					testList[testList.length] = unitTest[i];
			}
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
				return commonUtil
					.requestHTML([args[0], ""])
					.then(result => {
						return commonUtil.crawlingHTMLArray([result, args[1]]);
					})
					.then(result2 => {
						if (result2.length > 180) return true;
						console.log(result2.length);
						return false;
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
				return crawlingUtil.crawlToon("ViewCount").then(result => {
					return result[0].toon.toon_info_idx !== undefined;
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
				return crawlingUtil.crawlToonInfo("mon").then(result => {
					if (result.length >= 20) return true;
					console.log(result.length);
					return false;
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
				"http://imgcomic.naver.net/webtoon/641253/thumbnail/" +
					"thumbnail_IMAG02_e046a3f5-9825-495b-a61c-fc8162fa6da4.jpg",
				"http://comic.naver.com/index.nhn"
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
				return imageDownloadUtil.crawlBannerImage().then(result => {
					// console.log(result);
					return true;
				});
			},
			[]
		);
	},

	testCrawlThumbImage: () => {
		return jsTester.assertResult(
			"testCrawlThumbImage",
			() => {
				return imageDownloadUtil.crawlThumbImage().then(result => {
					if (result[0].length >= 170) return true;
					console.log(result[0].length);
					return false;
				});
			},
			[]
		);
	},
	testPromiseSeqOneSec: () => {
		return jsTester.assertResult(
			"testPromiseSeqOneSec",
			args => {
				return commonUtil.promiseSeqOneSec(args).then(result => {
					return true;
				});
			},
			[
				{
					func: a => {
						return new Promise(resolve => {
							resolve(a);
						});
					},
					args: 1
				},
				{
					func: a => {
						return new Promise(resolve => {
							resolve(a);
						});
					},
					args: 2
				},
				{
					func: a => {
						return new Promise(resolve => {
							resolve(a);
						});
					},
					args: 3
				}
			]
		);
	},
	testConvertObj2Doc: () => {
		return jsTester.assertResult(
			"testConvertObj2Doc",
			args => {
				let result1;
				return crawlingUtil
					.crawlToon()
					.then(result => {
						result1 = result;
						return firestoreUtil.convertObjs2Doc(result);
					})
					.then(result2 => {
						if (result1.length === result2.length) {
							return true;
						} else {
							console.log(result1.length, result2.length);
							return false;
						}
					});
			},
			[]
		);
	},
	StoreImageToBucket: () => {
		return jsTester.assertResult(
			"StoreImageToBucket",
			args => {
				let path;
				return commonUtil
					.requestImage([args[0], args[1]])
					.then(result => {
						path =
							args[2] +
							result.req.path.substr(
								result.req.path.lastIndexOf("/") + 1
							);
						return commonUtil.storeImageToBucket([
							result.body,
							path,
							result.headers["content-type"],
							result,
							{}
						]);
					})
					.catch(err => {
						return err;
					})
					.then(() => {
						return commonUtil.isValidImage([path]);
					});
			},
			[
				"http://imgcomic.naver.net/webtoon/641253/thumbnail/" +
					"thumbnail_IMAG02_e046a3f5-9825-495b-a61c-fc8162fa6da4.jpg",
				"http://comic.naver.com/index.nhn",
				"/test/"
			]
		);
	},
	StoreImageToBucket2: () => {
		return jsTester.assertResult(
			"StoreImageToBucket2",
			args => {
				let path;
				return commonUtil
					.requestImage([args[0], args[1]])
					.then(result => {
						path =
							args[2] +
							result.req.path.substr(
								result.req.path.lastIndexOf("/") + 1
							);
						return commonUtil.storeImageToBucket2([
							result.body,
							path,
							result.headers["content-type"],
							result,
							{}
						]);
					})
					.catch(err => {
						return err;
					})
					.then(() => {
						return commonUtil.isValidImage([path]);
					});
			},
			[
				"http://imgcomic.naver.net/webtoon/641253/thumbnail/" +
					"thumbnail_IMAG02_e046a3f5-9825-495b-a61c-fc8162fa6da4.jpg",
				"http://comic.naver.com/index.nhn",
				"/test/"
			]
		);
	},
	FirestoreInsert: () => {
		return jsTester.assertResult(
			"FirestoreInsert",
			args => {
				return firestoreUtil
					.insert(args)
					.then(() => {
						return firestoreUtil.selectList(args[0].model);
					})
					.then(result => {
						for (i in result)
							if (result[i].value !== 10 && result.length !== 2)
								return false;
						return true;
					});
			},
			[
				{
					model: "test",
					key: "1",
					data: {
						value: 10
					}
				},
				{
					model: "test",
					key: "2",
					data: {
						value: 10
					}
				}
			]
		);
	},
	DownloadBannerImageList: () => {
		return jsTester.assertResult(
			"DownloadBannerImageList",
			args => {
				return imageDownloadUtil.crawlBannerImage().then(result => {
					return imageDownloadUtil.downloadImageList(result);
				});
			},
			[]
		);
	},
	_DownloadThumbImageList: () => {
		return jsTester.assertResult(
			"DownloadThumbImageList",
			args => {
				return imageDownloadUtil
					.crawlThumbImage()
					.then(result =>
						imageDownloadUtil.downloadImageList(result)
					);
			},
			[]
		);
	},
	ProcessBannerImageList: () => {
		return jsTester.assertResult(
			"ProcessBannerImageList",
			() => {
				return BannerImageService.createBannerImageToday().then(
					result => {
						return result;
					}
				);
			},
			[]
		);
	},

	ProcessThumbImageList: () => {
		return jsTester.assertResult(
			"ProcessThumbImageList",
			() => {
				return ThumbImageService.createThumbImageToday().then(
					result => {
						return result;
					}
				);
			},
			[]
		);
	},
	CreateToonBySortType: () => {
		return jsTester.assertResult(
			"CreateToonBySortType",
			() => {
				return toonService.createToonBySortType().then(result => {
					return result;
				});
			},
			[]
		);
	},
	CreateToonToday: () => {
		return jsTester.assertResult(
			"CreateToonToday",
			() => {
				return toonService.createToonToday();
			},
			[]
		);
	},
	CreateDataOfToonInfo: () => {
		return jsTester.assertResult(
			"CreateToonInfoByWeekDay",
			() => {
				return toonInfoService.createDataOfToonInfo();
			},
			[]
		);
	},
	CreateToonInfoToday: () => {
		return jsTester.assertResult(
			"CreateToonInfoToday",
			() => {
				return toonInfoService.createToonInfoToday();
			},
			[]
		);
	},
	SelectOneToon: () => {
		return jsTester.assertResult(
			"SelectOneToon",
			() => {
				return crawlingUtil
					.crawlToon()
					.then(result => {
						return firestoreUtil.convertObjs2Doc(result);
					})
					.then(result2 => {
						return firestoreUtil.selectOne(
							result2[0].model,
							result2[0].key
						);
					});
			},
			[]
		);
	},
	SelectOneToonInfo: () => {
		return jsTester.assertResult(
			"SelectOneToonInfo",
			() => {
				return crawlingUtil
					.crawlToonInfo()
					.then(result => {
						return firestoreUtil.convertObjs2Doc(result);
					})
					.then(result2 => {
						return firestoreUtil.selectOne(
							result2[0].model,
							result2[0].key
						);
					});
			},
			[]
		);
	},
	TodayResetAndMain: () => {
		return jsTester.assertResult(
			"TodayResetAndMain",
			() => {
				return ViewService.resetMain()
					.then(() => {
						return ViewService.todayMain();
					})
					.then(result => {
						return (
							result[0][0].length === 28 &&
							result[1][0].length === 1
						);
					});
			},
			[]
		);
	},
	TodayMain: () => {
		return jsTester.assertResult(
			"TodayMain",
			() => {
				return ViewService.todayMain().then(result => {
					return (
						result[0][0].length === 28 && result[1][0].length === 1
					);
				});
			},
			[]
		);
	},
	zzzzTodayList: () => {
		return jsTester.assertResult(
			"TodayList",
			() => {
				return (
					ViewService.resetList()
						.then(() => ViewService.todayList())
						// .then(result => {
						// 	return (
						// 		result[0][0].length === 28 &&
						// 		result[1][0].length === 1
						// 	);
						// })
						.then(r => console.log(JSON.stringify(r, null, 2)))
				);
			},
			[]
		);
	}
};

jsTester.doTest(unitTest);
