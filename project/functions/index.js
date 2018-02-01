// 필요한 라이브러리
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fcModule = require('./functions');

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
for(var i in fcModule) {
    exports[i] = fcModule[i];
}
