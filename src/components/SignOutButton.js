import React, { useContext } from 'react';
import { AuthContext } from '../App';
import signOutIcon from '../assets/logout.svg';


function SignOutButton() {
    const { auth } = useContext(AuthContext);

    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()} >
        <img src={signOutIcon} alt="Sign Out"/>
      </button>
    )
}

export default SignOutButton;