# [travis-ci] 단위 테스트 자동화

### 1. [travis-ci] 푸시, Pull Request에 자동으로 등록

#### 1) tarvis-ci 등록

```bash
language: node_js
node_js:
  - "9"
script:
  - cd ./project-v3/functions && npm install && npm test && cd ../../
```

```json
	// pacakge.json에 등록되어있는 npm install
	"test": "node unit-test.js"
```

```js
/**
 * assertResult
 * 테스트 결과를 확인하여 true면 성공 false면 실패를 출력
 */
assertResult: (caller, unitTest, args) => {
	return new Promise((resolve, reject) => {
		unitTest(args)
			.then(result => {
				if (result === false) {...} else {...}
			})
			.catch(result => {...});
	});
},
/**
 * testInSequence
 * 테스트 함수들을 순서대로 실행하는 프로미스 기법 함수
 */
testInSequence: testList => {
	let result = Promise.resolve();
	testList.forEach(task => {
		result = result.then(() => task()).catch(err => {
			console.log(err);
		});
	});
	return result;
},
/**
 * doTest
 * 테스트 함수들을 실행해주는 함수
 * 분기를 타서 travis에서 가능한 테스트와 불가능한 테스트를 나눔
 * @param unitTest
 */
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
		}
	}

	jsTester.testInSequence(testList);
}
    
// unitTest 는 테스트 함수들이 들어있는 배열
jsTester.doTest(unitTest);
```

#### 2) 현재 사용중인 테스트 함수들

![image](https://user-images.githubusercontent.com/33514304/40628396-bdf2cc0e-62ff-11e8-89ee-2dd3833be628.png)

####3) 푸시 및 Pull Request 화면

![image](https://user-images.githubusercontent.com/33514304/40628406-ce232aec-62ff-11e8-8116-b8345f16a6c3.png)

#### 4) 결과화면(travis-ci.org)

![image](https://user-images.githubusercontent.com/33514304/40628410-d31cd156-62ff-11e8-85e6-c35dff4c3b30.png)

#### 5) Firebase 권한이 필요한 테스트 함수는 직접 실행

![image](https://user-images.githubusercontent.com/33514304/40628413-d7555c48-62ff-11e8-90f9-cc55ec21b88d.png)

##### 주의: travis 는 public의 레파지토리의 경우 소스코드가 공개된 경우만 테스트 가능하므로 키 파일 노출 주의

 
