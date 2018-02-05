const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const parser = require('xml2js');

// firebase experimental:functions:shell
/**
 * 정석호s
 *  hello world 함수
 */
exports.helloWorld1 = functions.https.onRequest((req, res) => {
	console.log('it is log');
	res.send('Hello from Firebase1!<br>' + res);
});

/**
 *  send notification 함수
 *  특정 대상 1명에게 알림 메세지 보내는 예제 함수
 *  특정 대상의 토큰은 실제 구현시 Database에서 가져오거나 Parameter로 받아서 구현 요망
 */
exports.sendNotification = functions.https.onRequest((req, res) => {
	// 특정 대상 토큰
	const token = req.query.token;
	const title = req.query.title;
	const contents = req.query.contents;
	console.log('token: ', token);

	// 푸시 알림 내용작성
	// payload: 전송되는 내용 데이터 덩어리
	console.log('Construction the notification message.');
	const payload = {
		notification: {
			body: contents,
			title: title,
		},
	};
	// 관리자 권한으로 메세지 전송
	// token을 가진 클라이언트에게 payload를 전송
	return admin
		.messaging()
		.sendToDevice(token, payload)
		.then(function(res) {
			console.log('Successfully sent message:', res);
		})
		.catch(function(err) {
			console.log('Error sending message:', err);
		});
});

/**
 * 특정 referer로 이미지를 받아오는 예제 함수
 * @type {HttpsFunction}
 */
exports.getImageTest = functions.https.onRequest((req, res) => {
	var bucket = admin.storage().bucket();
	var headers = {};
	var url = 'http://imgcomic.naver.net/webtoon/318995/1/20110407164021_IMAG01_2.jpg';
	headers['Referer'] = 'http://comic.naver.com/webtoon/detail.nhn?titleId=318995&no=1';
	headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
								+ ' (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';
	var options = {
		url: url,
		headers: headers,
		encoding: 'base64',
		contentType: 'image/jpg',
	};
	request(options, function(mErr, mRes, mBody) {
		'use strict';
		if (!mErr && mRes.statusCode == 200) {
			bucket.file('testDir/test2.jpg').createWriteStream({
					metadata: {
						contentType: 'image/jpg',
					},
				}).end(new Buffer(mBody, 'base64'));
			res.send(true);
		}
	});
});

/**
 * 웹툰 특정 회차를 다운받아 스토리지에 저장하는 함수
 * @type {HttpsFunction}
 */
exports.downloadChapter = functions.https.onRequest((req, res) => {
	const bucket = admin.storage().bucket();
	const toonId = req.body.id === undefined ? req.query.id : req.body.id;
	const chapterNo = req.body.num === undefined ? req.query.num : req.body.num;
	if (toonId === undefined || chapterNo === undefined) {
		console.error('[에러/요청] 파라미터가 비정상입니다.');
		res.send(false);
	}
	const referUrl = 'http://comic.naver.com/webtoon/detail.nhn?titleId=' +toonId +'&no=' +chapterNo;
	const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' +
		' (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';
	const options = {
		url: '',
		headers: {
			Referer: referUrl,
			'User-Agent': userAgent,
		},
		encoding: 'base64',
		contentType: 'image/jpg',
	};
	request(referUrl, function(error, res, body) {
		var $ = cheerio.load(body);
		var imgList = $('.wt_viewer img');
		imgList.each(function() {
			var src = $(this).attr('src');
			options.url = src;
			request(options, function(mErr, mRes, mBody) {
				if (!mErr && mRes.statusCode == 200) {
					var path = 'webtoon/' + toonId + '/' +chapterNo + '/' + src.slice(src.lastIndexOf('/') + 1);
					var stream = bucket.file(path).createWriteStream({
						metadata: {
							contentType: 'image/jpg'
						},
					});
					stream.on('finish', () => {
						console.log('[정상/저장][' + path + ']');
					});
					stream.on('error', (err) => {
						console.log('[에러/저장][' + path + ']'+err.toString());
					});
					stream.end(new Buffer(mBody, 'base64'));
				} else {
					console.error('[에러/다운로드][' + path + ']');
					console.error('[에러/다운로드]'+mErr.toString());
				}
			});
		});
	});
	res.send(true);
});



/**
 * 웹툰 메인 배너 리스트 가져오는 함수
 * num:  가져올 리스트의 갯수 ( 기본 6 )
 * @type {HttpsFunction}
 */
exports.getMainBannerImage = functions.https.onRequest((req, res) => {
	"use strict";
	const num = req.body.num === undefined ? req.query.num === undefined? 6 : req.query.num : req.body.num;
	const referUrl = 'http://comic.naver.com/xml/mainTopXml.nhn?order=viewCount';
	const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
			+ ' (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';
	request(referUrl, function(error, mres, body) {
		var $ = cheerio.load(body);
		var parseString = parser.parseString;

		parseString(body, function (err, result) {
			var list = result.comics.comic;
			var random = Array.from({length: list.length}, (v, k) => k);
			var pick = [];
			var pickList = [];
			for(var i =0;i<num;i++) {
				pick[i] = random.splice(parseInt(Math.random() * random.length), 1);
				pickList.push(list[pick[i]]);
			}
			res.send(pickList);
		});
	});

});

