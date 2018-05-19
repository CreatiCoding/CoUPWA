// firebase experimental:functions:shell
const admin = require('firebase-admin');
const voUtil = require('./VO');
const crypto = require('crypto');
//IndexedDB 안에 사용자 UUID가 E/NE
//E: 관심 웹툰 추가(사용자가 어떤 웹툰을 추가했는지에 대한 자료 있어야), firestore에 추가
//NE: 사용자 등록, firestore에 추가 -> Client indexedDB 추가
//IndexedDB(TEST)

//단위테스트
exports.testFc = function () {
	let user1 = voUtil.user();
	let self = this;

	user1.UUID = this.genUUID();


	self.addUser(user1).then(()=>{
		self.findUser(user1).then(doc=> {
			if(doc.exists){
				console.log('Document data: ', doc.data());
				//사용자의 UUID가 존재할 때 <like> UUID, TitleId 추가
                let like1 = voUtil.like();
                like1.TitleId = this.genToon();
                like1.UUID = user1.UUID;
                self.addLike(like1);
			}
			else{
				//console.log(JSON.stringify(doc.exists));
				console.log('No such document!');
				//사용자의 UUID가 존재하지 않을 때 : <user>에 UUID 등록, <cartoon> TitleId 추가
				let user2 = voUtil.user();
				user2.UUID = this.genUUID();

				self.addUser(user2).then(() =>{
					let toon2 = voUtil.cartoon();
					toon2.TitleId = this.genToon();
					self.addToon(toon2);
				})
			}
		})
	});


};


exports.findUser = function(vo) {
	//'user' collection에서 vo.uuid값을 참조해서 데이터를 리턴
	console.log(vo.UUID);
	return admin
		.firestore()
		.collection('user')
		.doc(vo.UUID)
		.get();
};
//IndexedDB에 사용자 UUID가 없을 때
exports.addToon = function(vo) {
	//'cartoon' collection에서 vo.TitleId 데이터 추가
	admin
		.firestore()
		.collection('cartoon')
		.doc(vo.TitleId)
		.set(vo);
};

//IndexedDB에 사용자 UUID가 없을 때
exports.addUser = function(vo) {
	//'user' collection에 해당 uuid값을 참조하여 vo를 추가
	console.log('addUser');
	return admin
		.firestore()
		.collection('user')
		.doc(vo.UUID)
		.set(vo);
};

exports.addLike = function(vo) {
	//'like' collection에 해당 titleId값을 참조하여 vo를 추가
	admin
		.firestore()
		.collection('like')
		.doc(vo.TitleId)
		.set(vo);
};

//IndexedDB에 사용자 UUID가 있을 때 -> 선호 웹툰 업데이트
exports.updateToon = function(vo) {
	// 'cartoon' collection에서 해당 타이틀아이디를 참고해 선호하는 웹툰 업데이트
	admin
		.firestore()
		.collection('cartoon')
		.doc(vo.TitleId)
		.update(vo);
};

//UUID 생성 함수
exports.genUUID = function() {
	let current_date = new Date().valueOf().toString();
	let random = Math.random().toString();
	return crypto
		.createHash('md5')
		.update(current_date + random)
		.digest('hex');
};

//TitleId 랜덤 생성 함수 (임의로 사용자웹툰 정의-테스트)
exports.genToon = function () {
	let randNum = Math.floor(Math.random() * 100) + 1;
	let randToon = 'Toon' + randNum;
	return randToon;
};


