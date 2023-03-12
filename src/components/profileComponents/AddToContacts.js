"use client"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PROFILEADDRESS } from "@/app/utils/Addresses";
import profileAbi from "../../app/utils/abis/ProfileAbi.json"


const AddToContacts = ({account}) => {
    const [contactToAdd, setContactToAdd] = useState()
    

    const handleAddContact = async (e) =>{
        e.preventDefault()
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const ProfileContract = new ethers.Contract(PROFILEADDRESS, profileAbi.abi, signer)
    
            if(!contactToAdd) return;
    
            let txn = await ProfileContract.addToContact(contactToAdd)
            let res = await txn.wait()
    
            if(res.status === 1){
                console.log("success")
            }else{
                console.log("failed")
            }

        }catch(err){
            console.log(err)
        }
    }

    const handleInput = (e)=>{
        
        
        const contact = e.target.value
        
        setContactToAdd(contact)
    }

  return (
    <div className="space-x-2">
        <form onSubmit={handleAddContact}>
        <h2>Add to Contacts</h2>
            <input onChange={handleInput} placeholder="Add Contact" />
            <button type="submit" onClick={e=>handleAddContact()} >Add To Contacts</button>
        </form>

    </div>
  )
}

export default AddToContacts