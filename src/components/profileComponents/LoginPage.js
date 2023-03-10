"use client"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PROFILEADDRESS } from "@/app/utils/Addresses";
import profileAbi from "../../app/utils/abis/ProfileAbi.json"
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [username, setUsername] = useState("username")
    const router = useRouter()

    const createProfile = async (e) =>{
        e.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const ProfileContract = new ethers.Contract(PROFILEADDRESS, profileAbi.abi, signer)

       let txn = await ProfileContract.createProfile(username);
       let res = await txn.wait()

       if(res.status === 1){
        router.push("/chat/profile")
        
       }else{
        alert("failed")
       }
    }

  return (
    <form onSubmit={createProfile}>
        <input placeholder={username} onChange={e=>setUsername(e.target.value)} />
        <button type="submit" onClick={createProfile} >Create Profile</button>

    </form>
  )
}

export default LoginPage