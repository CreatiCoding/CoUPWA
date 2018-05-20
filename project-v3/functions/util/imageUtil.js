const gm = require("gm").subClass({imageMagick: true});
const fs = require("fs");

const self = {
	/**
	 * @input buf
	 * @param buf
	 */
	optimizeImage: buf => {
		return new Promise(resolve => {
			let initImage = buf;
			let prevSize = Number.MAX_SAFE_INTEGER,
				prevSize2 = Number.MAX_SAFE_INTEGER - 1;
			let oneProcess = buf =>
				new Promise((resolve, reject) => {
					return gm(buf, "test.jpg")
						.compress("JPEG")
						.toBuffer("JPEG", function(err, buffer) {
							if (err) {
								console.log(err);
								reject(new Error("err" + JSON.stringify(err)));
							} else {
								resolve(buffer);
							}
						});
				});
			let resolver = buf => {
				if (prevSize < buf.length && prevSize2 < buf.length) {
					//console.log("end loop", prevSize, prevSize2, buf.length);
					return initImage;
				} else {
					//console.log("in loop", prevSize, prevSize2, buf.length);
					prevSize2 = prevSize;
					prevSize = buf.length;
					return oneProcess(buf).then(buf => {
						return resolver(buf);
					});
				}
			};
			resolve(resolver(buf));
		});
	},
	convertPic2Webp: buf => {
		return new Promise(resolve => {
			gm(buf, "test.jpg").toBuffer("webp", function(err, buffer) {
				if (err) {
					console.log(err);
					reject(new Error("err" + JSON.stringify(err)));
				} else {
					resolve(buffer);
				}
			});
		});
	}
};

// Promise.resolve()
// 	.then(() => fs.readFileSync("test.jpg"))
// 	.then(r => {
// 		return self.optimizeImage(r);
// 	})
// 	.then(r => {
// 		return self.convertPic2Webp(r);
// 	})
// 	.then(r => {
// 		return fs.writeFileSync("result.webp", r);
// 	});
module.exports = self;
