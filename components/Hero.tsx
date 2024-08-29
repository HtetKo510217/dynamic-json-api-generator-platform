import React from 'react';
import { Button } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Create and Manage Your APIs with Ease</h1>
        <p className="text-xl text-gray-600 mb-12">Generate dynamic JSON APIs, handle CRUD operations, and get your API URLs instantly.</p>
        <Button variant="contained" href="/generate" color="primary" size="large">Get Started for Free</Button>
      </div>
    </section>
  );
};

export default Hero;
