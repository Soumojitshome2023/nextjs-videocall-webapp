'use client'

import React, { useState } from 'react'
import { useUrl } from 'nextjs-current-url'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { CheckCircle, Copy, ExternalLink, ArrowRight } from 'lucide-react'

export default function CreateLink() {
  const [genRoomId, setGenRoomId] = useState('')
  const { href: currentUrl } = useUrl() ?? {}
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${currentUrl}room/${genRoomId}`)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 3000)
      })
      .catch((error) => {
        console.error('Copy failed: ', error)
      })
  }

  const createRoomCode = () => {
    const id = uuidv4()
    setGenRoomId(id)
    setIsCopied(false)
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0a1229] via-[#162449] to-[#1e2b4a] text-white">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full px-4 py-1 bg-blue-600/20 text-blue-200 hover:bg-blue-600/30 transition-colors">
            <span className="text-xs font-medium">New</span>
            <span className="ml-2 text-xs">ConnectFace: Seamlessly Bridge Distances with Our Intuitive Video Calling WebApp</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Video Calling WebApp
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Welcome to ConnectFace, your go-to destination for effortless and crystal-clear video calling! Break down barriers and bring loved ones, colleagues, and friends closer than ever with our user-friendly web application.
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg backdrop-blur-sm">
            <input
              className="flex-grow bg-transparent border-0 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg px-4 py-2"
              placeholder="Create Room Link"
              readOnly
              value={genRoomId ? `${currentUrl}room/${genRoomId}` : ''}
            />
            <button
              onClick={copyToClipboard}
              className={`shrink-0 p-2 rounded-lg transition-colors ${
                isCopied 
                  ? 'bg-green-500/20 text-green-200 hover:bg-green-500/30' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={isCopied ? "Copied!" : "Copy to Clipboard"}
            >
              {isCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={createRoomCode}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Create Link
            </button>
            {genRoomId && (
              <Link
                href={`${currentUrl}room/${genRoomId}`}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                <span>Visit Link</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}