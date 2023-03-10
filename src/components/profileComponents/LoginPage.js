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
       console.log(res)

       if(res.status === 1){
           console.log("success")
           
        }else{
            alert("failed")
        }
        router.push("/chat/")
    }

  return (
    <div className="flex items-center justify-center h-screen my-auto ">
        <div className="flex flex-col justify-center text-center align-middle border border-gray-400 rounded-3xl h-96 w-96 bg-neutral-800" >
            <h2 className="pb-10 text-lg">Create Profile</h2>
            <p className="pb-10 text-sm">Create your unique annonymous profile with only a username and metamask account</p>
            <form onSubmit={createProfile}>
                <input className="text-black bg-white" placeholder={username} onChange={e=>setUsername(e.target.value)} />
                <div className="">
                    
                    <button className="text-black bg-gray-500 border border-gray-500" type="submit" onClick={createProfile} >Create Profile</button>
                </div>

            </form>
            
        </div>
    </div>
  )
}

export default LoginPage