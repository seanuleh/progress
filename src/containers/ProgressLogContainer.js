import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import ProgressLogCard from '../components/ProgressLogCard';
import { AuthContext } from '../App';

import Grid from '@material-ui/core/Grid';
import AddItem from '../components/AddItem';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(16),
      // height: theme.spacing(16),
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ProgressLogContainer() {
  const classes = useStyles();

  const { auth, firestore } = useContext(AuthContext);
  const uid = auth.currentUser.uid;

  const progLogsRef = firestore.collection('progress-logs');
  const query = progLogsRef
        .where("uid", "==", uid)
        .orderBy('createdAt', 'desc')
        .limit(25);
  const [progLogs] = useCollectionData(query, { idField: 'id' });

    return (
    <>
      <div className={classes.root}>
        <Grid
          container
          className={classes.root}
          direction="column"
          justify="center"
          alignItems="center"
          spacing={5}
        >
            {progLogs && progLogs.map(log => <ProgressLogCard log={log}/>)}
        </Grid>
        <AddItem />
      </div>
    </>
    )
}

export default ProgressLogContainer;
