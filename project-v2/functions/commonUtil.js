const request = require('request');
const tinify = require('tinify');
const admin = require('firebase-admin');
const commonUtil = this;
const parser = require('xml2js');
tinify.key = 'cOFkDmCrQ7mJDJOXSoXgeizG0N58zVrF';

exports.userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' +
    ' (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';

// url : 'http://imgcomic.naver.net/webtoon/20853/1130/20180212190119_c5ee286ab6b2c1ca889bc8fc149e1054_IMAG01_1.jpg',
// referer : 'http://comic.naver.com/webtoon/detail.nhn'
exports.log = (name)=>{
	return (contents=>{console.log("["+name+"]" + contents)});
}

exports.downloadFromUrlToStorage = (url, referer, path) => {
	const mylog = commonUtil.log('downloadFromUrlToStorage');
    const bucket = admin.storage().bucket();
    return new Promise((resolve, reject) => {
		bucket.file(path).exists().then((data)=>{
			if(data[0]){
				mylog("다운로드 생략 : "+path);
			}else {
				request(
					{
						url: url,
						headers: {Referer: referer},
						encoding: null,
					},
					(err, res, body) => {
						bucket
							.file(path)
							.createWriteStream({
								metadata: {
									contentType: 'image/' + (path.slice(path.lastIndexOf(".") + 1)),
								},
							})
							.on('finish', () => {
								mylog('[다운로드 완료] : ' + path);
								resolve(path);
							})
							.on('error', err => {
								mylog('error');
							})
							.end(body);
					}
				);
			}
		});
    });
};

exports.downloadTinyFromUrlToStorage = (url, referer, path) => {
	const mylog = commonUtil.log('downloadTinyFromUrlToStorage');
	const bucket = admin.storage().bucket();
	return new Promise((resolve, reject) => {
		bucket.file(path).exists().then((data)=>{
			if(data[0]){
				mylog("다운로드 생략 : "+path);
			}else{
				request(
					{
						url: url,
						headers: { Referer: referer },
						encoding: null,
					},
					(err, res, body) => {
						tinify.fromBuffer(body).toBuffer((err, buffer) => {
							if(err!==null){
								mylog('error'+ path);
								commonUtil.downloadFromUrlToStorage(url, referer, path);
								resolve(true);
							}else{
								bucket.file(path)
								.createWriteStream({
									metadata: {
										contentType: 'image/'+(path.slice(path.lastIndexOf(".")+1)),
									},
								})
								.on('finish', () => {
									mylog('[다운로드 완료] : '+path );
									resolve(path);
								})
								.on('error', err => {
									mylog('error '+ err);
								})
								.end(buffer);
							}
						});
					}
				);
			}
		});

	});
};

exports.pipeFromStorage = (path, pipeTarget)=>{
	const mylog = commonUtil.log('pipeFromStorage');
	admin.storage().bucket().file(path).createReadStream()
		.on('error', function(err) {
			//mylog("[에러 발생] " + path);
		})
		.on('end', function() {
			//mylog("[정상 다운로드] " + path);
		})
		.pipe(pipeTarget);
};
exports.pipeFromUrl = (options, pipeTarget)=>{
	return request(options).pipe(pipeTarget);
}

exports.int2DD = (num)=>{
	if(num/10 >= 1) return num+"";
	else return "0"+num;
};
exports.date2weekday = n => {
    switch (n) {
        case 0:
            return 'sun';
        case 1:
            return 'mon';
        case 2:
            return 'tue';
        case 3:
            return 'wed';
        case 4:
            return 'thu';
        case 5:
            return 'fri';
        case 6:
            return 'sat';
    }
};

exports.xmlParse = param => {
    return new Promise((resolve, reject) => {
        parser.parseString(param, (err, result) => {
            if (err != null) {
                res.send(false);
            } else {
                resolve(result.comics.comic);
            }
        });
    });
};

exports.shuffle = (o, n) => {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    let ret = [];
    for (var i = 0; i < n; i++) ret.push(o.pop());
    return ret;
};

/**
 * YYYYMMDD
 * @returns {string}
 */
exports.getToday = () => {
	return new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
		.toISOString()
		.slice(0, 10)
		.replace(/-/g, '');
};
/**
 * YYYYMMDD
 * @returns {string}
 */
exports.getYesterday = () => {
	return new Date(new Date().getTime() + (-15) * 60 * 60 * 1000)
		.toISOString()
		.slice(0, 10)
		.replace(/-/g, '');
};


//options.url = url + 'ViewCount';
exports.getBodyFromUrl = (options)=>{
	return new Promise((resolve, reject) => {
		request(options, (mErr, mRes, mBody) => {
			if (!mErr && mRes.statusCode == 200) {
				resolve(mBody);
			} else {
				reject(false);
			}
		});
	});
};
