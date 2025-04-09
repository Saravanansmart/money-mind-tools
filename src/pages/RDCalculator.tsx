
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import SliderInput from '@/components/calculator/SliderInput';
import ResultCard from '@/components/calculator/ResultCard';
import { calculateRD, formatCurrency } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

interface RDFormValues {
  monthlyInvestment: number;
  interestRate: number;
  tenure: number;
}

const RDCalculator = () => {
  const form = useForm<RDFormValues>({
    defaultValues: {
      monthlyInvestment: 5000,
      interestRate: 7,
      tenure: 36
    }
  });

  const [results, setResults] = useState({
    maturityAmount: 0,
    totalInvestment: 0,
    interestEarned: 0
  });

  const watchAllFields = form.watch();

  useEffect(() => {
    const { monthlyInvestment, interestRate, tenure } = watchAllFields;
    const results = calculateRD(monthlyInvestment, interestRate, tenure);
    setResults(results);
  }, [watchAllFields]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Recurring Deposit Calculator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calculate Your RD Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-6">
                  <SliderInput
                    control={form.control}
                    name="monthlyInvestment"
                    label="Monthly Investment"
                    min={500}
                    max={100000}
                    step={500}
                    formatDisplay={formatCurrency}
                    unit=""
                  />
                  
                  <SliderInput
                    control={form.control}
                    name="interestRate"
                    label="Interest Rate"
                    min={1}
                    max={15}
                    step={0.1}
                    unit="%"
                  />
                  
                  <SliderInput
                    control={form.control}
                    name="tenure"
                    label="Tenure"
                    min={3}
                    max={120}
                    step={3}
                    unit=" months"
                  />
                </div>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <ResultCard
              title="Maturity Amount"
              value={formatCurrency(results.maturityAmount)}
              description="Total amount you'll receive at maturity"
              className="bg-finance-blue/5 border-finance-blue/30"
            />
            <ResultCard
              title="Total Investment"
              value={formatCurrency(results.totalInvestment)}
              description="Total amount invested during the period"
              className="bg-finance-navy/5 border-finance-navy/30"
            />
            <ResultCard
              title="Interest Earned"
              value={formatCurrency(results.interestEarned)}
              description="Total interest earned during the period"
              className="bg-finance-green/5 border-finance-green/30"
            />
          </div>
        </div>
        
        <div className="mt-8 text-gray-600 text-sm">
          <h3 className="font-semibold mb-2">About Recurring Deposit Calculator</h3>
          <p>This calculator helps you determine the maturity amount and interest earned on your recurring deposit based on the monthly investment, interest rate, and tenure.</p>
          <p className="mt-2">The formula used is M × (((1 + r)^n - 1) / r) × (1 + r), where:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>M = Monthly Investment</li>
            <li>r = Monthly Interest Rate (in decimal)</li>
            <li>n = Number of Months</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default RDCalculator;
