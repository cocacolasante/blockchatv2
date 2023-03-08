"use client"
import SentMessagePreview from "./SentMessagePreview"
import { useState, useEffect } from "react"

const SentMessageContainer = () => {
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

            }
            

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected()
    },[])

    
  return (
    <div className="">
    {activeAccount && (<SentMessagePreview activeAccount={activeAccount} />)}
        
    </div>
  )
}

export default SentMessageContainer