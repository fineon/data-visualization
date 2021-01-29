import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDYdM7vWZtPaUfEaxAtyezJKXW9CM5hgxE",
    authDomain: "covid-user-sign-in.firebaseapp.com",
    projectId: "covid-user-sign-in",
    storageBucket: "covid-user-sign-in.appspot.com",
    messagingSenderId: "224448347353",
    appId: "1:224448347353:web:40604ad1606ad9e9fe92c8",
    measurementId: "G-M38E2V56TT"
};

export const fire = firebase.initializeApp(firebaseConfig);