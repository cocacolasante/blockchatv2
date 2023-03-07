"use client"
import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { newSendfunction } from "@/app/utils/firestore";
import SendMessageButton from "./SendMessageButton";


  

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
                console.log(`connected to ${accounts[0]}`)
                
 
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
    <div className='flex justify-center w-[75%] bg-gray pb-36'>
        <h1 className=''>Current Thread</h1>
        
       <SendMessageButton activeAccount={activeAccount} />
            
    
    </div>
  )
}

export default CurrentThread