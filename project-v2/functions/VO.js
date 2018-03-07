//웹툰
exports.cartoon = () => {
	return {
		TitleId : '',
		Title: '',
		Author: '',
		No:''
	};
};

//사용자
exports.user = () =>{
	return {
		UUID : '',
		RandomId: '',
		Token: '',
		Alarm: ''
	};
};

//웹툰 이미지 리스트
exports.imagelist = () => {
	return {
		ImageID : '',
		Seq: '',
		Path: ''
	};
};
