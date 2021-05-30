import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from '../App';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ItemFormLine from './ItemFormLine';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const initialLogItem = {
    "title": "",
    "units": "",
    "value": 0
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

    const updateItemArray = (el, i) => {
      console.log("updating index: " + i);
      const itemArr = itemArray;
      itemArr[i][el.target.name] = el.target.value;
      setItemArray(itemArr);

      console.log("arr: " + JSON.stringify(itemArr));
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
              [...Array(numItems).keys()].map(i => 
                <ItemFormLine i={i} item={itemArray[i]} update={(el) => updateItemArray(el, i)}/>
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
