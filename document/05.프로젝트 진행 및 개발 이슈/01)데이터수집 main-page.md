# [데이터수집] main-page

### 1. [데이터수집] main-page - 요일별 웹툰 정보

#### 1) Nodejs의 request, cheerio를 활용하여 크롤링

```js
/**
 * cheerio module
 * input : [ "<html><div class='target'><li>asd</li></div></html>", ".target"]
 * output: Promise("<li>asd</li>")
 * */
crawlingHTMLArray: args => {
	let src = args.src !== undefined ? args.src : args[0];
	let selector = args.selector !== undefined ? args.selector : args[1];
	return new Promise((resolve, reject) => {
		// source에서 selector로 요소를 선택한다.
		let $ = cheerio.load(src);
		let result = $(selector);
		// 결과에 대한 예외처리
		if (result.length === 0) {
			reject(new Error("result length is zero"));
		} else if (result === undefined) {
			reject(new Error("result is undefined"));
		} else {
			resolve(result.map((i, ele) => cheerio(ele).html()));
		}
	});
}
```

```js
/**
 * request module
 * input : [ "http://www.naver.com", "" ]
 * output: Promise("<html>&&~생략~&&</html>")
 * */
requestHTML: args => {
	let url = args.url !== undefined ? args.url : args[0];
	let referer = args.referer !== undefined ? args.referer : args[1];
	var options = {
		url: url,
		headers: {
            Referer: referer,
            "user-agent": properties.userAgent
        }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(err);
            }
        });
    });
}
```

#### 2) 크롤링한 결과를 js 객체로 만들어 firestore 에 저장

```js
/**
 * crawlToon
 * input : "ViewCount" 혹은 "Update", "StarScore", "TitleName"
 * output: Promise([(ToonObject),(ToonObject),(ToonObject), ...])
 */
crawlToon: sortType => {
	sortType = sortType === undefined ? "ViewCount" : sortType;
	return commonUtil
		.requestHTML([
			properties.url.crawlToon.value + "?order=" + sortType,
			properties.url.crawlToon.referer
		])
		.then(result => {
			return commonUtil.crawlingHTMLArray([result, ".thumb"]);
		})
		.then(result2 => {
			return result2.map((i, ele) => {
				return Toon.instance(ele, i + 1, sortType);
			});
		});
},
```

```js
/**
 * createToonBySortType
 * input : "ViewCount" 혹은 "Update", "StarScore", "TitleName"
 * output: false | [(docObject, docObject, ...)]
 */
createToonBySortType: sortType => {
	sortType = sortType !== undefined ? sortType : "ViewCount";
	let lastResult;
	return crawlingUtil
		.crawlToon(sortType)
		.then(result => {
			return firestoreUtil.convertObjs2Doc(result);
		})
		.then(result2 => {
			lastResult = result2;
			return result2;
		})
		.then(result3 => {
			return firestoreUtil.insert(result3);
		})
		.then(result4 => {
			if (lastResult.length === result4[0].length) {
				return lastResult;
			} else {
				console.log(resultArr[0].length, result4[0].length);
				return false;
			}
		});
}
```

```js
/**
 * insert
 * input : insertObject{key, model, data}
 * output: [Promise(result), Promise(result), Promise(result), ...]
 */
insert: insertInfo => {
	const batch = [];
	const result = [];
	for (let i = 0; i < insertInfo.length / 500; i++) {
		let index = batch.length;
		batch[index] = db.batch();
        //배치 개수 최대 500개이므로 잘라서 진행
		for (
			let j = i * 500;
			j < (i + 1) * 500 && j < insertInfo.length;
			j++
		) {
            // pure object로 변환하여 삽입
			batch[index].set(
				db.collection(insertInfo[j].model).doc(insertInfo[j].key),
				JSON.parse(JSON.stringify(insertInfo[j].data))
			);
		}
		result.push(batch[index].commit());
	}
    // 삽입된 결과는 모두 성공 및 완료되었을 때 반영되며 그 결과가 반환
	return Promise.all(result);
}
```

#### 3) 저장된 결과 확인 가능

