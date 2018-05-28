# [Firebase Firestore] 오프라인 사용

### 1. [Firebase firestore] 데이터 자체 오프라인 기능 사용

#### 1) 소개

![image](https://user-images.githubusercontent.com/33514304/40628445-13668f68-6300-11e8-9a10-81dda7d0647f.png)

#### 2) Firebase firestore 의 오프라인 데이터 사용 설정시 속도 

10초가량 저하, 체감 성능 저하

#### 3) 기각!



### 2.  [Firebase firestore] sw-toolbox로 동적 리소스 기능

#### 1) 해당 firestore의 request 형태

![image](https://user-images.githubusercontent.com/33514304/40628450-18c5a62e-6300-11e8-86c9-bb547c43184c.png)

#### 2) sw-toolbox 등록해도 매핑 실패 (아래는 sw-toolbox를 내장한 sw-precache 등록 예시)

```js
runtimeCaching: [
	{
		urlPattern: /\/react-pwa-webtoon\/thumb\/.*.(jpg|png|webp)/,
		handler: "cacheFirst"
	},
	{
		urlPattern: /^https:\/\/us-central1-react-pwa-webtoon\.cloudfunctions\.net\/requestImage.*/,
		handler: "cacheFirst"
	},
	{
		urlPattern: /\/react-pwa-webtoon\/banner\/.*.(jpg|png|webp)/,
		handler: "cacheFirst"
	}
]
```

#### 3) 기각!

### 3. [Firebase firestore] localStorage 사용

#### 1) 사용 예

```js
fetchViewBannerImageCaching2: () => {
	let cache = localStorage.getItem(commonUtil.getDateFormat("YYMMDD"));
	if (cache === null) {
		return self.fetchViewBannerImage().then(r => {
			localStorage.setItem(
				commonUtil.getDateFormat("YYMMDD"),
				JSON.stringify(r)
			);
			return r;
		});
	} else {
		return Promise.resolve(JSON.parse(cache));
	}
}
```

#### 2) production 레벨에서 사용 비권장

![image](https://user-images.githubusercontent.com/33514304/40628457-20bd1e7a-6300-11e8-83e7-e0932573b1ed.png)

#### 3) 기각!

### 3. [Firebase firestore] indexedDB 사용 (dexie 오픈 소스 사용)

#### 1) 사용 예

```js
import Dexie from "dexie";

const self = {
	db: new Dexie("coupwa"),
	getViewBannerImage: YYMMDD => {...},
	getViewToon: (YYMMDD, sortType) => {...},
	getToonList: toonInfoIdx => {...},
	addViewToon: (YYMMDD, sortType, data) => {...},
	addViewBannerImage: (YYMMDD, data) => {...},
	addToonList: (toonInfoIdx, data) => {...}
};

// 테이블 생성
self.db.version(4).stores({
	viewToon: "[YYMMDD+sortType]",
	viewBannerImage: "YYMMDD",
	toonList: "toonInfoIdx"
});

export default self;

```

#### 2) Firebase Firestore처럼 속도 저하 없음

#### 3) 선택!







