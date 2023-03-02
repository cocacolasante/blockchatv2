"use client"
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { createContext, useContext, useState } from 'react';
import ConnectWallet from '@/components/ConnectWallet';



const Providers = ({children}) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      

          {children}

    </ThemeProvider>
  )
}

export default Providers