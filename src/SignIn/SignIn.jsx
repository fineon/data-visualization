import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from "firebase/app"
import "firebase/analytics"
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import "firebase/analytics"

import './SignIn.scss'

import Header from './../Header/Header';

const firebaseConfig = {
    apiKey: "AIzaSyDYdM7vWZtPaUfEaxAtyezJKXW9CM5hgxE",
    authDomain: "covid-user-sign-in.firebaseapp.com",
    projectId: "covid-user-sign-in",
    storageBucket: "covid-user-sign-in.appspot.com",
    messagingSenderId: "224448347353",
    appId: "1:224448347353:web:40604ad1606ad9e9fe92c8",
    measurementId: "G-M38E2V56TT"
};



// firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         // Signed in 
//         var user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ..
//     });


export default class SignIn extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        //Error: An AuthUI instance already exists for the key "[DEFAULT]" after a re-render

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app();
        }


        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: './dashboard/',
            // Other config options...
        });

        

    }

    // componentDidUpdate() {
    // }

    render() {
        return (
            <section>
               <Header loggedIn="visitor"/>

                <div id="firebaseui-container"></div>

            </section>
        )
    }
}
