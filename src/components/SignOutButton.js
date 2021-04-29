import React from 'react';

function SignOutButton(props) {
    return props.auth.currentUser && (
      <button className="sign-out" onClick={() => props.auth.signOut()}>Sign Out</button>
    )
}

export default SignOutButton;