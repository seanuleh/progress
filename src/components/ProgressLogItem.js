import React from 'react';

function ProgressLogItem(props) {
    const progLogsRef = props.firestore.collection('progress-logs');
    const { log } = props;

    const deleteItem = async () => {  
        await progLogsRef.doc(log.id).delete();
    }

    function firestoreDateToString(dateIn) {
        if (dateIn != null) return dateIn.toDate().toLocaleDateString();
        return null;
    }

    return (<>
        <div className={`log-item`}>
            <div className="date">{firestoreDateToString(log.createdAt)}</div>
            <div className="weight"><span className="weight">{log.weight}</span> <span className="units">{log.units}</span></div>
            <div className="delete"><button onClick={() => deleteItem()}>x</button></div>
        </div>
    </>)
  }

export default ProgressLogItem;
