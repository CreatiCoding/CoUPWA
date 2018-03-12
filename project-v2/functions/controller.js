// firebase experimental:functions:shell
const admin = require('firebase-admin');
const voUtil = require('./VO');
const crypto = require('crypto');
//IndexedDB 안에 사용자 UUID가 E/NE
//E: 관심 웹툰 추가(사용자가 어떤 웹툰을 추가했는지에 대한 자료 있어야), firestore에 추가
//NE: 사용자 등록, firestore에 추가 -> Client indexedDB 추가


//IndexedDB(TEST)
/* TODO 사용자의 입력을 함수 인자로 받는 방법  */
exports.testFc = function(){

	//voUtil을 이용해 user 객체 생성
	let user1 = voUtil.user();
	let user2 = voUtil.user();

	//새로 생성된 user들의 uuid 생성
	user1.uuid = this.genUUID();

	//addUser를 통해 위 user들을 'user' collection에 추가
	this.addUser(user1).then(function () {
		
	})

	console.log(user1.uuid);
	this.findUser(user1).then(function (doc) {//findUser이 반환한 데이터가 E/NE인지 함수 실행
		if(doc.exists){
			console.log("Document data: ", doc.data());

			//likeVo라는 객체 생성
			let like1 = voUtil.like();

			// likeVo.뭔가 = 값;
			like1.titleId = 'webtoon1';
			addLike(like1);
		}
		else{
			console.log(JSON.stringify(doc));
			console.log("No such document!");
/*
			//addUser함수를 통해 user1 추가
			//addUser(user1);

			let like1 = voUtil.like();
			like1.titleId = 'webtoon2';

			// likeVo.뭔가 = 값;

			addLike(like1);
*/
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});

}

exports.findUser = function(vo){
	//'user' collection에서 vo.uuid값을 참조해서 데이터를 리턴
	console.log(vo.uuid);
	return admin.firestore().collection('user').doc(vo.uuid).get();
}
//IndexedDB에 사용자 UUID가 없을 때
exports.addToon = function (vo){
	//'cartoon' collection에서 vo.TitleId 데이터 추가
	admin.firestore().collection('cartoon').doc(vo.TitleId).set(vo);
}

//IndexedDB에 사용자 UUID가 없을 때
exports.addUser = function (vo){
	//'user' collection에 해당 uuid값을 참조하여 vo를 추가
	admin.firestore().collection('user').doc(vo.uuid).set(vo);
}

exports.addLike = function (vo){
	//'like' collection에 해당 titleId값을 참조하여 vo를 추가
	admin.firestore().collection('like').doc(vo.titleId).set(vo);
}

//IndexedDB에 사용자 UUID가 있을 때 -> 선호 웹툰 업데이트
exports.updateToon = function (vo){
	// 'cartoon' collection에서 해당 타이틀아이디를 참고해 선호하는 웹툰 업데이트
	admin.firestore().collection('cartoon').doc(vo.TitleId).update(vo);
}

//UUID 생성 함수
exports.genUUID = function(){
	let current_date = (new Date()).valueOf().toString();
	let random = Math.random().toString();
	return crypto.createHash('md5').update(current_date + random).digest('hex');
};
