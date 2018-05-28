# [데이터수집] list-page

### 1. [데이터수집] list-page - 회차 정보

#### 1) 회차 정보 크롤링 후 Firestore 에 삽입

```js
/**
 * todayList
 * input : null
 * output: [Promise(result), Promise(result), Promise(result), ...]
 */
todayList: () => {
	// 기존의 웹툰 정보 로드
	return (
		firestoreUtil
			.selectList("toonInfo")
			.then(result => {
				// 회차 정보 크롤링 함수 리스트로 생성
				return result.map(ele => {
					return {
						func: crwalingUtil.doCrwalingToonList,
						args: ele.toon_info_idx
					};
				});
			})
			// 각 크롤링 함수 promise로 1초 간격으로 실행(과부하로 인한 차단 방지)
			.then(r => commonUtil.promiseSeqOneSec(r))
			.then(r => {
				return r.map(ele => {
					return {
						key: ele.toonList.toon_info_idx,
						model: "toonList",
						data: ele.toonList
					};
				});
			})
			.then(r => firestoreUtil.insert(r))
	);
}
```

#### 2) 저장된 결과 확인가능

#### ![image](https://user-images.githubusercontent.com/33514304/40612944-7ad0bd8e-62b7-11e8-917f-8788e3348947.png)




### 2. [데이터수집] list-page - 회차 썸네일 이미지

#### 1) route-cache 활용한 캐싱처리(동일 요청 재크롤링 방지 후 동일 응답)

```js
// const request = require("request");
// const express = require("express");
// const routeCache = require("route-cache");
// const requestImage = express();

// express인 requestImage에 함수를 등록, cacheSeconds를 300으로 초기화하여 300초의 TTL 설정
requestImage.get("/images", routeCache.cacheSeconds(300), (req, res) => {
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
    // 내용물 그대로 전달
	return request(options, (error, response, body) => {
		res.send(body);
	});
});
// Firebase Cloud Funtions 등록 완료
exports.requestImage = functions.https.onRequest(requestImage);
```

#### 2) firebase.json 매핑 설정

```json
"rewrites": [
    {
        "source": "/fc/images",
        "function": "images"
    }
    ...생략...
]
```

### 3) 이미지 다운로드 화면 

![image](https://user-images.githubusercontent.com/33514304/40612947-81c9fd3a-62b7-11e8-92bf-c5281dc29d6a.png)
