'use strict';

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cheerio = require('cheerio');
const DAO = require('./db-access-object');
const commonUtil = require('./commonUtil');
const tinify = require('tinify');

tinify.key = 'cOFkDmCrQ7mJDJOXSoXgeizG0N58zVrF';

// 무료
// 0/500
// tinify login
// https://tinypng.com/dashboard/developers#token/P0V9Yyd-Ppou_dNt/hdR1O93pGRj4

// 호스팅에 배포용
// firebase experimental:functions:shell

/**
 * saveTodayBannerInfo
 * @parameter null
 * bannerToday가 이미 있다면
 * 		오늘 자 배너의 파일 경로 6개를 반환
 * bannerToday가 없다면
 * 		오늘 자 웹툰 배너 리스트를 받아
 *		데이터를 가공해 banner를 조사하여
 *		이미 있다면
 *			다운로드 하지 않고 경로 수집
 *		없다면
 *			다운로드 후 경로를 banner에 추가 저장
 * 수집된 경로들 중 6개를 랜덤하여 골라 bannerToday에 삽입
 * @type {HttpsFunction}
 */
exports.saveTodayBannerInfo = functions.https.onRequest((req, res) => {
    /*	if (req.method != "POST") {
		res.status(400).send("It is not post request");
		return;
	}*/
    const referUrl1 = 'http://comic.naver.com/xml/mainTopXml.nhn?order=viewCount';
    const referUrl2 = 'http://comic.naver.com/index.nhn';
    const userAgent = commonUtil.userAgent;
    const options = {
        url: '',
        headers: {
            Referer: referUrl2,
            'User-Agent': userAgent,
        },
        encoding: 'base64',
        contentType: '',
    };
    DAO.once('/bannerToday/' + commonUtil.getToday()).then(snapshot => {
        if (snapshot.val() == null) {
            // 오늘의 배너 리스트를 요청
            commonUtil
                .getBodyFromUrl({ url: referUrl1 })
                .then(result => {
                    return commonUtil.xmlParse(result);
                })
                // 인터넷에서 받은 데이터를 가공
                .then(data => {
                    const paths = [];
                    return Promise.all(
                        data.map((ele, seq, arr) => {
                            const ret = {
                                bigImageUrl: ele.bigImg[0],
                                fileName: '',
                                ext: '',
                                titleId: ele.url[0],
                                titleName: ele.titleName[0],
                            };
                            ret.fileName = ret.bigImageUrl.slice(
                                ret.bigImageUrl.lastIndexOf('/') + 1,
                                ret.bigImageUrl.lastIndexOf('.')
                            );
                            ret.ext = ret.bigImageUrl.slice(ret.bigImageUrl.lastIndexOf('.') + 1);
                            ret.titleId = ret.titleId.slice(
                                ret.titleId.lastIndexOf('titleId=') + 8,
                                ret.titleId.indexOf('&')
                            );
                            return ret;
                        })
                    );
                    // 가공한 데이터가 DB에 존재하는지 체크
                })
                .then(data => {
                    return Promise.all(
                        data.map((ele, seq, arr) => {
                            return DAO.once('/banner/' + ele.fileName).then(snapshot => {
                                // 이미 있으면 경로 반환
                                if (snapshot.val() != null) {
                                    return ele.path;
                                    // 없으면 다운로드 후 DB에 저장, 경로 반환
                                } else {
                                    options.contentType = 'image/' + ele.ext;
                                    options.url = ele.bigImageUrl;
                                    ele.path = '/images/banner/' + ele.fileName + '.' + ele.ext;
                                    DAO.insertBanner(ele.fileName, ele.titleId, ele.titleName, ele.path, ele.ext);
                                    if (ele.ext.toLowerCase() === 'png' || ele.ext.toLowerCase() === 'jpg')
                                        return commonUtil.downloadTinyFromUrlToStorage(
                                            ele.bigImageUrl,
                                            referUrl2,
                                            ele.path
                                        );
                                    else
                                        return commonUtil.downloadFromUrlToStorage(
                                            ele.bigImageUrl,
                                            referUrl2,
                                            ele.path
                                        );
                                }
                            });
                        })
                    );
                    // 경로들중에 순서 섞어 6개만 bannerToday에 insert.
                })
                .then(data => {
                    let result = commonUtil.shuffle(data, 6);
                    DAO.insertBannerToday(result);
                    res.send(result);
                });
            // bannerToday가 이미 있다면
        } else {
            let data = snapshot.val();
            res.send([data['image0'], data['image1'], data['image2'], data['image3'], data['image4'], data['image5']]);
        }
    });
});

