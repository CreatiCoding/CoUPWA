const functions = require("firebase-functions");
const admin = require("firebase-admin");
const properties = require("./properties.json");
const customLoader = require(properties.index.customLoader);
const serviceAccount = require(properties.index.serviceAccount);

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: properties.admin.databaseURL,
		storageBucket: properties.admin.storageBucket
	});
}
for (var i in customLoader) {
	exports[i] = customLoader[i];
}

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
