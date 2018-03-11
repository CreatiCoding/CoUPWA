const admin = require('firebase-admin');

//IndexedDB 안에 사용자 UUID가 E/NE
//E: 관심 웹툰 추가(사용자가 어떤 웹툰을 추가했는지에 대한 자료 있어야), firestore에 추가
//NE: 사용자 등록, firestore에 추가 -> Client indexedDB 추가


//IndexedDB(TEST)
exports.testFc = function(){
	const db = admin.firestore();
	var docRef = db.collection('IndexedDB');

	docRef.doc('user1').set({
		uuid:'user1'});
	docRef.doc('user2').set({
		uuid:'user2'
	});

	//docRef 참조위치 지정
	//docRef = db.collection('IndexedDB').doc('user1');

	//UUID가 존재하지 않을 때(test)
	docRef = db.collection('IndexedDB').doc('user3');

	//search uuid in IndexedDB
	docRef.get().then(function (doc) {
		if(doc.exists){
			console.log("Document data: ", doc.data());
			//관심웹툰추가
			addToon(docRef);
		}
		else{
			console.log("No such document!");
			//사용자  UUID 추가
			addUser(docRef);
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});

}

//IndexedDB에 사용자 UUID가 없을 때
function addUser(docRef){
	docRef.set({
		uuid: 'new user'
	})
}

//IndexedDB에 사용자 UUID가 있을 때 -> 선호 웹툰 업데이트
function addToon(docRef){
	docRef.update({
		Like: '대학일기'
	})
}
