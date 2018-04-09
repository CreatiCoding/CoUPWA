const functions = require("firebase-functions");
const admin = require("firebase-admin");
const customLoader = require("./firebase-functions.custom.loader");
const serviceAccount = require("./react-pwa-webtoon-firebase-adminsdk-lzrho-58ca6a7389.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://react-pwa-webtoon.firebaseio.com"
});

for (var i in customLoader) {
	exports[i] = customLoader[i];
}

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
