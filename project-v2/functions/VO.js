//웹툰
exports.cartoon = () => {
	return {
		TitleId : '',
		Title: '',
		Author: ''
	};
};

//웹툰 회차
exports.sequence = () =>{
	return {
		No: '',
		Title: '',
		TitleId:'',
	};
};

//웹툰 이미지 리스트
exports.imageList = () => {
	return {
		ImageID : '',
		Seq: '',
		Path: '',
		No: '',
		Title: ''
	};
};

//사용자
exports.user = () =>{
	return {
		UUID : '',
		Token: '',
		RandomId: ''
	};
};

//사용자가 보고 있었던 웹툰 정보
exports.like = () =>{
	return {
		UUID : '',
		TitleId: '',
		No: ''
	};
};

//사용자의 웹툰 업데이트 알람 수신여부
exports.alarm = () =>{
	return {
		UUID : '',
		TitleId: '',
		Alarm: ''
	};
};

//사용자 Token 입력
exports.insert = () =>{
	return {
		UUID : '',
		RandomId: '',
		Token: ''
	};
};
