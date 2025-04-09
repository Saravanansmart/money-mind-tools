
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import SliderInput from '@/components/calculator/SliderInput';
import ResultCard from '@/components/calculator/ResultCard';
import { calculateEMI, formatCurrency } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface EMIFormValues {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
}

const EMICalculator = () => {
  const form = useForm<EMIFormValues>({
    defaultValues: {
      loanAmount: 1000000,
      interestRate: 9,
      loanTenure: 60
    }
  });

  const [results, setResults] = useState({
    emi: 0,
    totalPayment: 0,
    totalInterest: 0,
    principal: 0
  });

  const watchAllFields = form.watch();

  useEffect(() => {
    const { loanAmount, interestRate, loanTenure } = watchAllFields;
    const results = calculateEMI(loanAmount, interestRate, loanTenure);
    setResults(results);
  }, [watchAllFields]);

  const chartData = [
    { name: 'Principal', value: results.principal },
    { name: 'Interest', value: results.totalInterest }
  ];

  const COLORS = ['#4299E1', '#F56565'];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">EMI Calculator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calculate Your EMI</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-6">
                  <SliderInput
                    control={form.control}
                    name="loanAmount"
                    label="Loan Amount"
                    min={10000}
                    max={10000000}
                    step={10000}
                    formatDisplay={formatCurrency}
                    unit=""
                  />
                  
                  <SliderInput
                    control={form.control}
                    name="interestRate"
                    label="Interest Rate"
                    min={1}
                    max={30}
                    step={0.1}
                    unit="% p.a."
                  />
                  
                  <SliderInput
                    control={form.control}
                    name="loanTenure"
                    label="Loan Tenure"
                    min={12}
                    max={360}
                    step={12}
                    unit=" months"
                  />
                </div>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <ResultCard
              title="Monthly EMI"
              value={formatCurrency(results.emi)}
              description="Equated Monthly Installment"
              className="bg-finance-green/5 border-finance-green/30"
            />
            <ResultCard
              title="Total Interest Payable"
              value={formatCurrency(results.totalInterest)}
              description="Total interest over loan tenure"
              className="bg-finance-red/5 border-finance-red/30"
            />
            <ResultCard
              title="Total Payment"
              value={formatCurrency(results.totalPayment)}
              description="Principal + Interest"
              className="bg-finance-blue/5 border-finance-blue/30"
            />
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment Breakup</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-gray-600 text-sm">
          <h3 className="font-semibold mb-2">About EMI Calculator</h3>
          <p>This calculator helps you determine the Equated Monthly Installment (EMI) for your loan based on the loan amount, interest rate, and loan tenure.</p>
          <p className="mt-2">The formula used is EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>P = Principal Loan Amount</li>
            <li>r = Monthly Interest Rate (in decimal)</li>
            <li>n = Loan Tenure in Months</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default EMICalculator;
