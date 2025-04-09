
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-bold text-finance-navy mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! We couldn't find that page.</p>
        <p className="text-gray-500 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button asChild className="bg-finance-teal hover:bg-finance-teal/90">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
