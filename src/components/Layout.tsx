
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, PiggyBank, Wallet, FileText, CreditCard } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-finance-navy text-white shadow-md">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Calculator className="h-6 w-6" />
            <span>MoneyMindTools</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-finance-teal transition-colors">Home</Link>
            <Link to="/about" className="hover:text-finance-teal transition-colors">About</Link>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        {children}
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="container mx-auto py-6 px-4 md:px-6 text-center text-gray-600">
          <p>&copy; 2025 MoneyMindTools. All rights reserved.</p>
          <p className="text-sm mt-2">Helping you make smarter financial decisions.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
