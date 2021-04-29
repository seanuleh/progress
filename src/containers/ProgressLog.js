import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ProgressLogItem from '../components/ProgressLogItem';
import LogForm from '../components/LogForm';


function ProgressLog(props) {
  const progLogsRef = props.firestore.collection('progress-logs');
  const query = progLogsRef.orderBy('createdAt', 'desc').limit(25);
  const [progLogs] = useCollectionData(query, { idField: 'id' });

  function firestoreDateToString(dateIn) {
    return dateIn.toDate().toLocaleDateString()
  }

    return (<>
      <main>
        <div className="log-item-container">
          {progLogs && progLogs.map(log => <ProgressLogItem key={log.id} weight={log.weight} units={log.units} date={firestoreDateToString(log.createdAt)} /> )}
        </div>
      </main>
  
      <LogForm firestore={props.firestore} auth={props.auth}/>
    </>)
}

export default ProgressLog;
