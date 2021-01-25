import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from "firebase/app"
import "firebase/analytics"
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import "firebase/analytics"

import './SignIn.scss'

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
            signInSuccessUrl: 'localhost:3000/dashboard/:user',
            // Other config options...
        });

        

    }

    // componentDidUpdate() {
    // }

    render() {
        return (
            <section>
                <nav className="header__nav">
                    <Link to='/'>
                        <p className="header__nav__text">Home</p>
                    </Link>
                    <p className="header__nav__text">Resources</p>
                    <Link to='/dashboard'>
                        <p className="header__nav__text">Your Data Dashboard</p>
                    </Link>
                    <Link to='/signin'>
                        <p className="header__nav__text">Log In / Sign Up</p>
                    </Link>
                </nav>

                <div id="firebaseui-container"></div>

            </section>
        )
    }
}
