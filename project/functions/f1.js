const admin = require('firebase-admin');
const functions = require('firebase-functions');

/**
 * 정석호s
 *  hello world 함수
 */
exports.helloWorld1 = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase1!<br>' + response);
});

/**
 *  send notification 함수
 *  특정 대상 1명에게 알림 메세지 보내는 예제 함수
 *  특정 대상의 토큰은 실제 구현시 Database에서 가져오거나 Parameter로 받아서 구현 요망
 */
exports.sendNotification = functions.https.onRequest((request, response) => {
    // 특정 대상 토큰
    const token = request.query.token;
    const title = request.query.title;
    const contents = request.query.contents;
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
    return admin.messaging().sendToDevice(token, payload)
        .then(function(response) {
                console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });
});

const url = require('url');
const child_process = require('child_process');
const path = require('path');
function download_test() {
    return new Promise((resolve, reject) => {
        // compose the wget command
        // const wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url
        const wget = 'wget --header="Referer: http://comic.naver.com/webtoon/detail.nhn?titleId=318995&no=1" http://imgcomic.naver.net/webtoon/318995/1/20110407164021_IMAG01_2.jpg';
        // excute wget using child_process' exec function
        child_process.exec(wget, function (err, stdout, stderr) {
            return err ? reject(err) : resolve(file_name);
        });
    });
}
download_file_with_wget().then(file=> console.log(file)).catch(e => console.log(e));
