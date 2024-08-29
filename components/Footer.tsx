import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Dynamic JSON API Generator. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/about" className="text-white hover:text-gray-400 mx-2">About</Link>
          <Link href="/contact" className="text-white hover:text-gray-400 mx-2">Contact</Link>
          <Link href="https://github.com/htetko510217" className="text-white hover:text-gray-400 mx-2">GitHub</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
