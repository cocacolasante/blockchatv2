import './globals.css'
import Providers from './Providers'
import ConnectWallet from '@/components/ConnectWallet'



export const metadata = {
  title: 'Blockchat',
  description: 'Anonymous Blockchain Messaging App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <Providers>
      <body >
      <ConnectWallet />
      {children}
      </body>   
     </Providers>
    </html>
  )
}
