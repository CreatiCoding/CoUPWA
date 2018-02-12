const admin = require('firebase-admin');
const functions = require('firebase-functions');

/**
 * 노희정s
 *  hello world 함수
 */
exports.helloWorld4 = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase4!<br>' + response);
});
