import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from '../App';

import Button from '@material-ui/core/Button';

function SignInButton() {
    const { auth } = useContext(AuthContext);

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <Button color="inherit" onClick={signInWithGoogle}>Login</Button>
    )
  
}

export default SignInButton;