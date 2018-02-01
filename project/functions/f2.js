const admin = require('firebase-admin');
const functions = require('firebase-functions');

/**
 * 강희정s
 *  hello world 함수
 */
exports.helloWorld2 = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase2!<br>' + response);
});
