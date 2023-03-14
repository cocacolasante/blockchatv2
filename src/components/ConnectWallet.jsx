"use client"
import DarkModeSwitch from "./DarkModeSwitch"
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";
import { networks } from "@/app/utils/networks";


import db, {addUserToDb, checkDbForUser} from "@/app/utils/firestore";
import { ethers } from "ethers";





const ConnectWallet = () => {
    const router = useRouter()
    const [activeAccount, setActiveAccount] = useState()

    const [network, setNetwork] = useState("")



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
                
                
                const account = accounts[0].toString().toLowerCase()
                
                
                setActiveAccount(account)
                
                
                if(!checkDbForUser(accounts[0])){
                    addUserToDb(account)
                    router.push(`/chat`)
                }

                
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
            const chainId = await ethereum.request({method: "eth_chainId"})
            console.log(chainId)

            setNetwork(networks[chainId])

            ethereum.on('chainChanged', handleChainChanged);

            function handleChainChanged(_chainId) {
                window.location.reload();
            }
            
            if(accounts.length !== 0 ){
                setActiveAccount(accounts[0]);
                
                router.push(`/chat/`)
                
            }else{
                router.push(`/`)
            }
            

        }catch(err){
            console.log(err)
        }
    }

    const handleNetworkSwitch = async () =>{
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: "0x3"}],
            });
            console.log("You have switched to the right network")
            
          } catch (switchError) {
            
            // The network has not been added to MetaMask
            if (switchError.code === 4902) {
             console.log("Please add the Polygon network to MetaMask")
            }
            console.log("Cannot switch to the network", switchError)
            
          }
    }
    
    useEffect(()=>{
        checkIfWalletIsConnected()
    },[])

    
  return (
    <>
    <div className="text-4xl font-bold text-center">
        <Link href={`/chat`}>
            
        <h1>Blockchat</h1>
        </Link>
    </div>
        
    <div className='flex justify-end mt-6 mr-10 space-x-4 '>
        {!activeAccount ? <button className="w-48 transition-shadow bg-gray-400 rounded-full hover:underline hover:shadow-lg" onClick={connectWallet}><span className="">Connect Wallet</span> </button> : 
        (network !== "Hardhat Testnet" ?  <button onClick={handleNetworkSwitch} className="transition-shadow hover:underline hover:shadow">Switch Network</button> :

            <>
            <Link href={`/chat/profile`} className="transition-shadow hover:underline hover:shadow">Profile</Link>
            <Link href={`/chat/profile`} className="transition-shadow hover:underline hover:shadow">{activeAccount.slice(0,4)}...{activeAccount.slice(-6)}</Link>
            </>
        )}
        <DarkModeSwitch />
        
    </div>
    </>
  )
}

export default ConnectWallet