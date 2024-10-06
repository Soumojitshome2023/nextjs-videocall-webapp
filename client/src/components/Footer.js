import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="quickLinks">
          <div className="column">
            <h4>Quick Links</h4>
            <ul className="list">
              <li>
                <a href="/#">Home</a>
              </li>
              <li>
                <a href="/#">About</a>
              </li>
              <li>
                <a href="/#">Features</a>
              </li>
              <li>
                <a href="/#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="column">
            <h4>More Links</h4>
            <ul className="list">
              <li>
                <a href="/#">Privacy Policy</a>
              </li>
              <li>
                <a href="/#">Terms of Service</a>
              </li>
              <li>
                <a href="/#">FAQ</a>
              </li>
              <li>
                <a href="/#">Support</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="feedback">
          <h4>Feedback</h4>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="bottom">
        <p>
          &copy; {new Date().getFullYear()} ConnectFace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
