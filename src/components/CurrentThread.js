"use client"
import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Link from "next/link";
import SendMessageButton from "./SendMessageButton";
import SentMessageContainer from "./sentcomponents/SentMessContainer";


  

const CurrentThread = () => {
    const [activeAccount, setActiveAccount] = useState()


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
    <div className='text-center w-[50%] bg-gray pb-36 border border-gray-600 rounded-md'>
        <Link className="" href={`/chat/sent`}>
            Sent
        </Link>

        <SentMessageContainer />
        
       <SendMessageButton activeAccount={activeAccount} />
            
    
    </div>
  )
}

export default CurrentThread