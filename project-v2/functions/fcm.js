// firebase experimental:functions:shell

// import the module
const google = require('googleapis');
const functions = require('firebase-functions');
const request = require('request');
const admin = require('firebase-admin');

var serviceAccount = require('./coupwa-firebase-adminsdk-r3x8o-073413f00b.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://coupwa.firebaseio.com',
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!<br>' + response);
});

exports.sendNotification = functions.https.onRequest((request, response) => {
	const token =request.body.Token;
	console.log('token: ', token);


	console.log('Construction the notification message.');
	const payload = {
		notification: {
			body: '푸쉬 푸쉬 메세지 ^^ 성공!!ㅎ하하ㅏ하ㅏ',
			title: 'New Message from \' + \'정석호',
		}
	};
	return admin
		.messaging()
		.sendToDevice(token, payload)
		.then(function(response) {
			console.log('Successfully sent message:', response);
		})
		.catch(function(error) {
			console.log('Error sending message:', error);
		});
});

