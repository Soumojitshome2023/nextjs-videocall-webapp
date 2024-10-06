import Link from "next/link";
import "./Header.css";

const Header = () => {
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
        <div className="buttonContainer">
          <Link href="/login" className="button">
            Login
          </Link>
          <Link
            href="/signup"
            className="button"
            style={{ marginLeft: "0.5rem" }}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
