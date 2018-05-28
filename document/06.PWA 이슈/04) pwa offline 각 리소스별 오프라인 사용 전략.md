# [pwa offline] 각 리소스별 오프라인 사용 전략

### 1. 정적 리소스 - 앱셸 - sw-precache-webpack-plugin(sw-precache)

#### 1) package.json 의 스크립트 수정하여 sw-precache 설정 파일 등록

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build && sw-precache --root=build --config=sw-precache-config.js",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
}
```

#### 2) sw-precache-config.js에 정적 리소스를 미리 등록

```js
module.exports = {
    // 배포 할 당시의 시간 문자열을 캐시 아이디로 설정하여 배포된 새로운 서비스 워커가 있을 때마다 갱신
	cacheId: getYYYYMMDDHHmmss(),
	staticFileGlobs: [
		"build/index.html",
		"build/manifest.json",
		"build/service-worker.js",
		"build/images/**.png",
		"build/icon/**.png",
		"build/js/**.js",
		"build/css/**.css",
		"build/favicon.ico",
		"build/static/**/**.js",
		"build/static/**/**.css",
		"build/static/**/**.wott",
		"build/static/**/**.eot",
		"build/static/**/**.ttf",
		"build/static/**/**.svg"
	],
	... 중략 ...
```

#### 3) build 폴더에 있는 내용물 전부 Cache Storage로 등록 

![image-20180529045559400](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529045559400.png)

### 2. 동적 리소스 - google cloud storage 이미지 - sw-toolbox

#### 1) sw-precache-config.js에 동적 리소스를 미리 등록

```js
module.exports = {
	...중략...
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
};

```

### 2) sw-toolbox 사용 결과

![image-20180529045744250](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529045744250.png)

### 3. 동적 리소스 - Firebase firestore json 데이터 - indexedDB

#### 1) indexedDB - opensource dexie 사용 예시

```js
/**
 * getViewBannerImage
 * input : 180529
 * output: {Dexie.Promise<T | undefined>}
 */
getViewBannerImage: YYMMDD => {
	return self.db
		.table("viewBannerImage")
		.get(YYMMDD)
		.then(r => {
			return r;
		});
},
/**
 * addViewToon
 * input : 180529, "ViewCount", {object, [data1, data2,],...}
 * @returns {Dexie.Promise<Key>}
 */
addViewToon: (YYMMDD, sortType, data) => {
	return self.db
		.table("viewToon")
		.add({
			YYMMDD: YYMMDD,
			sortType: sortType,
			data: data
		})
		.catch(e => {
			return data;
		})
		.then(r => {
			if (r.length === 2) {
				return data;
			} else {
				return undefined;
			}
		});
}
```

#### 2) 사용 결과

![image-20180529045913032](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529045913032.png)



### 4. 크롬 오프라인 사용 결과

![image-20180529050741061](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529050741061.png)

![image-20180529050800422](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529050800422.png)![image-20180529050835870](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529050835870.png)