"use client"
import 'flowbite';
import React, { useState } from 'react';
import { useUrl } from 'nextjs-current-url';
import Link from 'next/link';

export default function CreateLink({ GenRoomId, CreateRoomCode }) {
	const { href: currentUrl, pathname } = useUrl() ?? {};
	const [isCopied, setIsCopied] = useState(false);
	const copyToClipboard = () => {
		navigator.clipboard.writeText(`${currentUrl}room/${GenRoomId}`)
			.then(() => {
				setIsCopied(true);
			})
			.catch((error) => {
				console.error('Copy failed: ', error);
			});
	};

	return (

		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 h-screen px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
				<div className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
					<span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">New</span> <span className="text-sm font-medium">ConnectFace: Seamlessly Bridge Distances with Our Intuitive Video Calling WebApp</span>
					<svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
						<path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
					</svg>
				</div>
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Video Calling WebApp</h1>
				<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">Welcome to ConnectFace, your go-to destination for effortless and crystal-clear video calling! Break down barriers and bring loved ones, colleagues, and friends closer than ever with our user-friendly web application.</p>
				{/* <div className="w-full max-w-md mx-auto"> */}
				<input className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Create Room Link' value={GenRoomId && (`${currentUrl}room/${GenRoomId}`)} />
				{/* </div> */}
				<div className='m-2 flex justify-center flex-wrap'>
					<button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={CreateRoomCode}>Create Link</button>

					{GenRoomId &&
						<button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={copyToClipboard}>
							{isCopied ? "Copied" : "Copy LInk"}
						</button>
					}
					{GenRoomId &&
						<Link href={`${currentUrl}room/${GenRoomId}`} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
							Visit Link
						</Link>
					}

				</div>
			</div>
			<div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
		</section>

	)
}
