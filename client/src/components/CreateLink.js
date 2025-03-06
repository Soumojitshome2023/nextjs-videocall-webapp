"use client";
import 'flowbite';
import React, { useState } from 'react';
import { useUrl } from 'nextjs-current-url';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export default function CreateLink() {
	const [GenRoomId, setGenRoomId] = useState('');
	const { href: currentUrl } = useUrl() ?? { href: "" };
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = () => {
		if (!GenRoomId || !currentUrl) return;
		navigator.clipboard.writeText(`${currentUrl}room/${GenRoomId}`)
			.then(() => setIsCopied(true))
			.catch((error) => console.error('Copy failed: ', error));
	};

	const CreateRoomCode = () => {
		setGenRoomId(uuidv4());
		setIsCopied(false);
	};

	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
			
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
				<div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
			</div>

			
			<div className="relative bg-white/10 backdrop-blur-lg shadow-lg rounded-3xl p-8 w-full max-w-2xl text-center border border-white/20">
				<div className="inline-flex items-center py-2 px-4 mb-6 text-blue-300 bg-blue-900/30 rounded-full">
					<span className="text-xs bg-blue-600 rounded-full text-white px-3 py-1 mr-2">New</span>
					<span className="text-sm font-medium">Seamlessly Bridge Distances with ConnectFace</span>
				</div>

				<h1 className="text-4xl font-extrabold tracking-tight mb-4">
					Video Calling WebApp
				</h1>
				<p className="text-lg text-gray-300 mb-6">
					Welcome to <span className="text-blue-400 font-semibold">ConnectFace</span>, your go-to destination for seamless and crystal-clear video calling!
				</p>

				
				<input
					className="w-full p-4 text-sm text-white border border-gray-600 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Generate a room link"
					readOnly
					value={GenRoomId ? `${currentUrl}room/${GenRoomId}` : ""}
				/>

			
				<div className="flex flex-wrap justify-center mt-4 space-x-3">
					<button
						className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300"
						onClick={CreateRoomCode}
					>
						Create Link
					</button>

					{GenRoomId && (
						<>
							<button
								className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-br from-green-500 to-teal-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300"
								onClick={copyToClipboard}
							>
								{isCopied ? "Copied!" : "Copy Link"}
							</button>

							<Link
								href={`${currentUrl}room/${GenRoomId}`}
								className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-br from-red-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300"
							>
								Visit Link
							</Link>
						</>
					)}
				</div>
			</div>

		
			<style jsx>{`
				@keyframes blob {
					0%, 100% { transform: translateY(0) scale(1); }
					50% { transform: translateY(-20px) scale(1.1); }
				}
				.animate-blob {
					animation: blob 8s infinite ease-in-out;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</section>
	);
}
