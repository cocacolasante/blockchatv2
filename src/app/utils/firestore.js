import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import {  getDatabase, collection, where, onValue } from "firebase/database"
import {ref, child, get, set, push, update, query, orderByChild } from "firebase/database";
import firebase from "firebase/app";
import MessagePreviewCard from "@/components/MessagePreviewCard";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_firestore_apiKey,
    authDomain: process.env.NEXT_PUBLIC_auth_domain,
    databaseURL: process.env.NEXT_PUBLIC_db_URL,
    projectId: process.env.NEXT_PUBLIC_project_Id,
    storageBucket: process.env.NEXT_PUBLIC_storage_Bucket,
    messagingSenderId: process.env.NEXT_PUBLIC_message_Sender_Id,
    appId: process.env.NEXT_PUBLIC_app_Id
  };

const app = initializeApp(firebaseConfig)

const db = getDatabase(app);



export function addUserToDb(userId) {
    
    set(ref(db, 'users/' + userId), {
      username: userId,
      
    });
}

function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
}

export function getListOfMessage(activeAccount){
    const receivedMesRef = ref(db, `users/${activeAccount}/messages/received`)

    onValue(receivedMesRef, (snapshot) => {
        let output =[]
        
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;

            const childData = childSnapshot.val();

            console.log(childData)

            
            
        });
        
        return output
    });
      
}


export function newSendfunction(to, from, message){
    
    
    const sentRef = ref(db, `users/${from}/messages/sent/`);
    const newPostRef = push(sentRef);

    const receivedRef =ref(db, `users/${to}/messages/received/`);
    const newReceivedRef = push(receivedRef);

    const newReceivedKey = push(child(ref(db), `users/${to}/messages/received/`)).key;
    const newSentKey = push(child(ref(db), `users/${from}/messages/sent/`)).key;

    set(newPostRef, {
        to: to,
        from: from,
        body: message,
        createdAt: getTimestampInSeconds(),        
    });
    set(newReceivedRef, {
        to: to,
        from: from,
        body: message,
        createdAt: getTimestampInSeconds(),        
    });

}

export const checkDbForUser = (account) =>{
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${account}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        
        return true
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}



export default db;