"use client"
import Link from "next/link";
import "./Header.css";
import "../app/signup/page";
import "../app/login/page";
import { UserButton, useUser } from "@clerk/nextjs";
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className={`header ${theme === 'dark' ? 'dark' : ''}`}>
      <nav className="nav">
        <Link href="/" className="logo text-2xl font-bold hover:text-blue-600 transition duration-200">
          ConnectFace
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/#" className="nav-link hover:text-blue-600 transition duration-200">About</Link>
          </li>
          <li>
            <Link href="/#" className="nav-link hover:text-blue-600 transition duration-200">Features</Link>
          </li>
          <li>
            <Link href="/#" className="nav-link hover:text-blue-600 transition duration-200">Contact</Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <div className="user-button-wrapper">
            <UserButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;