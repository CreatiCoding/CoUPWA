if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
firebase.initializeApp({
  "apiKey": "AIzaSyD88cDgm2aG4i66QyR7OsFHEiigWaW-etw",
  "databaseURL": "https://coupwa.firebaseio.com",
  "storageBucket": "coupwa.appspot.com",
  "authDomain": "coupwa.firebaseapp.com",
  "messagingSenderId": "323516523754",
  "projectId": "coupwa"
});
