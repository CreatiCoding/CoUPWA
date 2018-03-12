// firebase experimental:functions:shell
const admin = require('firebase-admin');

//IndexedDB 안에 사용자 UUID가 E/NE
//E: 관심 웹툰 추가(사용자가 어떤 웹툰을 추가했는지에 대한 자료 있어야), firestore에 추가
//NE: 사용자 등록, firestore에 추가 -> Client indexedDB 추가


//IndexedDB(TEST)
/* TODO 사용자의 입력을 함수 인자로 받는 방법  */
exports.testFc = function(uuid, toon){
	const db = admin.firestore();
	var docRef = db.collection('IndexedDB');

	//임의로 등록
	docRef.doc('user1').set({
		uuid:'user1'});
	docRef.doc('user2').set({
		uuid:'user2'
	});

	/* TODO USER inputs uuid value */
	//Reference location of docRef is uuid value
	docRef = db.collection('IndexedDB').doc(uuid);

	//UUID가 존재하지 않을 때(test)
	//docRef = db.collection('IndexedDB').doc('user3');

	//search uuid in IndexedDB
	docRef.get().then(function (doc) {
		if(doc.exists){
			console.log("Document data: ", doc.data());
			//관심웹툰추가
			addToon(docRef,toon);
		}
		else{
			console.log("No such document!");
			//사용자  UUID 추가
			addUser(docRef,uuid);

			/* TODO 관심웹툰 추가 */
			addToon(docRef, toon);

		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});

}

//IndexedDB에 사용자 UUID가 없을 때
function addUser(docRef, uuid){
	docRef.set({
		uuid: uuid
	})
}

//IndexedDB에 사용자 UUID가 있을 때 -> 선호 웹툰 업데이트
function addToon(docRef, toon){
	/* TODO 사용자의 관심 웹툰 업데이트 */
	docRef.update({
		Like: toon
	})
}
