const self = {
	getYYMMDD: () => {
		return self.getDateFormat("YYMMDD");
	},
	sliceString: (str, from, end) => {
		return str.substring(str.indexOf(from) + from.length, str.indexOf(end));
	},
	sliceStr: (str, from, size) => {
		return str.substr(str.indexOf(from) + from.length, size);
	},
	strCodePoint: a => {
		while (a.indexOf("&#x") !== -1) {
			a =
				a.slice(0, a.indexOf("&#x")) +
				String.fromCodePoint(
					parseInt(
						"0" +
							a.slice(a.indexOf("&#x") + 2, a.indexOf("&#x") + 7),
						10
					)
				) +
				a.slice(a.indexOf("&#x") + 8);
		}
		return a;
	},
	promiseSeqOneSec: promises => {
		let oneSecFunc = (fc, args, sec) => {
			return new Promise(resolve => {
				setTimeout(
					() => {
						resolve(fc(args));
					},
					1000 * sec,
					{}
				);
			});
		};
		if (promises === undefined) {
			console.log("promises is undefined");
			return null;
		}
		let processPromises = [];
		for (let i = 0; i < promises.length; i++) {
			processPromises.push(
				oneSecFunc(promises[i].func, promises[i].args, i)
			);
		}
		return Promise.all(processPromises);
	},
	promiseSeq: promises => {
		const oneFunc = (fc, args) => {
			return new Promise(resolve => {
				resolve(fc(args));
			});
		};
		let current = oneFunc(promises[0].func, promises[0].args);
		for (let i = 1; i < promises.length; i++) {
			current = current.then(() => {
				return oneFunc(promises[1].func, promises[i].args);
			});
		}
		return current;
	},
	getDateFormat: format => {
		const date = new Date();
		let src = date.toString().split(" ");
		let time = src[4].split(":");
		let month = date.getMonth() + 1;
		const form = {
			yyyy: src[3],
			YYYY: src[3],
			yy: src[3].substr(2, 2),
			YY: src[3].substr(2, 2),
			MMM: src[1],
			MM: parseInt(month / 10, 10) > 0 ? month : "0" + String(month),
			DD: src[2],
			dd: src[2],
			EEE: src[0],
			eee: src[0].toLowerCase(),
			HH: time[0],
			hh: String(parseInt(time[0], 10) % 12),
			mm: time[1],
			SS: time[2],
			ss: time[2]
		};
		for (let i in form) {
			format = format.replace(new RegExp(i, "g"), form[i]);
		}
		return format;
	},
	removeDuplicate: (arr, key) => {
		return arr.filter((obj, index) => {
			return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
		});
	},
	shuffleArray: array => {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
};

module.exports = self;
