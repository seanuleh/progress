import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from '../App';

function SignInButton() {
    const { auth } = useContext(AuthContext);

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      </>
    )
  
}

export default SignInButton;