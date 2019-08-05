import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCOAQsW3aA3CKkQNnopwhZ5-j-LvR2YMCo",
    authDomain: "anime-a89f7.firebaseapp.com",
    databaseURL: "https://anime-a89f7.firebaseio.com",
    projectId: "anime-a89f7",
    storageBucket: "anime-a89f7.appspot.com",
    messagingSenderId: "576186521103",
    appId: "1:576186521103:web:e93d273af5fec36f"
};

firebase.initializeApp(firebaseConfig);
export default firebase
