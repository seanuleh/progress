import React, { useContext } from 'react';
import { AuthContext } from '../App';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    cardRoot: {
        width: '100%',
        display: 'flex',
    },
    details: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    actions: {
      justifyContent: "spa"
    },
    cover: {
      width: 151,
    }
  }));
  

function ProgressLogCard(props) {
    const classes = useStyles();
  
    const { firestore } = useContext(AuthContext);

    const progLogsRef = firestore.collection('progress-logs');
    const { log } = props;
    const trackable = log.trackable;

    const deleteItem = async () => {  
        await progLogsRef.doc(log.id).delete();
    }

    function firestoreDateToString(dateIn) {
        if (dateIn != null) return dateIn.toDate().toLocaleDateString();
        return null;
    }

    return (
        <Card className={classes.cardRoot} >
            <div className={classes.details} width="100%">
            <CardActionArea>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1" color="textSecondary">
                            {firestoreDateToString(log.createdAt)}
                        </Typography>

                        <List>
                        {trackable && trackable.map(item => 
                            <ListItem key={item.title} divider>
                                <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                                >
                                    <Box><Typography variant="button">{item.title}</Typography></Box>
                                    <Box>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            {item.value}
                                            <Typography variant="caption" > {item.units} </Typography>
                                        </Typography>
                                    </Box>
                                    
                                </Grid>
                            </ListItem>
                        )}
                        </List>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={deleteItem}>
                        Delete
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
}

export default ProgressLogCard;
