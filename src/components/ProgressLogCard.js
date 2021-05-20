import React, { useContext } from 'react';
import { AuthContext } from '../App';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import sillhoutte from '../assets/nopic.jpeg';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));
  

function ProgressLogCard(props) {
    const classes = useStyles();
    const theme = useTheme();
  
    const { firestore } = useContext(AuthContext);

    const progLogsRef = firestore.collection('progress-logs');
    const { log } = props;

    const deleteItem = async () => {  
        await progLogsRef.doc(log.id).delete();
    }

    function firestoreDateToString(dateIn) {
        if (dateIn != null) return dateIn.toDate().toLocaleDateString();
        return null;
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={sillhoutte}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="subtitle1" color="textSecondary">
                        {firestoreDateToString(log.createdAt)}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary">
                        {log.weight} <Typography variant="caption" > {log.units} </Typography>
                    </Typography>
                </CardContent>
            </div>
            <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
        </Card>
    );

    // return (<>
    //     <div className={`log-item`}>
    //         <div className="date">{firestoreDateToString(log.createdAt)}</div>
    //         <div className="weight"><span className="weight">{log.weight}</span> <span className="units">{log.units}</span></div>
    //         <div className="delete"><button onClick={() => deleteItem()}>x</button></div>
    //     </div>
    // </>)
}

export default ProgressLogCard;
