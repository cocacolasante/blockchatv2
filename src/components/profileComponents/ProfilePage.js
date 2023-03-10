"use client"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PROFILEADDRESS } from "@/app/utils/Addresses";
import profileAbi from "../../app/utils/abis/ProfileAbi.json"

const ProfilePage = () => {
    const [activeAccount, setActiveAccount] = useState()

    const [username, setUsername] = useState()
    const [status, setStatus] = useState()
    const [newStatus, setNewStatus] =useState()
    const [nftImgUrl, setNftImgUrl] = useState()

    // get account and pass to profile smartcontract fetching function
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
                getProfileInfo(accounts[0])
                
                
            }
            

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        checkIfWalletIsConnected()
    }, [])

    // fetching smart contract data
    const getProfileInfo = async (account) =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const ProfileContract = new ethers.Contract(PROFILEADDRESS, profileAbi.abi, provider)

        const currentUserStruct = await ProfileContract.users(account);
        console.log(currentUserStruct)

        setUsername(currentUserStruct.username)
        if(currentUserStruct.status !== ""){
            setStatus(currentUserStruct.status)
        }
    }

    // set status function
    const handleSetStatus = async (e) =>{
        e.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const ProfileContract = new ethers.Contract(PROFILEADDRESS, profileAbi.abi, signer)

        let txn = await ProfileContract.setStatus(newStatus)
        let res = await txn.wait()

        if(res.status === 1){
            console.log("success")
        } else{
            console.log("failed")
        }


    }

    const setStatusInput = () =>{
        return(
            <div> 
                <form onSubmit={handleSetStatus}>
                    <input onChange={e=>setNewStatus(e.target.value)} placeholder="Set Status" />
                    <button onClick={handleSetStatus} type="submit" >Set Status</button>
                </form>
            </div>
        )
    }

    
    
    // main profile display function
    const displayProfile = () =>{

        return(
            <div>
                <h1>{username}</h1>
                {!status ? setStatusInput() : <p>{status}</p> }
            </div>
        )
    }


  return (
    <div>
    {username && displayProfile()}
        
    </div>
  )
}

export default ProfilePage