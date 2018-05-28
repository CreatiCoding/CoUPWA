# [UI 디자인] main-page

### 1. [UI 디자인] main-page - 모바일 웹 브라우저 주소창에 의한 메인 메뉴 고정 실패

#### 1) 문제의 화면

![image](https://user-images.githubusercontent.com/33514304/40624310-c70585b6-62e6-11e8-94a0-a3b3d02c3682.png)


#### 2) 임시 해결법 - 홈화면 아이콘 추가로 실행

![image](https://user-images.githubusercontent.com/33514304/40624311-cd168176-62e6-11e8-9571-81072c542166.png)

#### 3) 근본적 해결법 - css 디자인 수정, 내부 디자인

​	-> body를 디바이스 화면 높이로 고정 후 내부 div에서 scroll 이용 시 해결 가능

​	-> 시간관계상 미구현 미해결

### 2. [UI 디자인] iOS safari 에서 부트스트랩 반응형 grid 시스템 오류

#### 1) 문제의 화면

![image](https://user-images.githubusercontent.com/33514304/40624317-d5b1845c-62e6-11e8-95c7-76858b4cb6eb.png)

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

![image](https://user-images.githubusercontent.com/33514304/40624323-deb31b60-62e6-11e8-822d-0a5a8b9b6710.png)
