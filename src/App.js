import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';



import ProgressLog from './containers/ProgressLog';
import SignInButton from './components/SignInButton';
import SignOutButton from './components/SignOutButton';


if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBhEEovh9id1xX6SK90zrb3RQJTKBRq__w",
    authDomain: "progress-bf965.firebaseapp.com",
    projectId: "progress-bf965",
    storageBucket: "progress-bf965.appspot.com",
    messagingSenderId: "542650649357",
    appId: "1:542650649357:web:00572b226328ea1c3f3e44",
    measurementId: "G-0YD8QYYVD5"
  })
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <button className="header">Settings</button>
        <h1>💪</h1>
        {user ? <SignOutButton auth={auth} /> : <button className="header" style={{visibility: "hidden"}}></button>}
      </header>

      <section>
        {user ? <ProgressLog auth={auth} firestore={firestore} /> : <SignInButton auth={auth}/>}
      </section>
    </div>
  );
}

export default App;
