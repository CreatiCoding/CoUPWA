// 필요한 라이브러리
const google = require('googleapis');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

// Firebase admin sdk 새 비공개 키
// https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk
// 보안상 git에 올리지 않았음
// 위치는 이 파일과 같은 위치에 위치시켜야함
var serviceAccount = require('./coupwa-firebase-adminsdk-r3x8o-073413f00b.json');

// 관리자 권한 설정
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coupwa.firebaseio.com',
});

/**
 *  hello world 함수
 */
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!<br>' + response);
});

/**
 *  send notification 함수
 *  특정 대상 1명에게 알림 메세지 보내는 예제 함수
 *  특정 대상의 토큰은 실제 구현시 Database에서 가져오거나 Parameter로 받아서 구현 요망
 */
exports.sendNotification = functions.https.onRequest((request, response) => {
  // 특정 대상 토큰
  const token =
    'etbDBx-KKZM:APA91bEYQnw-zrTTIRKlPC9glSM-bFaeUoQ1eexd62haULsk1Yz6zJAyIZw95UM3L1FAeH41MkOzcYXZQaPvTcjLg1zrYBvLdCNyqaGhTX3LMOHgmDEM_HIsPz3PX1-FRZ4BSTSqnlZN';
  console.log('token: ', token);

  // 푸시 알림 내용작성
  // payload: 전송되는 내용 데이터 덩어리
  console.log('Construction the notification message.');
  const payload = {
    notification: {
      body: '푸시알림 내용입니당',
      title: "푸시알림 제목 from ' + 'coupwa",
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
