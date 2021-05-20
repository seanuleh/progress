import React, { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ProgressLogItem from '../components/ProgressLogItem';
import LogForm from '../components/LogForm';
import { AuthContext } from '../App';


function ProgressLogContainer() {
  const { auth, firestore } = useContext(AuthContext);
  const uid = auth.currentUser.uid;

  const progLogsRef = firestore.collection('progress-logs');
  const query = progLogsRef
        .where("uid", "==", uid)
        .orderBy('createdAt', 'desc')
        .limit(25);
  const [progLogs] = useCollectionData(query, { idField: 'id' });

    return (<>
      <main>
        <div className="log-item-container">
          {progLogs && progLogs.map(log => 
                <ProgressLogItem key={log.id} log={log} /> 
          )}
        </div>
      </main>
  
      <LogForm />
    </>)
}

export default ProgressLogContainer;
