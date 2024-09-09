import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">

        <p className="mb-4">
          &copy; {new Date().getFullYear()} Dynamic JSON API Generator. All rights reserved.
        </p>

        <div className="flex justify-center mb-4 space-x-4">
          <Link href="/" className="text-white hover:text-gray-400">Home</Link>
          <Link href="/generate" className="text-white hover:text-gray-400">Generate Api</Link>
          <Link href="/guide" className="text-white hover:text-gray-400">Guide</Link>
        </div>

        <div className="flex justify-center space-x-4">
          <a href="https://www.linkedin.com/in/htetko510217/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={24} className="text-white hover:text-gray-400" />
          </a>
          <a href="https://github.com/htetko510217" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={24} className="text-white hover:text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
