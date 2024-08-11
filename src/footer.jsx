import React from 'react';
import { FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-300 to-gray-500 w-full p-4 text-center shadow-inner flex flex-col items-center justify-center">
      <h1 className="text-3xl text-black mb-5 mt-5">f o l l o w</h1>
      <div className="flex space-x-4">
        <a href="https://instagram.com/digdarshan_b" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-4xl text-black hover:text-pink-800 mr-3" />
        </a>
        <a href="https://github.com/DigdarshanB" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-4xl text-black hover:text-purple-800 mr-3" />
        </a>
        <a href="https://youtube.com/Digdarshann" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-4xl text-black hover:text-red-800 mb-5" />
        </a>
      </div>
      <p className="text-sm text-black p-2 mb-2">
        &copy; {new Date().getFullYear()} Reminder. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
