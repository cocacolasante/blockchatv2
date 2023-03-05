"use client"
import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export function AccountContext({ children }) {
  const [user, setUser] = useState();
  const checkIfWalletIsConnected = async () =>{
    try{
        const {ethereum} = window;
        if(!ethereum){
            alert("Please install metamask")
            router.push(`/`)
        }
        const accounts = await ethereum.request({method: "eth_accounts"})
        if(accounts.length !== 0 ){
            
            setUser(accounts[0])
  
        }

    }catch(err){
        console.log(err)
    }
}

  useEffect(()=>{
    checkIfWalletIsConnected()
    
  }, {})

  return (
    <Context.Provider value={user}>{children} </Context.Provider>
  );
}

export function useAccountContext() {
  return useContext(Context);
}