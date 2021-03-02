import React, {useEffect } from 'react'
import firebase from "firebase/app"
import "firebase/analytics"
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import "firebase/analytics"

import './SignIn.scss'

import Header from './../Header/Header';



export default function SignIn() {
    useEffect( () => {
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
