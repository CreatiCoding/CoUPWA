const admin = require("firebase-admin");
const properties = require("../properties.json");
const serviceAccount = require("../" + properties.index.serviceAccount);

try {
	admin.app();
} catch (e) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: properties.admin.databaseURL,
		storageBucket: properties.admin.storageBucket
	});
}

const db = admin.firestore();
const self = {
	insert: insertInfo => {
		//let insertInfo =
		//	args.insertInfo != undefined ? args.insertInfo : args[0];
		if (insertInfo.length == 1) {
			return db
				.collection(insertInfo[0].model)
				.doc(insertInfo[0].key)
				.set(insertInfo[0].data);
		}

		// Get a new write batch
		const batch = db.batch();
		for (let i = 0; i < insertInfo.length; i++) {
			batch.set(
				db.collection(insertInfo[i].model).doc(insertInfo[i].key),
				JSON.parse(JSON.stringify(insertInfo[i].data))
			);
		}
		return batch.commit();
	},
	select: model => {
		return db
			.collection(model)
			.get()
			.then(snapshot => {
				let promises = [];
				snapshot.forEach(doc => {
					promises.push(doc);
				});
				return Promise.all(promises);
			})
			.then(docs => {
				return docs.map(ele => ele.data());
			});
	}
};

module.exports = self;
