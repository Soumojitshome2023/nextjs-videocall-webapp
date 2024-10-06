import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-20 h-20 text-purple-400 animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-7.5h13.5"
            />
          </svg>
        </div>
        <h1 className="text-7xl font-bold tracking-tight">404</h1>
        <p className="text-2xl font-light mt-4">Uh-oh! You're disconnected...</p>
        <p className="text-lg mt-2 text-purple-200">
          We couldn't connect to the page you were looking for.
        </p>
        <Link href="/">
          <button className="inline-block px-8 py-3 mt-8 text-lg font-medium text-indigo-600 bg-white rounded-full hover:bg-indigo-100 hover:shadow-lg transition-transform transform hover:scale-105">
            Reconnect to Home
          </button>
        </Link>
        <div className="mt-8 text-purple-400">
          <p>Or check your connection and try again.</p>
        </div>
      </div>
    </div>
  );
}
