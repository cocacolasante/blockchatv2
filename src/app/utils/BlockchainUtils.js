export const checkIfWalletIsConnected = async () =>{
    try{
        const {ethereum} = window;
        if(!ethereum){
            alert("Please install metamask")
            router.push(`/`)
        }
        const accounts = await ethereum.request({method: "eth_accounts"})
        if(accounts.length !== 0 ){
            
            return accounts[0]
  
        }

    }catch(err){
        console.log(err)
    }
}