"use client"
import DarkModeSwitch from "./DarkModeSwitch"
import {useRouter} from "next/navigation"
import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {  getDatabase } from "firebase/database"
import {ref, child, get, set } from "firebase/database";





const ConnectWallet = () => {
    const router = useRouter()
    const [activeAccount, setActiveAccount] = useState()


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

  

  function writeUserData(userId) {
    
    set(ref(db, 'users/' + userId), {
      username: userId,
      
    });
  }

  const checkDbForUser = (account) =>{
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

    const connectWallet = async () =>{
        try{
            const {ethereum} = window;
            if(!ethereum){
                alert("please install metamask")
                return;
            }
            const accounts = await ethereum.request({method:"eth_requestAccounts"})
            if(accounts.length !== 0 ){
                setActiveAccount(accounts[0]);
                console.log(`connected to ${activeAccount}`)
                const account = accounts[0]
                setActiveAccount(account)
                if(!checkDbForUser(accounts[0])){
                    writeUserData(account)
                }

                
                router.push(`/chat`)
            }


        }catch(error){
            console.log(error)
        }
    }

    const checkIfWalletIsConnected = async () =>{
        try{
            const {ethereum} = window;
            if(!ethereum){
                alert("Please install metamask")
                router.push(`/`)
            }
            const accounts = await ethereum.request({method: "eth_accounts"})
            if(accounts.length !== 0 ){
                setActiveAccount(accounts[0]);
                console.log(`connected to ${accounts[0]}`)
                
                
                router.push(`/chat`)
            }else{
                router.push(`/`)
            }
            

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected()
    },[])

    
  return (
    <div className='flex justify-end mt-6 mr-10 space-x-4 '>
        {!activeAccount ? <button className="w-48 transition-shadow bg-gray-400 rounded-full hover:underline hover:shadow-lg" onClick={connectWallet}><span className="">Connect Wallet</span> </button> : <p className="transition-shadow hover:underline hover:shadow">{activeAccount.slice(0,4)}...{activeAccount.slice(-6)}</p>}
        <DarkModeSwitch />
    </div>
  )
}

export default ConnectWallet