/**
 * saveTodayWeekAllToonInfo
 * @parameter null
 * 오늘의 웹툰 정보를 전부 다 가져옵니다. 요일별, 조회순별 순위, 등등
 * 그리고 DB에 저장합니다. 이미지도 없으면 저장해서 연결합니다.
 */
exports.saveTodayWeekAllToonInfo = functions.https.onRequest((req, res) => {
    /*	if (req.method != "POST") {
		res.status(400).send("It is not post request");
		return;
	}*/
    const mylog = commonUtil.log('saveTodayWeekAllToonInfo');
    const userAgent = commonUtil.userAgent;
    let url = 'http://comic.naver.com/webtoon/weekday.nhn?order=';
    const options = {
        url: '',
        headers: {
            'User-Agent': userAgent,
        },
    };
    // DB에 있는 데이터는 모두 초기화
    DAO.deleteAllWeekAllToon().then(() => {
        const data = [[], [], [], [], [], [], []];
        // 업데이트순 수집하면서 데이터 변수화
        options.url = url + 'Update';
        return (
            commonUtil
                .getBodyFromUrl(options)
                .then(result => {
                    let $ = cheerio.load(result);
                    let week = $('.daily_all .col .col_inner ul');
                    for (let i = 0; i < week.length; i++) {
                        $ = cheerio.load(week[i]);
                        let date = $('li');
                        for (let j = 0; j < date.length; j++) {
                            $ = cheerio.load(date[j]);
                            data[(i + 1) % 7][j] = {
                                titleId: parseInt(
                                    (() => {
                                        let temp = $('a')[0].attribs.href;
                                        return temp.slice(temp.indexOf('=') + 1, temp.indexOf('&'));
                                    })()
                                ),
                                imgUrl: $('a img')[0].attribs.src,
                                title: $('a')[1].attribs.title,
                                weekDay: commonUtil.date2weekday((i + 1) % 7),
                                seqUpdate: j,
                                seqCount: 0,
                                seqRate: 0,
                                seqTitle: 0,
                                author: undefined,
                                rate: undefined,
                                update: undefined,
                            };
                            console.log(i + 1, j, data[(i + 1) % 7][j]);
                        }
                    }
                    return [].concat.apply([], data).map(e => e.imgUrl);
                })
                // 조회순, 별점순, 제목순, 나머지 데이터(저자, 평점, 업데이트 유무), 이미지 다운로드
                .then(result => {
                    let data1d = result;
                    data1d = data1d.filter((ele, seq) => data1d.indexOf(ele) == seq);
                    console.log(data1d.length);
                    let promises = [
                        new Promise((resolve, reject) => {
                            options.url = url + 'ViewCount';
                            return commonUtil.getBodyFromUrl(options).then(result => {
                                let $ = cheerio.load(result);
                                let week = $('.daily_all .col .col_inner ul');
                                for (let i = 0; i < week.length; i++) {
                                    $ = cheerio.load(week[i]);
                                    let date = $('li');
                                    for (let j = 0; j < date.length; j++) {
                                        $ = cheerio.load(date[j]);
                                        data[(i + 1) % 7][
                                            data[(i + 1) % 7].map(e => e.title).indexOf($('a')[1].attribs.title)
                                        ].seqCount = j;
                                    }
                                }
                                resolve(true);
                            });
                        }),
                        new Promise((resolve, reject) => {
                            options.url = url + 'StarScore';
                            return commonUtil.getBodyFromUrl(options).then(result => {
                                let $ = cheerio.load(result);
                                let week = $('.daily_all .col .col_inner ul');
                                for (let i = 0; i < week.length; i++) {
                                    $ = cheerio.load(week[i]);
                                    let date = $('li');
                                    for (let j = 0; j < date.length; j++) {
                                        $ = cheerio.load(date[j]);
                                        data[(i + 1) % 7][
                                            data[(i + 1) % 7].map(e => e.title).indexOf($('a')[1].attribs.title)
                                        ].seqRate = j;
                                    }
                                }
                                resolve(true);
                            });
                        }),
                        new Promise((resolve, reject) => {
                            options.url = url + 'TitleName';
                            return commonUtil.getBodyFromUrl(options).then(result => {
                                let $ = cheerio.load(result);
                                let week = $('.daily_all .col .col_inner ul');
                                for (let i = 0; i < week.length; i++) {
                                    $ = cheerio.load(week[i]);
                                    let date = $('li');
                                    for (let j = 0; j < date.length; j++) {
                                        $ = cheerio.load(date[j]);
                                        data[(i + 1) % 7][
                                            data[(i + 1) % 7].map(e => e.title).indexOf($('a')[1].attribs.title)
                                        ].seqTitle = j;
                                    }
                                }
                                resolve(true);
                            });
                        }),
                    ];
                    promises.concat(
                        data.map((ele, seq, arr) => {
                            return new Promise((resolve, reject) => {
                                url = 'http://m.comic.naver.com/webtoon/weekday.nhn?week=';
                                options.url = url + commonUtil.date2weekday(seq);
                                commonUtil.getBodyFromUrl(options).then(result => {
                                    let $ = cheerio.load(result);
                                    const size = $('.lst .toon_info .toon_name').length;
                                    for (let j = 0; j < size; j++) {
                                        let title = $('.lst .toon_info .toon_name')[j].children[0].children[0].data;
                                        let seq = ele.map(e => e.title).indexOf(title);
                                        ele[seq].author = $('.lst .toon_info p')[j].children[0].data.trim();
                                        ele[seq].rate = $('.lst .toon_info .txt_score')[j].children[0].data.trim();
                                        let updateEle = cheerio($('.lst .toon_info')[j]).html();
                                        if (updateEle != null) {
                                            updateEle = cheerio
                                                .load(updateEle)('.badge_up')
                                                .html();
                                            if (updateEle != null) {
                                                ele[seq].update =
                                                    cheerio
                                                        .load(updateEle)('.ico_badge')
                                                        .text() == 'UP';
                                            } else {
                                                ele[seq].update = false;
                                            }
                                        } else {
                                            ele[seq].update = false;
                                        }
                                    }
                                    resolve(true);
                                });
                            });
                        })
                    );
                    promises.concat(
                        data1d.map((ele, seq, arr) => {
                            return new Promise((resolve, reject) => {
                                let imgUrl = ele;
                                let name = ele.slice(ele.lastIndexOf('/') + 1, ele.lastIndexOf('.'));
                                let ext = ele.slice(ele.lastIndexOf('.') + 1);
                                let path = '/images/thumbnail/' + name + '.' + ext;
                                let referer = 'http://comic.naver.com/webtoon/weekday.nhn';
                                if (ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg') {
                                    commonUtil.downloadTinyFromUrlToStorage(imgUrl, referer, path).then(() => {
                                        resolve(true);
                                    });
                                } else {
                                    commonUtil.downloadFromUrlToStorage(imgUrl, referer, path).then(() => {
                                        resolve(true);
                                    });
                                }
                            });
                        })
                    );
                    return Promise.all(promises);
                })
                // 2차원 데이터를 1차원으로 만든 후 DB에 insert함.
                .then(result => {
                    data.map((ele, seq, arr) => {
                        return ele.map((ele, seq, arr) => {
                            let name = ele.imgUrl.slice(ele.imgUrl.lastIndexOf('/') + 1, ele.imgUrl.lastIndexOf('.'));
                            ele.path =
                                '/images/thumbnail/' + name + '.' + ele.imgUrl.slice(ele.imgUrl.lastIndexOf('.') + 1);
                        });
                    });
                    for (let i = 0; i < data.length; i++) {
                        data[i] = data[i].sort((a, b) => a['seqCount'] - b['seqCount']);
                    }
                    let data1d = [].concat.apply([], data);
                    DAO.insertWeekAllToon(data1d);
                    res.send(true);
                })
        );
    });
});

