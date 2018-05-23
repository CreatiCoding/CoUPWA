const indexedDB =
	window.indexedDB ||
	window.mozIndexedDB ||
	window.webkitIndexedDB ||
	window.msIndexedDB;

const self = {
	isNotExistCreateTable: (dbName, tableName, key) => {
		return self
			.existsTable(dbName, tableName)
			.then(exists => {
				if (exists) {
					return {name: tableName};
				} else {
					return self.createTable(dbName, tableName, key);
				}
			})
			.then(r => {
				if (r.name === tableName) return true;
				else return false;
			});
	},
	selectOne: (dbName, tableName, key, value) => {
		return self.select(dbName, tableName).then(r => {
			for (let i in r) {
				if (r[i][key] !== undefined && r[i][key] === value) return r[i];
			}
		});
	},
	createTable: (dbName, tableName, key) => {
		let flag = false;
		let dbVersion;
		return new Promise(resolve => {
			let request = indexedDB.open(dbName);
			let db;

			request.onsuccess = e => {
				db = request.result;
				dbVersion = parseInt(db.version);
				db.close();
				return resolve(true);
			};
			request.onerror = e => {
				e.target.result.close();
				return resolve(false);
			};
		}).then(result => {
			if (result === false) {
				return false;
			}
			return new Promise(resolve => {
				let request = indexedDB.open(dbName, dbVersion + 1);
				request.onupgradeneeded = e => {
					let db = request.result;
					let r = db.createObjectStore(tableName, {keyPath: key});
					db.close();
					resolve(r);
				};
			});
		});
	},
	existsTable: (dbName, tableName) => {
		return new Promise(resolve => {
			let open = indexedDB.open(dbName);
			open.onsuccess = () => {
				let db = open.result;
				let nameList = db.objectStoreNames;
				for (let i in nameList) {
					if (nameList[i] === tableName) {
						db.close();
						return resolve(true);
					}
				}
				db.close();
				return resolve(false);
			};
			open.onerror = e => {
				return resolve(false);
			};
		});
	},
	selectByKey: (dbName, tableName, keyValue) => {
		let flag = false;
		return new Promise(resolve => {
			let request = indexedDB.open(dbName);
			request.onsuccess = e => {
				let db = request.result;
				let tx = db.transaction(tableName, "readwrite");
				let store = tx.objectStore(tableName);
				let result = store.get(keyValue);
				result.onsuccess = s => {
					db.close();
					resolve(result);
				};
				result.onerror = e => {
					db.close();
					resolve(false);
				};
			};
		});
	},
	select: (dbName, tableName) => {
		let flag = false;
		return new Promise(resolve => {
			let request = indexedDB.open(dbName);
			request.onsuccess = e => {
				let db = request.result;
				let tx = db.transaction(tableName, "readwrite");
				let store = tx.objectStore(tableName);
				let result = store.getAll();
				result.onsuccess = s => {
					db.close();
					resolve(result);
				};
				result.onerror = e => {
					db.close();
					resolve(false);
				};
			};
		});
	},
	insertList: (dbName, tableName, arr) => {
		let promises = [];
		for (let i = 0; i < arr.length; i++) {
			promises.push(self.insert(dbName, tableName, arr[i]));
		}
		return Promise.all(promises);
	},
	insert: (dbName, tableName, data) => {
		let dbVersion;
		return new Promise(resolve => {
			let request = indexedDB.open(dbName);
			request.onblocked = function(event) {
				console.log("It is already opened.");
			};
			request.onsuccess = e => {
				let db = request.result;
				dbVersion = parseInt(db.version);
				let tx = db.transaction(tableName, "readwrite");
				let store = tx.objectStore(tableName);

				store.add(data);
				tx.oncomplete = t => {
					db.close();
					console.log(t);
					resolve(t);
				};
				tx.onerror = e => {
					db.close();
					console.log(e);
					resolve(e);
				};
			};
		});
	}
};

module.exports = self;
