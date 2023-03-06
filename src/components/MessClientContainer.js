"use client"
import MessagePrevClient from "./MessagePrevClient"
import { useState, useEffect } from "react"

const MessClientContainer = () => {
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
    <div>
    {activeAccount && (<MessagePrevClient activeAccount={activeAccount} />)}
        
    </div>
  )
}

export default MessClientContainer