"use client"
import Link from "next/link";
import "./Header.css";
import "../app/signup/page";
import "../app/login/page";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const {user}= useUser();
  return (
    <header className="header">
      <nav className="nav">
        <Link href="/" className="logo">
          ConnectFace
        </Link>
        <ul className="navLinks">
          <li>
            <Link href="/#" className="navLink">
              About
            </Link>
          </li>
          <li>
            <Link href="/#" className="navLink">
              Features
            </Link>
          </li>
          <li>
            <Link href="/#" className="navLink">
              Contact
            </Link>
          </li>
        </ul>
        <UserButton/>
      </nav>
    </header>
  );
};

export default Header;
