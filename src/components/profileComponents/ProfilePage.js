"use client"
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [activeAccount, setActiveAccount] = useState()

    const [username, setUsername] = useState()
    const [status, setStatus] = useState()
    const [nftImgUrl, setNftImgUrl] = useState()

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
    }, [])

    const displayProfile = () =>{

        return(
            <div>

            </div>
        )
    }


  return (
    <div>
    {activeAccount && (<h1>{activeAccount}</h1>)}
        
    </div>
  )
}

export default ProfilePage