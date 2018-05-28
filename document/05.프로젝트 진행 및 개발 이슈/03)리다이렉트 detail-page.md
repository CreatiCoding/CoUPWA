# [리다이렉트] main-page

### 1. [리다이렉트] main-page - 실제 웹툰 조회 페이지

#### 1) 웹툰 작가 저작권 보호 및 스토리지 용량 과부화 방지를 위해 네이버 웹툰 모바일 웹으로 리다이렉트

```js
const ListContents = ({items, toonInfo, toon_info_idx}) => {
	const mapToListContentsWebtoonList = data => {
		return data.map((ele, seq) => {
            // 새로고침할 네이버 웹툰 모바일 웹의 경로
			let href =
				"http://m.comic.naver.com/webtoon/detail.nhn?titleId=" +
				toonInfo.toon_info_idx +
				"&no=" +
				ele.toon_data_idx;
            // 함수 작성
			let onclick = e => {
				e.preventDefault();
				window.location.href = href;
			};
            // li 클릭시 이동 이벤트 등록
			let altDefault = "기본 썸네일";
			return (
				<li
					onClick={onclick}
					key={seq}
					className="sub_toon_lst"
					alt={ele.toon_data_name}
				>
                ...중략...
```

#### 2) 리다이렉트 결과 확인
![image](https://user-images.githubusercontent.com/33514304/40613535-da55696a-62b9-11e8-9c0e-377bb01ca766.png)
