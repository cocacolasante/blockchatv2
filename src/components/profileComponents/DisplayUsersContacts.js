"use client"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PROFILEADDRESS } from "@/app/utils/Addresses";
import profileAbi from "../../app/utils/abis/ProfileAbi.json"
import AddToContacts from "./AddToContacts";

const DisplayUsersContacts = ({account}) => {

    const [contactList, setContactList] = useState()

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
                
                getContactList(accounts[0])

                
            }
            

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        checkIfWalletIsConnected()
    }, [])

    const getContactList = async (account) =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const ProfileContract = new ethers.Contract(PROFILEADDRESS, profileAbi.abi, provider)

        const usersContacts = await ProfileContract.returnContactList(account)
        if(usersContacts.lenght > 0){
            setContactList(usersContacts)

        }

    }


  return (
    <div className="pt-10 ">
        <AddToContacts account={account} />
        <h2>Current Contacts</h2>
    </div>
  )
}

export default DisplayUsersContacts