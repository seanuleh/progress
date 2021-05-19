import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ProgressLogItem from '../components/ProgressLogItem';
import LogForm from '../components/LogForm';


function ProgressLog(props) {
  const uid = props.auth.currentUser.uid;
  const progLogsRef = props.firestore.collection('progress-logs');
  const query = progLogsRef
        .where("uid", "==", uid)
        .orderBy('createdAt', 'desc')
        .limit(25);
  const [progLogs] = useCollectionData(query, { idField: 'id' });

    return (<>
      <main>
        <div className="log-item-container">
          {progLogs && progLogs.map(log => 
                <ProgressLogItem 
                  key={log.id} 
                  firestore={props.firestore} 
                  log={log}
                  // weight={log.weight} 
                  // units={log.units} 
                  // date={firestoreDateToString(log.createdAt)} 
                /> 
          )}
        </div>
      </main>
  
      <LogForm firestore={props.firestore} auth={props.auth}/>
    </>)
}

export default ProgressLog;
