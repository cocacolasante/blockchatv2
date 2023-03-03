import { initializeApp } from "firebase/app";
import {  getDatabase } from "firebase/database"
import {ref, child, get, set, push, update } from "firebase/database";

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

export function sendMessage(to, from, message, uid) {
    
  
    // A post entry.
    const postData = {
      to: to,
      body: message,
      uid
    };
  
    // Get a key for a new Post.
    const newMessageKey = push(child(ref(db), 'message')).key;
  
    // adding sent messages to the senders db profile
    const updates = {};
    updates['/users/' + from + "/" + "messages/" + "sent/" + newMessageKey ] = postData;

    updates['/users/' + to + "/" + "messages/" + "received/" + newMessageKey ] = postData;
    
  
    
    return update(ref(db), updates)
}

export function newSendfunction(to, from, message, uid){
    
    const sentRef = ref(db, `users/${from}/messages/sent/`);
    const newPostRef = push(sentRef);

    const receivedRef =ref(db, `users/${to}/messages/received/`);
    const newReceivedRef = push(receivedRef);
    set(newPostRef, {
        to: to,
        body: message,
        uid: uid
    });
    set(newReceivedRef, {
        from: from,
        body: message,
        uid: uid
    });

}

export const checkDbForUser = (account) =>{
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${account}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        console.log("User exists")
        return true
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}


export default db;