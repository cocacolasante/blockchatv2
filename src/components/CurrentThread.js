"use client"
import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { newSendfunction } from "@/app/utils/firestore";


  

const CurrentThread = () => {
    const [reply, setReply] = useState("Send Message")
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

    const handleSendMessage = (e) =>{
        e.preventDefault()
        console.log("sending message")
        
        // add dynamic to variable
        newSendfunction("0x4b2abf635f824e3419e524200f34148d30ee5876", activeAccount, reply, activeAccount)
        setReply("Send Message")
    }
    
  return (
    <div className='flex justify-center w-full bg-gray pb-36'>
        <h1 className=''>Current Thread</h1>
        
        <form className="absolute bottom-0 m-auto" onSubmit={e=>handleSendMessage(e)}>
            <div className="flex">
                
                <input className="w-full" onChange={e=>setReply(e.target.value)} placeholder={reply}/>
                <button onClick={e=>handleSendMessage(e)} type="submit" >Send Message</button>
            </div>
        </form>
            
    
    </div>
  )
}

export default CurrentThread