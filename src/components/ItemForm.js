import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from '../App';
import { NewItemModalContext } from './AddItem';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  cardRoot: {
      maxWidth: '80%',
      minWidth: '350',
      display: 'flex',
  },
  details: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    maxWidth: '200',
  },
  actions: {
    justifyContent: "spa"
  },
  cover: {
    width: 151,
  }
}));

const initialTrackable = {
    "title": "Weight",
    "units": "kg",
    "value": 0
}

function ItemForm() {
    const { auth, firestore } = useContext(AuthContext);
    const classes = useStyles();
    const progLogsRef = firestore.collection('progress-logs');
    const [item, setItem] = useState(initialTrackable);
    let modalState = useContext(NewItemModalContext);

    const updateTrackable = (el) => {
      item.value = el.target.value;
      setItem(item)
    }

    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid } = auth.currentUser;
  
      await progLogsRef.add({
        trackable: [item],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid
      })

      setItem(initialTrackable);
      modalState.handleClose();
    }
    
    return(
      <>
        <Card className={classes.cardRoot} >
            <div className={classes.details} width="100%">
            <CardActionArea>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Date
                        </Typography>
                        <form onSubmit={sendMessage} className={classes.root} autoComplete="off">
                        <List>
                            <ListItem divider>
                                <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                                >
                                    <Box><Typography variant="button">Weight</Typography></Box>
                                    <Box>
                                        <Typography variant="subtitle1" color="textPrimary">
                                        <TextField required
                                                  key='v' 
                                                  name="value"
                                                  onChange={updateTrackable} 
                                                  variant="filled"
                                                  label="Value" type="number"/>
                                                  <Typography variant="caption"> kg </Typography>
                                        </Typography>
                                    </Box>
                                    
                                </Grid>
                            </ListItem>
                        </List>
                        </form>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={sendMessage}>
                        Submit
                    </Button>
                </CardActions>
            </div>
        </Card>
      </>
    )
  }

export default ItemForm;