/**
 * images
 * @parameter path
 * 해당되는 스토리지 경로에 있는 이미지를 다운받는 예제입니다.
 // ex) /images?u=images/banner/thumbnail_IMAG02_00c57c37-8e67-4ca0-baa2-a81e1e6898a2.jpg
 */
exports.images = functions.https.onRequest((req, res) => {
    const mylog = commonUtil.log('images');
    const path = req.body.path === undefined ? (req.query.path === undefined ? 0 : req.query.path) : req.body.path;
    if (path === 'yet') res.status(404).send(false);
    admin
        .storage()
        .bucket()
        .file(path)
        .createReadStream()
        .on('error', function(err) {
            mylog('[에러 발생] ' + path);
        })
        .on('end', function() {
            mylog('[정상 다운로드] ' + path);
        })
        .pipe(res);
});

/**
 * imagePipe
 * @paramter	url, referer
 * referer로 이미지(url)요청해 받습니다.
 */
exports.imagePipe = functions.https.onRequest((req, res) => {
    const url = req.body.url === undefined ? (req.query.url === undefined ? '' : req.query.url) : req.body.url;
    const referer =
        req.body.referer === undefined
            ? req.query.referer === undefined ? null : req.query.referer
            : req.body.referer;
    const userAgent = commonUtil.userAgent;
    const options = {
        url: url,
        headers: {
            Referer: referer,
            'User-Agent': userAgent,
        },
    };
    commonUtil.pipeFromUrl(options, res);
});

