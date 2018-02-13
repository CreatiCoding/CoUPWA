const admin = require('firebase-admin');
const functions = require('firebase-functions');

/**
 * 이경진s
 *  hello world 함수
 */
const crypto = require('crypto');

var serviceAccount = require('./coupwa-firebase-adminsdk-r3x8o-073413f00b.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://coupwa.firebaseio.com',
	storageBucket: 'coupwa.appspot.com',
	projectId: 'coupwa',
});


/* cartoon folder */
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
/* TODO UUID > token, randomId */
exports.getUser = functions.https.onRequest((request, response) => {
	const token = 'Token';
	const uuid =  makeUUID();
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
/* TODO uuid> uuid, titleId, no */
exports.getUserToon = functions.https.onRequest((request, response) => {
	const uuid = makeUUID();
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
/* TODO alarmPermission> uuid, titleId, alarm */
exports.askPermission = functions.https.onRequest((request, response) => {
	const uuid = makeUUID();
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
	admin.firebase.database().ref('userId/' + uuid).once('value').then(function(snapshot) {
		var message = snapshot.val();
		console.log("User name is " + message);
	});
});
/*
function search(uuid){
    const uuidRef = admin.firebase.database().ref('userId/' + uuid);
    uuidRef.once('value', function(snapshot){
        var username = snapshot.val() && snapshot.val().username;
        console.log("User name is " + username);
    });

    UUID = username;
}
*/

/* TODO 최초 사용자의 경우, UUID생성 & DB PUSH */
/*
exports.makeUUID = functions.https.onRequest((request, response) => {
    //create uuid for first user
    const uuid = makeUUID();
    firstUser(uuid, "null space");
});


function firstUser(uuid, token){
    //push uuid info in DB
    admin.database().ref('userId/' + uuid).set({
        UUID: uuid,
        Token : token
    });

    response.send({"uuid": uuid, result: true });
}
*/

/* TODO  기존 사용자의 경우 */
/* token, uuid 값이 인자로 들어온 경우, /userId 에 token 추가 */
/*
exports.pushTokenInfo = functions.https.onRequest((request, response) => {
    //search uuid in userId/


});



function  pushToken(uuid, token) {
    admin.database().ref('userId/' + uuid).ser({
        UUID: uuid,
        Token: token
    });

    response.send({result: true});
}
*/

