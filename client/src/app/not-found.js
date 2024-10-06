import React from "react";
import Link from "next/link";

export default function CustomErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-slate-900 p-4">
      <div className="border-slate-700 p-8 max-w-2xl w-full text-center text-white">
        <div className="mb-4">
          <svg
            className="w-24 h-24 mx-auto text-white animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold mb-2 tracking-tight">
          4<span className="text-yellow-300">0</span>4
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-6">
          Oops! Connection Lost
        </p>
        <p className="text-xl mb-8">
          The face you're looking for is out of frame.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/">
            <button className="bg-white text-slate-800 px-8 py-3 rounded-full inline-flex justify-center items-center font-semibold text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Back to Home
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
