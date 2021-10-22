import React from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";

import {app} from '../utils/firebase';

import googleButton from '../img/google_btn.png'
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        new GoogleAuthProvider,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
};


const provider = new GoogleAuthProvider();
const auth = getAuth();

var signInHandle = () =>{
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user: ", user);
        console.log("Token: ", token);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}
class SignInScreen extends React.Component{
    render(){
        return (<>
            <h1>Please sign in</h1>
            <a><img width="250px" src={googleButton} onClick={signInHandle}/></a>
        </>)
    }
}

export default SignInScreen;