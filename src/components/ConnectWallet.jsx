"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import DarkModeSwitch from "./DarkModeSwitch"


const ConnectWallet = () => {
    const [activeAccount, setActiveAccount] = useState()

    const connectWallet = async () =>{
        try{
            const {ethereum} = window;
            if(!ethereum){
                alert("please install metamask")
                return;
            }
            const accounts = await ethereum.request({method:"eth_requestAccounts"})
            const account = accounts[0]
            setActiveAccount(account)


        }catch(error){
            console.log(error)
        }
    }

    const checkIfWalletIsConnected = async () =>{
        try{
            const {ethereum} = window;
            if(!ethereum){
                alert("Please install metamask")
            }
            const accounts = await ethereum.request({method: "eth_accounts"})
            if(accounts.length !== 0 ){
                setActiveAccount(accounts[0]);
                console.log(`connected to ${activeAccount}`)

            }
            

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected()
    },[])
  return (
    <div className='flex justify-end mt-6 mr-10 space-x-4'>
        {!activeAccount ? <button className="w-48 transition-shadow bg-gray-400 rounded-full hover:underline hover:shadow-lg" onClick={connectWallet}><span className="">Connect Wallet</span> </button> : <p className="transition-shadow hover:underline hover:shadow">{activeAccount.slice(0,4)}...{activeAccount.slice(-6)}</p>}
        <DarkModeSwitch />
    </div>
  )
}

export default ConnectWallet