import React from 'react';
import signOutIcon from '../assets/logout.svg';


function SignOutButton(props) {
    return props.auth.currentUser && (
      <button className="sign-out" onClick={() => props.auth.signOut()} >
        <img src={signOutIcon} />
      </button>
    )
}

export default SignOutButton;