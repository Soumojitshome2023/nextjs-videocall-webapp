import { Inter } from 'next/font/google'
import './globals.css'
import MyContextProvider from '@/context/SocketProvider'
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Video Calling WebApp',
  description: 'Soumojit Shome Video Calling WebApp',
};

export default function RootLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_FALLBACK_URL || 'https://soumojit-nextjs-videocall-webapp.vercel.app/';

  return (
    <ClerkProvider>
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="keywords"
          content="Video calling, WebRTC, Communication app, Video conferencing, Soumojit Shome"
        />
        <meta property="og:title" content="Video Calling WebApp" />
        <meta
          property="og:description"
          content="A web application for seamless video calls built by Soumojit Shome."
        />
        <meta property="og:image" content="/images/social-share-image.png" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Header />
        <MyContextProvider>{children}</MyContextProvider>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
