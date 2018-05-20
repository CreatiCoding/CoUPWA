const indexedDB =
	window.indexedDB ||
	window.mozIndexedDB ||
	window.webkitIndexedDB ||
	window.msIndexedDB;

const self = {
	selectOne: (dbName, tableName, key, value) => {
		return self.select(dbName, tableName).then(r => {
			for (let i in r) {
				if (r[i][key] !== undefined && r[i][key] === value) return r[i];
			}
		});
	},
	select: (dbName, tableName) => {
		let flag = false;
		return new Promise(resolve => {
			let open = indexedDB.open(dbName);
			open.onsuccess = e => {
				let storeNames = open.result.objectStoreNames;
				let db = open.result;
				for (let i in storeNames) {
					if (storeNames[i] === tableName) {
						flag = true;
						let tx = db.transaction(tableName, "readwrite");
						let store = tx.objectStore(tableName);
						let result = store.getAll();
						result.onsuccess = r => {
							resolve(r.target.result);
							db.close();
						};
						break;
					}
				}
				if (flag != true) resolve(false);
			};
		});
	},
	insert: (dbName, tableName, data) => {
		let flag = false;
		let dbVersion;
		return new Promise(resolve => {
			let open = indexedDB.open(dbName);
			open.onsuccess = e => {
				dbVersion = parseInt(open.result.version);
				console.log("dbVersion", dbVersion);
				let storeNames = e.target.result.objectStoreNames;
				for (let i in storeNames) {
					if (storeNames[i] === tableName) {
						flag = true;
						let tx = e.target.result.transaction(
							tableName,
							"readwrite"
						);
						let store = tx.objectStore(tableName);
						store.put(data);
						tx.oncomplete = t => {
							resolve(t);
							open.result.close();
						};
						tx.onabort = e => {
							resolve(e);
							open.result.close();
						};
						break;
					}
				}
				if (!flag) {
					open.result.close();
					resolve(false);
				}
			};
		}).then(r => {
			return new Promise(resolve => {
				if (r === false) {
					dbVersion++;
					let open2 = indexedDB.open(dbName, dbVersion);
					open2.onupgradeneeded = e => {
						let db = open2.result;
						let store = db.createObjectStore(tableName, {
							autoIncrement: true
						});
						let result = store.put(data);
						result.onsuccess = r => {
							resolve(r);
							db.close();
						};
					};
				} else if (r.type === "abort") {
					resolve(r);
				} else if (r.type === "complete") {
					resolve(r);
				} else {
					resolve(r);
				}
			});
		});
	}
};

module.exports = self;
