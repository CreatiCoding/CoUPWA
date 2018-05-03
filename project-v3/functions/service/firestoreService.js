const admin = require("firebase-admin");
const properties = require("../properties.json");
const serviceAccount = require("../" + properties.index.serviceAccount);
const commonUtil = require("../common-util");

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
		const batch = [];
		const result = [];
		for (let i = 0; i < insertInfo.length / 500; i++) {
			let index = batch.length;
			batch[index] = db.batch();

			for (
				let j = i * 500;
				j < (i + 1) * 500 && j < insertInfo.length;
				j++
			) {
				batch[index].set(
					db.collection(insertInfo[j].model).doc(insertInfo[j].key),
					JSON.parse(JSON.stringify(insertInfo[j].data))
				);
			}
			result.push(batch[index].commit());
			//console.log(index, batch[index]);
			//result.push({
			//	func: () => {
			//		return batch[index].commit();
			//	},
			//	args: undefined
			//});
		}
		console.log(batch);
		//return commonUtil.promiseSeq(result);
		return Promise.all(result);
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
