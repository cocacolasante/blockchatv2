"use client"
import DarkModeSwitch from "./DarkModeSwitch"
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react";

import db, {addUserToDb, checkDbForUser} from "@/app/utils/firestore";





const ConnectWallet = () => {
    const router = useRouter()
    const [activeAccount, setActiveAccount] = useState()



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
                    addUserToDb(account)
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