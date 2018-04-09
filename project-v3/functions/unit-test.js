const commonUtil = require("./common-util");

const jsTester = {
	assertResult: (caller, unitTest) => {
		return new Promise((resolve, reject) => {
			console.log("[", caller, "]");
			unitTest
				.then(result => {
					console.log("result is success!");
					// console.log(result);
					resolve(true);
				})
				.catch(result => {
					console.error("result is error!");
					console.trace(result);
					reject(result);
				});
		});
	},
	testInSequence: testList => {
		var result = Promise.resolve();
		testList.forEach(task => {
			result = result.then(() => task());
		});
		return result;
	}
};
const unitTest = {
	testRequestHtml: () => {
		const unitTest = commonUtil.requestHTML("http://www.naver.com", "");
		return jsTester.assertResult("testRequestHtml", unitTest);
	},
	testCrawlingHTMLArray: () => {
		let HTML =
			"<html><head><title>helloWorld</title></head><body><div class='target'><div class='ele1'>ele1</div><dic class='ele2'>ele2</dic></div></body></html>";
		const unitTest = commonUtil.crawlingHTMLArray(HTML, ".target");
		return jsTester.assertResult("testCrawlingHTMLArray", unitTest);
	}
};

let testList = [];

for (var i in unitTest) {
	if (unitTest[i].name != undefined && unitTest[i].name.includes("test"))
		testList[testList.length] = unitTest[i];
}

jsTester.testInSequence(testList);
