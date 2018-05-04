const admin = require("firebase-admin");
const properties = require("../properties.json");
const commonUtil = require("../common-util");
let db;

if (process.argv[2] != undefined) {
	try {
		admin.app();
	} catch (e) {
		admin.initializeApp({
			credential: admin.credential.cert(
				require("../" + properties.index.serviceAccount)
			),
			databaseURL: properties.admin.databaseURL,
			storageBucket: properties.admin.storageBucket
		});
	}

	db = admin.firestore();
}

const self = {
	convertObj2Doc: obj => {
		let arr = [];
		for (let i = 0; i < obj.length; i++) {
			let model = Object.keys(obj[i])[0];
			let data = obj[i][model];
			let key = data[Object.keys(data)[0]];
			arr.push({
				model: model,
				key: key,
				data: data
			});
		}
		return arr;
	},
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
		// console.log(batch);
		//return commonUtil.promiseSeq(result);
		return Promise.all(result);
	},
	selectList: model => {
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
	},
	selectOne: (model, key) => {
		return db
			.collection(model)
			.doc(key)
			.get()
			.then(doc => {
				if (!doc.exists) {
					throw "No such document!";
				} else {
					return doc.data();
				}
			});
	}
};

module.exports = self;
