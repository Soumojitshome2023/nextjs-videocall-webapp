import React from 'react'

export default function CallPage() {
    return (
        <>
            <div className='absolute w-screen h-screen'>
                <video className="w-full h-screen p-5" controls>
                    <source src="" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='absolute bottom-0 right-0'>

                <video className="w-48 h-72 p-5" controls>
                    <source src="" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='absolute top-0 right-0'>
                <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Off</button>
            </div>
        </>

    )
}
