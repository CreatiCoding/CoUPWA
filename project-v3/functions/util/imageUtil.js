const gm = require("gm").subClass({imageMagick: true});
const fs = require("fs");

const self = {
	/**
	 * optimizeImage
	 * input : image buffer data
	 * output: image buffer data
	 */
	optimizeImage: buf => {
		return new Promise(resolve => {
			let initImage = buf;
			let prevSize = Number.MAX_SAFE_INTEGER,
				prevSize2 = Number.MAX_SAFE_INTEGER - 1;
			let oneProcess = buf =>
				new Promise((resolve, reject) => {
					// gm으로 이미지(이름은 임시로 test.jpg)를 로드
					return (
						gm(buf, "test.jpg")
							// 압축
							.compress("JPEG")
							.toBuffer("JPEG", function(err, buffer) {
								if (err) {
									console.log(err);
									reject(
										new Error("err" + JSON.stringify(err))
									);
								} else {
									resolve(buffer);
								}
							})
					);
				});
			let resolver = buf => {
				// 두번 이상 결과가 더 커진 경우 더이상 압축될 부분이 없음을 판단 후 반환
				if (prevSize < buf.length && prevSize2 < buf.length) {
					return initImage;
					// 아니라면 최적화 프로세스
				} else {
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
	/**
	 * convertPic2Webp
	 * input : buffer image data
	 * output: buffer image data
	 */
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
