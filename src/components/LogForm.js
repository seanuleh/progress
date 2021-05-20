import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from '../App';

function LogForm() {
    const { auth, firestore } = useContext(AuthContext);

    const progLogsRef = firestore.collection('progress-logs');
    const [weight, setWeight] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid } = auth.currentUser;
  
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
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" />
            <button type="submit" disabled={!weight}>⚖️</button>
        </form>
    )
  }

export default LogForm;
