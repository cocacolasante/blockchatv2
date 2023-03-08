import '../../app/globals.css'

import ConnectWallet from '@/components/ConnectWallet'




export const metadata = {
  title: 'Blockchat',
  description: 'Anonymous Blockchain Messaging App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <ConnectWallet />
      {children}
      
      </body>   
    </html>
  )
}
