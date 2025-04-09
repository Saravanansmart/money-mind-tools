
import React from 'react';
import Layout from '@/components/Layout';
import CalculatorCard from '@/components/CalculatorCard';
import { Calculator, Landmark, PiggyBank, BriefcaseBusiness, CreditCard, DollarSign } from 'lucide-react';

const Index = () => {
  const calculators = [
    {
      title: "Fixed Deposit Calculator",
      description: "Calculate maturity amount and interest earned on your FD investment.",
      icon: Landmark,
      path: "/fd-calculator",
      color: "#38B2AC" // teal
    },
    {
      title: "Recurring Deposit Calculator",
      description: "Calculate returns on your monthly investments with RD calculator.",
      icon: PiggyBank,
      path: "/rd-calculator",
      color: "#4299E1" // blue
    },
    {
      title: "EMI Calculator",
      description: "Calculate monthly EMI, total interest and payment breakup for your loan.",
      icon: Calculator,
      path: "/emi-calculator",
      color: "#48BB78" // green
    },
    {
      title: "PPF Calculator",
      description: "Calculate the returns on your Public Provident Fund investments.",
      icon: BriefcaseBusiness,
      path: "/ppf-calculator",
      color: "#9F7AEA" // purple
    },
    {
      title: "Loan Calculator",
      description: "Calculate your loan details with flexible terms and interest rates.",
      icon: CreditCard,
      path: "/loan-calculator",
      color: "#F56565" // red
    },
    {
      title: "Income Tax Calculator",
      description: "Estimate your income tax liability under different tax regimes.",
      icon: DollarSign,
      path: "/income-tax-calculator",
      color: "#2C5282" // navy
    }
  ];

  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Calculators</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Make informed financial decisions with our easy-to-use calculators. 
          Plan your investments, loans, and taxes with precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc, index) => (
          <CalculatorCard
            key={index}
            title={calc.title}
            description={calc.description}
            icon={calc.icon}
            path={calc.path}
            color={calc.color}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
