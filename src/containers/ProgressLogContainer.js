import React, { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ProgressLogCard from '../components/ProgressLogCard';
import LogForm from '../components/LogForm';
import { AuthContext } from '../App';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';

import { makeStyles } from '@material-ui/core/styles';


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
}));

function ProgressLogContainer() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(99);

  const { auth, firestore } = useContext(AuthContext);
  const uid = auth.currentUser.uid;

  const progLogsRef = firestore.collection('progress-logs');
  const query = progLogsRef
        .where("uid", "==", uid)
        .orderBy('createdAt', 'desc')
        .limit(25);
  const [progLogs] = useCollectionData(query, { idField: 'id' });

  // <Grid container className={classes.root} spacing={2}></Grid>
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
        {/* <LogForm /> */}
      </div>
    </>
    )
}

export default ProgressLogContainer;