/**
 * bannerImage
 * @paremter	num (0-5)
 * 오늘의 배너 이미지 num번째를 pipe로 가져옵니다.
 * 오늘의 배너 이미지가 없으면 어제 배너 이미지로 가져옵니다.
 */
exports.bannerImage = functions.https.onRequest((req, res) => {
    if (req.method != 'GET') {
        res.status(400).send('It is not get request');
        return;
    }
    const num = req.body.num === undefined ? (req.query.num === undefined ? 0 : req.query.num) : req.body.num;
    DAO.once('/bannerToday/' + commonUtil.getToday())
        .then(snapshot => {
            if (snapshot.val() == null) {
                return DAO.once('/bannerToday/' + commonUtil.getYesterday()).then(sanpshot => {
                    if (snapshot.val() == null) {
                        res.send(false);
                    } else {
                        return snapshot.val();
                    }
                });
            } else {
                return snapshot.val();
            }
        })
        .then(data => {
            commonUtil.pipeFromStorage(data['image' + num], res);
        });
});

/**
 * getWeekAllToonInfoBySort
 * 업데이트순, 조회순, 별점순, 제목순으로 웹툰 데이터 가져오기
 * 속도가 약간 느리긴 함..
 * 정렬 기준 seqUpdate,seqCount,seqRate,seqTitle
 * */
exports.getWeekAllToonInfoBySort = functions.https.onRequest((req, res) => {
    /*	if (req.method != "POST") {
		res.status(400).send("It is not post request");
		return;
	}*/
    const sort =
        req.body.sort === undefined ? (req.query.sort === undefined ? 'seqCount' : req.query.sort) : req.body.sort;

    DAO.selectWeekAllToon().then(snapshot => {
        let result = [];
        let input = snapshot.val();
        result = input;
        if (sort != 'seqCount') {
            let output = {
                mon: [],
                tue: [],
                wed: [],
                thu: [],
                fri: [],
                sat: [],
                sun: [],
            };
            input = Object.keys(input).map(e => {
                let ele = input[e];
                output[ele.weekDay].push(ele);
            });
            output['mon'].sort((a, b) => a[sort] - b[sort]);
            output['tue'].sort((a, b) => a[sort] - b[sort]);
            output['wed'].sort((a, b) => a[sort] - b[sort]);
            output['thu'].sort((a, b) => a[sort] - b[sort]);
            output['fri'].sort((a, b) => a[sort] - b[sort]);
            output['sat'].sort((a, b) => a[sort] - b[sort]);
            output['sun'].sort((a, b) => a[sort] - b[sort]);
            result = [];
            result = result.concat(output['mon']);
            result = result.concat(output['tue']);
            result = result.concat(output['wed']);
            result = result.concat(output['thu']);
            result = result.concat(output['fri']);
            result = result.concat(output['sat']);
            result = result.concat(output['sun']);
        } else {
            result = Object.keys(result).map(e => {
                return result[e];
            });
        }
        res.send(result);
    });
});

/**
 *  send notification 함수
 *  특정 대상 1명에게 알림 메세지 보내는 예제 함수
 *  특정 대상의 토큰은 실제 구현시 Database에서 가져오거나 Parameter로 받아서 구현 요망
 */
exports.addReceiver = functions.https.onRequest((req, res) => {
    // 특정 대상 토큰
    const token =
        req.body.token === undefined ? (req.query.token === undefined ? '' : req.query.token) : req.body.token;
    if (token === '') {
        res.send(false);
    } else {
        DAO.insertReceiver(token);
        res.send(true);
    }
});

exports.sendNotification = functions.https.onRequest((req, res) => {
    const title =
        req.body.title === undefined ? (req.query.title === undefined ? '' : req.query.title) : req.body.title;
    const contents =
        req.body.contents === undefined
            ? req.query.contents === undefined ? '' : req.query.contents
            : req.body.contents;
    DAO.selectReceiver().then(snapshot => {
        let result = snapshot.val();
        let receivers = Object.keys(result).map(function(objectKey, index) {
            return result[objectKey].data;
        });
		console.log(receivers);
        const payload = {
            notification: {
                body: contents,
                title: title,
            },
        };
        let resultString = "finish\n";
		for(let i=0;i<receivers.length;i++){
			admin.messaging()
			.sendToDevice(receivers[i], payload)
			.then(function(response) {
				console.log('Successfully sent message:', response);
				resultString+="true\n";
			})
			.catch(function(error) {
				resultString+="false\n";
				console.log('Error sending message:', error);
			});
		}
		res.send(resultString);
    });
});
