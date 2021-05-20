import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../App';
import MenuIcon from '@material-ui/icons/Menu';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ProgressAppBar() {
    const classes = useStyles();
    const { auth } = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                Progress 💪
                </Typography>

                {auth.currentUser ? <SignOutButton/> : <SignInButton/>}
            </Toolbar>
        </AppBar>
    );
}

export default ProgressAppBar;