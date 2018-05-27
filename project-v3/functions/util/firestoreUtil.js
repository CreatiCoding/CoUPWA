const admin = require("firebase-admin");
const properties = require("../properties.json");
let db;

if (process.argv[2] !== undefined) {
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
	convertObjs2Doc: obj => {
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
		// Get a new write batch
		const batch = [];
		const result = [];
		for (let i = 0; i < insertInfo.length / 500; i++) {
			let index = batch.length;
			batch[index] = db.batch();
			console.log(insertInfo[i]);
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
		}
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
					throw new Error("No such document!");
				} else {
					return doc.data();
				}
			});
	},
	deleteCollection: model => {
		return db
			.collection(model)
			.get()
			.then(snapshot => {
				if (snapshot.size === 0) {
					return 0;
				}

				// Get a new write batch
				const batch = [];
				const result = [];
				for (let i = 0; i < snapshot.size / 500; i++) {
					let index = batch.length;
					batch[index] = db.batch();
					for (
						let j = i * 500;
						j < (i + 1) * 500 && j < snapshot.size;
						j++
					) {
						batch[index].delete(snapshot.docs[j].ref);
					}
					result.push(batch[index].commit());
				}
				return Promise.all(result);
			});
	},
	reset: docNames => {
		let promises = [];
		for (let i in docNames)
			promises.push(self.deleteCollection(docNames[i]));
		return Promise.all(promises).then(result => console.log(result));
	}
};

module.exports = self;
