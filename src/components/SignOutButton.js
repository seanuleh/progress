import React, { useContext } from 'react';
import { AuthContext } from '../App';

import Button from '@material-ui/core/Button';

function SignOutButton() {
    const { auth } = useContext(AuthContext);

    return (
      <Button color="inherit" onClick={() => auth.signOut()}>Log Out</Button>
    )
}

export default SignOutButton;