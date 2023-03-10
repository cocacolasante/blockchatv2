"use client"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PROFILEADDRESS } from "@/app/utils/Addresses";
import profileAbi from "../../app/utils/abis/ProfileAbi.json"
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";


const LoginRedirect = () => {
    const [activeAccount, setActiveAccount] = useState()
    const [hasProfile, setHasProfile] = useState(false)

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
                
                checkIfProfileExists(accounts[0])
                
            }
            

        }catch(err){
            console.log(err)
        }
    }

    const checkIfProfileExists = async (account) =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const ProfileContract = new ethers.Contract(PROFILEADDRESS, profileAbi.abi, provider)

        const currentUserStruct = await ProfileContract.users(account);
        console.log(currentUserStruct)

        if(currentUserStruct.username !== ""){
            setHasProfile(true)
        }

        
    }

    useEffect(()=>{
        checkIfWalletIsConnected()
    }, [])

  return (
    <div>
        {hasProfile ? <ProfilePage /> : <LoginPage /> }
    </div>
  )
}

export default LoginRedirect