![image](https://user-images.githubusercontent.com/33514304/40612258-bc516e8c-62b4-11e8-8214-86e23408650b.png)




### 2. [데이터수집] main-page - 배너 이미지, 웹툰 썸네일

#### 1) request를 통해 이미지 다운로드

```js
/**
 * requestImage
 * input : [ "www.url.com/test.png", "www.url.com" ]
 * output: response(httpResponse)
 */
requestImage: args => {
	let url = args.url !== undefined ? args.url : args[0];
	let referer = args.referer !== undefined ? args.referer : args[1];
	// encoding이 null이어야 image가 binary 형식
	const options = {
		url: url,
		headers: {
			Referer: referer,
			"user-agent": properties.userAgent
		},
		encoding: null
	};
	return new Promise((resolve, reject) => {
		request(options, (err, res) => {
			// 정상 요청 완료시 응답 반환
			if (!err && res.statusCode === 200) {
				resolve(res);
			} else {
				// 에러 발생시 에러 출력
				console.log(err);
				if (res === undefined) reject(err);
				else
					reject(
						new Error(
							String(res.statusCode) + res.statusMessage
						)
					);
			}
		});
	});
}
```

#### 2) gm을 통한 이미지 최적화

```js
/**
 * optimizeImage
 * input : image buffer data
 * output: image buffer data
 */
optimizeImage: buf => {
	return new Promise(resolve => {
		let initImage = buf;
		let prevSize = Number.MAX_SAFE_INTEGER,
			prevSize2 = Number.MAX_SAFE_INTEGER - 1;
		let oneProcess = buf =>
			new Promise((resolve, reject) => {
                // gm으로 이미지(이름은 임시로 test.jpg)를 로드
				return gm(buf, "test.jpg")
                	// 압축
					.compress("JPEG")
					.toBuffer("JPEG", function(err, buffer) {
						if (err) {
							console.log(err);
							reject(new Error("err" + JSON.stringify(err)));
						} else {
							resolve(buffer);
						}
					});
			});
		let resolver = buf => {
            // 두번 이상 결과가 더 커진 경우 더이상 압축될 부분이 없음을 판단 후 반환
			if (prevSize < buf.length && prevSize2 < buf.length) {
				return initImage;
            // 아니라면 최적화 프로세스
			} else {
				prevSize2 = prevSize;
				prevSize = buf.length;
				return oneProcess(buf).then(buf => {
					return resolver(buf);
				});
			}
		};
		resolve(resolver(buf));
	});
}
```

#### 3) google cloud storage에 업로드

```js
/**
 * storeImageToBucket
 * input : [body, path, type, res, options]
 * output: Promise({file:Object, image:Object})
 */
storeImageToBucket: args => {
	let body = args.body !== undefined ? args.body : args[0];
	let path = args.path !== undefined ? args.path : args[1];
	let type = args.type !== undefined ? args.type : args[2];
	let res = args.res !== undefined ? args.res : args[3];
	let options = args.options !== undefined ? args.options : args[4];
    //const bucket = gcloud
	//	.storage({
	//		projectId: "react-pwa-webtoon",
	//		keyFilename: properties.index.serviceAccount
	//	})
	// .bucket("react-pwa-webtoon");
	let file = bucket.file(path);
	return new Promise((resolve, reject) => {
		return file
			.createWriteStream({
				metadata: {
					contentType: type
				}
			})
        	// 에러 발생시 이벤트 발생
			.on("error", err => {
				reject(err);
			})
        	// 저장 완료시 이벤트 발생
			.on("finish", () => {
				let preUrl =
					"https://storage.googleapis.com/react-pwa-webtoon";
				let url = preUrl + path;
				console.log(path, "is stored.");
            	// 공유 설정 및 완료시 비동기로 객체 반환
				return file
					.makePublic()
					.then(() => {
						return resolve({
							file: File.instance(res, path, url).file,
							image: Image.instance(res, options).image
						});
					})
					.catch(e => {
						reject(e);
					});
			})
        	// 이미지의 내용물을 담아 닫기
			.end(body);
	});
}
```

#### 4) 저장된 결과 확인 가능

![image](https://user-images.githubusercontent.com/33514304/40612264-c4bc2df0-62b4-11e8-8d51-223d9d288c69.png)
