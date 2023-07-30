"use client"
import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const lodash = require('lodash')
const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'A Kanji A Day',
//   description: 'Learn a new kanji everyday',
// }


export default function RootLayout({children,}: {children: React.ReactNode}) {
  useEffect(() => {
    require('preline')
  }, [])

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        {children}
      <script src="../node_modules/preline/dist/preline.js"></script>
      </body>
    </html>
  )
}
