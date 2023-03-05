import '../../app/globals.css'

import ConnectWallet from '@/components/ConnectWallet'
import { AccountContext } from '@/context/accountContext'



export const metadata = {
  title: 'Blockchat',
  description: 'Anonymous Blockchain Messaging App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <AccountContext>
      <body >
      <ConnectWallet />
      {children}
      </body>   
     </AccountContext>
    </html>
  )
}
