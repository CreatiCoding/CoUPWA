const admin = require('firebase-admin');
const functions = require('firebase-functions');

/**
 * 이경진s
 *  hello world 함수
 */
exports.helloWorld3 = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase3!<br>' + response);
});
