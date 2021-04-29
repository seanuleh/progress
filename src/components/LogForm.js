import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';

function LogForm(props) {
    const progLogsRef = props.firestore.collection('progress-logs');
    const [weight, setWeight] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid } = props.auth.currentUser;
  
      await progLogsRef.add({
        weight: weight,
        units: "kg",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid
      })
  
      setWeight('');
    }
    return(
        <form onSubmit={sendMessage}>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" />
            <button type="submit" disabled={!weight}>⚖️</button>
        </form>
    )
  }

export default LogForm;
