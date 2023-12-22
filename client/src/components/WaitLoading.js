"use client"
// import Link from 'next/link';
import React from 'react';
import DataLoader from './DataLoader';

export default function WaitLoading() {

    return (
        <>
            < main className="grid min-h-full place-items-center px-6 py-12 sm:py-12 lg:px-8" >
                <div className="text-center">
                    {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
                    <DataLoader />
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">Please Wait :)</h1>
                    {/* <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p> */}

                </div>
            </main>
        </>
    )
}