# [첫로딩페이지] 대량의 썸네일 sliding carousel

### 1. [첫로딩페이지] 대량의 썸네일 sliding carousel

#### 1)  react-slick 설정 코드

```js
let initSlide = new Date().getDay() == 0 ? 6 : new Date().getDay() - 1;
let settings = {
	initialSlide: initSlide,
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	lazyLoad: "ondemand",
	arrows: false,
	className: "main-contents-slick",
	dotsClass: "main-contents-slick-dots slick-dots",
	customPaging: function(i) {
		let dow = ["월", "화", "수", "목", "금", "토", "일"];
		return <a>{dow[i]}</a>;
	},
	afterChange: function(slide, slide2) {
		var a = $(".main-contents-slick .slick-track").children();
		let n = slide;
		if (n == 0) {
			$(a[1].childNodes[0])
				.find("img.main-contents-toon-thumbnail")
				.hide();
		} else if (n == 6) {
			$(a[5].childNodes[0])
				.find("img.main-contents-toon-thumbnail")
				.hide();
		} else {
			$(a[n - 1].childNodes[0])
				.find("img.main-contents-toon-thumbnail")
				.hide();
			$(a[n + 1].childNodes[0])
				.find("img.main-contents-toon-thumbnail")
				.hide();
		}
	},
	beforeChange: function(slide2, slide) {
		var a = $(".main-contents-slick .slick-track").children();
		let n = slide;
		$(a[n].childNodes[0]).show();
		$(a[n].childNodes[0])
			.find("img.main-contents-toon-thumbnail")
			.show();
		if (n == 0) {
			$(a[1].childNodes[0]).show();
			$(a[2].childNodes[0]).hide();
		} else if (n == 1) {
			$(a[0].childNodes[0]).show();
			$(a[2].childNodes[0]).show();
			$(a[3].childNodes[0]).hide();
		} else if (n <= 2 || n <= 4) {
			$(a[n - 2].childNodes[0]).hide();
			$(a[n - 1].childNodes[0]).show();
			$(a[n + 1].childNodes[0]).show();
			$(a[n + 2].childNodes[0]).hide();
		} else if (n == 5) {
			$(a[6].childNodes[0]).show();
			$(a[4].childNodes[0]).show();
			$(a[3].childNodes[0]).hide();
		} else if (n == 6) {
			$(a[5].childNodes[0]).show();
			$(a[4].childNodes[0]).hide();
		}
	}
};
```

#### 2) lazyLoad 속성

화면에 보이는 요소들만 로딩 "ondemand"속성을 부여하여 필요할 때 마다 요청

한번 요청된 요소들은 삭제하지 않고 afterChange와 beforeChange를 통해 hide, show를 통해 숨기거나 표출

#### 3) afterChange

![image-20180529034315723](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529034315723.png)

현재 3번 기준 2,4번 슬라이드의 틀(웹툰 이름, 작가이름, 별점 등등)만 남기고 나머지는 모두 display none 처리

#### 4) beforeChange 

![image-20180529034442952](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529034442952.png)

현재 3번 슬라이드의 이미지들을 제외하고 2,4번 슬라이드의 이미지들은 모두 display none처리 배경 사진이 차지

#### 5) 해당 화면

beforeChange 월요일에서 화요일화면을 보면 이미지 none		afterChange 금요일에서 월요일로 이동시 아무것도 없음

![image-20180529034843080](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529034843080.png)

#### 6) 얻는 성능의 이점 

1) 브라우저의 한계

브라우저에 200개가 넘는 썸네일 이미지를 전부 show한 상태에서 슬라이드를 하면 멈춘다.

눈에 보이는 것만 보이고 감추면 멈추지 않고 보여진다.

실제로 웹툰 앱을 분석한 결과 네이티브 앱에서도 이 방식을 취하는 것으로 분석하였다.