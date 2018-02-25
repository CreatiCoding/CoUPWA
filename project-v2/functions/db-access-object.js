const admin = require('firebase-admin');
const commonUtil = require('./commonUtil');

exports.once = (path) => {
    return admin
        .database()
        .ref(path)
        .once('value');
};

exports.insertBannerToday = paths => {
    const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '');
    return admin
        .database()
        .ref('/bannerToday/' + today)
        .set({
            image0: paths[0],
            image1: paths[1],
            image2: paths[2],
            image3: paths[3],
            image4: paths[4],
            image5: paths[5],
        });
};

exports.insertBanner = (fileName, titleId, title, path, ext) => {
    return admin
        .database()
        .ref('banner/' + fileName)
        .set({
            TitleId: titleId,
            Title: title,
            Path: path,
            Ext: ext,
        });
};

exports.selectBannerYesterday = () => {
    const today = new Date(new Date().getTime() + -15 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '');
    return admin
        .database()
        .ref('/bannerToday/' + today)
        .once('value');
};

exports.selectWeekAllToon = () => {
    return admin
        .database()
        .ref('/weekAllToon')
        .once('value');
};

exports.insertReceiver = data => {
	admin
		.database()
		.ref('/receiver/' + data)
		.set({
			data: data,
		});
};
exports.insertWeekAllToon = data => {
	data.map((ele, seq, arr) => {
		admin
			.database()
			.ref('/weekAllToon/' + ele.weekDay +"_" +commonUtil.int2DD(ele.seqCount)+"_" + ele.titleId)
			.set({
				titleId: ele.titleId,
				imgUrl: ele.imgUrl,
				title: ele.title,
				weekDay: ele.weekDay,
				seqUpdate: ele.seqUpdate,
				seqCount: ele.seqCount,
				seqRate: ele.seqRate,
				seqTitle: ele.seqTitle,
				author: ele.author,
				rate: ele.rate,
				update: ele.update,
				path: ele.path,
			});
	});
};

exports.deleteAllWeekAllToon = () => {
    return admin
        .database()
        .ref('/weekAllToon/')
        .remove();
};

exports.insertThumbnail = (fileName, path, ext) => {
	return admin
		.database()
		.ref('thumbnail/' + fileName)
		.set({
			Path: path,
			Ext: ext,
		});
};

exports.selectReceiver = () => {
	return admin
		.database()
		.ref('/receiver')
		.once('value');
};
