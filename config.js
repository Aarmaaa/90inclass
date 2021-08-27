import * as firebase from 'firebase'

export const firebaseConfig = {
    apiKey: "AIzaSyC5lrdD8UaVNZLKWcmcGVf9rBD58gVF3uo",
    authDomain: "storyapp-dd4ad.firebaseapp.com",
    projectId: "storyapp-dd4ad",
    storageBucket: "storyapp-dd4ad.appspot.com",
    messagingSenderId: "721204078038",
    appId: "1:721204078038:web:b342270bb99bd2c5863077"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
else{
    firebase.app()
}