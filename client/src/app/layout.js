import { Inter } from 'next/font/google'
import './globals.css'
import MyContextProvider from '@/context/SocketProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Video Calling WebApp',
  description: 'Soumojit Shome Video Calling WebApp',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyContextProvider>
          {children}
        </MyContextProvider>
      </body>
    </html>
  )
}
