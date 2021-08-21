import firebase from 'firebase';

var firebaseConfig = 
{
    apiKey: "AIzaSyCEAFqVDNPYqzK7NbuUZi1a3LsxWOesDgc",
    authDomain: "news-ef20f.firebaseapp.com",
    databaseURL: "https://news-ef20f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "news-ef20f",
    storageBucket: "news-ef20f.appspot.com",
    messagingSenderId: "610968312573",
    appId: "1:610968312573:web:d63cf1c2a271cd53febc94",
    measurementId: "G-H2XNJFE8FF"
};
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;