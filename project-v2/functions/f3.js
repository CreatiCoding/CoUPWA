// firebase experimental:functions:shell

// import the module
const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
const crypto = require('crypto');
const controller = require('./controller');

/* cartoon folder */
/**
 * 웹툰 타이틀아이디, 타이틀, 작가 정보 불러오는 함수
 * titleId : 웹툰 타이틀 아이디
 * title : 웹툰 타이틀
 * author : 웹툰 작가
 * @type {HttpsFunction}
 */
exports.createToon = functions.https.onRequest((request, response) => {
	const titleId = request.body.TitleId;
	const title = request.body.Title;
	const author = request.body.Author;

	saveToon(titleId, title, author);
});

/* TODO TitleId> titleId, title, author 저장 함수 */
function saveToon(titleId, title, author){
	admin.database().ref('cartoon/' + titleId).set({
		TitleId: titleId,
		Title : title,
		Author : author
	}) ;
}

/* series folder */
/**
 * 웹툰 회차 정보를 불러오는 함수
 * no : 웹툰 회차
 * title : 웹툰 타이틀
 * titleId : 웹툰 타이틀 아이디
 * @type {HttpsFunction}
 */
exports.createSeries = functions.https.onRequest((request, response) => {
	const no = request.body.No;
	const title = request.body.Title;
	const titleId = request.body.TitIeId;

	//console.log('Title Id is ' + titleId);
	saveSeries(no, title, titleId);
});

/* TODO TitleId> No, title, titleID 저장 함수 */
function saveSeries(no, title, titleId){
	admin.database().ref('series/'+ titleId).set({
		No: no,
		Title : title,
		TitIeId: titleId
	});
}

/* sequence folder */
/**
 * 웹툰 이미지의 정보를 불러오는 함수
 * imageId : 이미지 아이디
 * seq : 이미지의 순서
 * originalPath : 이미지가 실제로 있는 경로
 * no : 웹툰 회차
 * title : 웹툰 타이틀
 * @type {HttpsFunction}
 */
exports.createSeq = functions.https.onRequest((request, response) => {
	const imageId = request.body.ImageID;
	const seq = request.body.Seq;
	const originalPath = request.body.Path;
	const no = request.body.No;
	const title = request.body.Title;

	saveSeq(imageId, seq, originalPath, no, title);
});


/* TODO ImageId> sequence, original path(image), No, title 저장 함수 */
function saveSeq(imageId, seq, originalPath, no, title){
	admin.database().ref('sequence/ '+ imageId).set({
		ImageID: imageId,
		Seq : seq,
		Path : originalPath,
		No: no,
		Title : title
	});
}

/* userId folder */
/**
 * 앱에 접속한 사용자 정보 정의 함수
 * token : 토큰 값
 * randomId : 사용자에게 임의로 주어지는 아이디
 * @type {HttpsFunction}
 */
/* TODO UUID > token, randomId */
exports.getUser = functions.https.onRequest((request, response) => {
	const token = 'Token';
	let b_uuid =  makeUUID();
	const uuid = b_uuid.trim();

	console.log('UUID is ---'+ uuid +'---');

	const uid =  uuid.slice(0,6);
	const randomId = 'USER' + uid;
	console.log('UID is ' + randomId);

	createUUID(uuid, token, randomId);

});

function makeUUID(){
	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	return crypto.createHash('md5').update(current_date + random).digest('hex');
}

function createUUID(uuid, token, randomId){
	admin.database().ref('userId/ '+ uuid).set({
		Token: token,
		RandomId : randomId
	});
}

/* favorite folder */
/**
 * 사용자가 열었던 웹툰의 회차 정보 저장 함수
 * uuid : 사용자의 uuid
 * titleId : 사용자가 열어본 웹툰의 타이틀 아이디
 * no : 사용자가 열어본 웹툰의 회차 정보
 * @type {HttpsFunction}
 */
/* TODO uuid> uuid, titleId, no */
exports.getUserToon = functions.https.onRequest((request, response) => {
	let b_uuid = makeUUID();
	const uuid = b_uuid.trim();
	const titleId = request.body.TitleId;
	const no = request.body.No;

	console.log('UUID is ' + uuid);
	saveUserToon(uuid, titleId, no);
});

function saveUserToon(uuid, titleId, no){
	admin.database().ref('favorite/ '+ uuid).set({
		UUID: uuid,
		TitleId : titleId,
		No: no,
	});
}

/* alarm permission */
/**
 * 사용자의 알림 수신 여부를 저장하는 함수
 * uuid : 사용자의 uuid
 * titleId : 사용자가 열어본 웹툰의 타이틀 아이디
 * alarm : 사용자의 알림수신 여부
 * @type {HttpsFunction}
 */
/* TODO alarmPermission> uuid, titleId, alarm */
exports.askPermission = functions.https.onRequest((request, response) => {
	let b_uuid = makeUUID();
	const uuid = b_uuid.trim();

	const titleId = request.body.TitleId;
	const alarm = request.body.Alarm;

	console.log('alarm is ' + alarm);
	savePermission(uuid, titleId, alarm);
});

function savePermission(uuid, titleId, alarm){
	admin.database().ref('alarmPermission/ '+ uuid).set({
		UUID: uuid,
		TitleId : titleId,
		Alarm: alarm,
	});
}

/* TODO search uuid of user */
exports.searchUser = functions.https.onRequest((request, response) => {
	let uuid = request.body.UUID.trim();
	let token = request.body.Token;
	let exist = false;


	//if uuid is Null --> this user is a first user
	if(uuid == null){
		console.log('uuid is null space');
		uuid = firstUser();
		console.log('check>> UUID result is ' + uuid);
		response.send({"uuid": uuid, result: true });
	}

	//else --> this user is not a first user
	else{
		const query = admin.database().ref('userId').orderByKey().once('value').then(function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				console.log('uuid is ---' + uuid + '---'); //check element 'uuid'
				//key value is allocated orderly as element value in 'for loop' changed
				let ele = childSnapshot.key;
				let childData = childSnapshot.val().RandomId;

				console.log('randomId is '+ childData);

				/* TODO ele 앞에 NULL space가 추가 --> 수정 필요!! */
				console.log('Element is ---' + ele + '---');

				//compare uuid & ele
				if (uuid == ele) {
					console.log(uuid + 'is same with ' + ele);
					exist = true;
					//push token
					pushToken(uuid, childData, token);
					response.send({result: true });
				}
			});

			//console.log('exist value is ' + exist);

		});

	}

});

function firstUser(){
	const token = 'Token';
	let b_uuid =  makeUUID();
	const uuid = b_uuid.trim();

	const uid =  uuid.slice(0,6);
	const randomId = 'USER' + uid;
	console.log('UID is ' + randomId);

	admin.database().ref('userId/' + uuid).set({
		RandomId: randomId,
		Token : 'token'
	});

	return uuid;
}

function pushToken(uuid, randomId, token) {
	admin.database().ref('userId/' + uuid).set({
		RandomId: randomId,
		Token: token
	});

}


exports.testFc = functions.https.onRequest((request, response) => {
	controller.testFc();
	response.send(true);
});
