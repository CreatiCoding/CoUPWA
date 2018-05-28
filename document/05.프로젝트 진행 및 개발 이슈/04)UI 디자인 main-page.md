# [UI 디자인] main-page

### 1. [UI 디자인] main-page - 모바일 웹 브라우저 주소창에 의한 메인 메뉴 고정 실패

#### 1) 문제의 화면

![image-20180529015010055](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529015010055.png)

#### 2) 임시 해결법 - 홈화면 아이콘 추가로 실행

![image-20180529015343499](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529015343499.png)

#### 3) 근본적 해결법 - css 디자인 수정, 내부 디자인

​	-> body를 디바이스 화면 높이로 고정 후 내부 div에서 scroll 이용 시 해결 가능

​	-> 시간관계상 미구현 미해결

### 2. [UI 디자인] iOS safari 에서 부트스트랩 반응형 grid 시스템 오류

#### 1) 문제의 화면

![image-20180529020545086](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529020545086.png)

#### 2) 해결법 - media query를 활용한 css 동작, 크롬과 사파리 동시 만족

```css
@media all and (max-width: 576px) {
	.main-contents-toon {
		min-width: 32vw;
		max-width: 32vw;
	}

	.main-contents-toon-img {
		min-width: 32vw;
	}

	.main-contents-toon-img img {
		width: 32vw;
	}
	.slick-slide .row{
		padding: 0 1.5vw 0 1.5vw;
	}
}
@media (min-width: 540px) and (max-width: 768px) {
	.main-contents-toon {
		min-width: 24vw;
		max-width: 24vw;
	}

	.main-contents-toon-img {
		min-width: 24vw;
	}

	.main-contents-toon-img img {
		width: 24vw;
	}
	.slick-slide .row{
		padding: 0 1.5vw 0 1.5vw;
	}
}
@media (max-width: 979px) and (min-width: 768px) {
	.main-contents-toon {
		min-width: 15vw;
		max-width: 15vw;
	}

	.main-contents-toon-img {
		min-width: 15vw;
	}
	...중략...
```

#### 3) 해결 화면

![image-20180529020731873](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529020731873.png)