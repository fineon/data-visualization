import React, { Component, useState, useEffect } from 'react'
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



export default function SignIn() {
    useEffect( () => {
        firebase.initializeApp(firebaseConfig);

        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        ui.start('#firebaseui-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: './dashboard/',
            // Other config options...
        });

        return () => {
            ui.delete();
           };

    }, [])


    return (
        <section>
            <Header loggedIn="visitor" />

            <div id="firebaseui-container"></div>

        </section>
    )

}
