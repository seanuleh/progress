import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from '../App';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const initialLogItem = {
    "title": null,
    "units": null,
    "value": null
}

function ItemForm() {
    const { auth, firestore } = useContext(AuthContext);
    const classes = useStyles();

    const [numItems, setNumItem] = useState(1);
    const progLogsRef = firestore.collection('progress-logs');
    const [itemArray, setItemArray] = useState([initialLogItem]);
  
    const addItemForm = () => {
      setItemArray( itemArray => [...itemArray, initialLogItem ])
      setNumItem(numItems+1)    
    }

    const updateItemArray = (value, index, type) => {
      itemArray[index][type] = value;
      setItemArray(itemArray);

      console.log("arr: " + JSON.stringify(itemArray));
    }

    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid } = auth.currentUser;
  
      await progLogsRef.add({
        trackable: itemArray,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid
      })
    }
    
    return(
      <>
        <form onSubmit={sendMessage} className={classes.root} autoComplete="off">
          <div>
                  <Grid
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                  >
            {
              
              [...Array(numItems).keys()].map(index => 
                <>
                  <Grid
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                  >
                    <TextField key={'title-'+index} id={'title-'+index} onChange={(e) => updateItemArray(e.target.value, index, "title")} label="Title" type="text" width={1}/>
                    <TextField key={'units-'+index} id={'units-'+index} onChange={(e) => updateItemArray(e.target.value, index, "units")} label="Units" type="text"/>
                    <TextField key={'value-'+index} id={'value-'+index} onChange={(e) => updateItemArray(e.target.value, index, "value")} label="Value" type="number"/>
                  </Grid>
                </>
              )
            }
            <Button variant="contained" color="primary" disabled={itemArray.length === 0} type="submit" >
              Submit
            </Button>
            <Button variant="contained" color="primary" onClick={addItemForm}>
              Add Item
            </Button>
            </Grid>
            </div>
        </form>
      </>
    )
  }

export default ItemForm;
