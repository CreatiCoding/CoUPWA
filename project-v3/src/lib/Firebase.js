import * as firebase from "firebase";
import "firebase/firestore";

let config = {
	apiKey: "AIzaSyBY4dEN9TjvtP0QBazVSNQGT0xQ1lLhXuM",
	authDomain: "react-pwa-webtoon.firebaseapp.com",
	databaseURL: "https://react-pwa-webtoon.firebaseio.com",
	projectId: "react-pwa-webtoon",
	storageBucket: "react-pwa-webtoon.appspot.com",
	messagingSenderId: "793373749985"
};
let Firebase = firebase;
let fs;
if (!Firebase.apps.length) {
	Firebase.initializeApp(config);
	fs = Firebase.firestore();
}

const self = {
	selectCol: model => {
		const settings = {/* your settings... */ timestampsInSnapshots: true};
		fs.settings(settings);
		return fs
			.collection(model)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, " => ", doc.data());
				});
			});
	},
	selectDoc: (model, key) => {
		const settings = {/* your settings... */ timestampsInSnapshots: true};
		fs.settings(settings);
		return fs
			.collection(model)
			.doc(key)
			.get()
			.then(doc => {
				if (doc.exists) {
					return doc.data();
				} else {
					console.log("No such document!");
				}
			})
			.catch(function(error) {
				console.log("Error getting document:", error);
			});
	}
};
export default self;
