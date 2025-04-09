
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">About MoneyMindTools</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              At MoneyMindTools, we believe that financial literacy is essential for making sound financial decisions. 
              Our mission is to provide free, easy-to-use financial calculators that help you plan your investments, 
              loans, and taxes with confidence.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Our Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We offer a range of financial calculators to help you with various aspects of your financial planning:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Fixed Deposit Calculator:</strong> Calculate maturity amount and interest earned on your FD investment.</li>
              <li><strong>Recurring Deposit Calculator:</strong> Calculate returns on your monthly investments with RD calculator.</li>
              <li><strong>EMI Calculator:</strong> Calculate monthly EMI, total interest and payment breakup for your loan.</li>
              <li><strong>PPF Calculator:</strong> Calculate the returns on your Public Provident Fund investments.</li>
              <li><strong>Loan Calculator:</strong> Calculate your loan details with flexible terms and interest rates.</li>
              <li><strong>Income Tax Calculator:</strong> Estimate your income tax liability under different tax regimes.</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              The calculators provided on this website are for informational purposes only. 
              While we strive to keep the information up-to-date and accurate, we make no 
              representations or warranties of any kind, express or implied, about the 
              completeness, accuracy, reliability, suitability, or availability with respect 
              to the website or the information, products, services, or related graphics 
              contained on the website for any purpose.
            </p>
            <p className="text-gray-700 mt-4">
              Any reliance you place on such information is therefore strictly at your own risk. 
              We recommend consulting with a qualified financial advisor before making any 
              financial decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
