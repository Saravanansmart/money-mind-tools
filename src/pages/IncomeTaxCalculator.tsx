
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import SliderInput from '@/components/calculator/SliderInput';
import ResultCard from '@/components/calculator/ResultCard';
import { calculateIncomeTax, formatCurrency } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TaxFormValues {
  income: number;
  regime: 'old' | 'new';
  age: number;
}

const IncomeTaxCalculator = () => {
  const form = useForm<TaxFormValues>({
    defaultValues: {
      income: 1000000,
      regime: 'new',
      age: 30
    }
  });

  const [results, setResults] = useState({
    netTaxableIncome: 0,
    incomeTax: 0,
    cess: 0,
    totalTaxLiability: 0
  });

  const [comparisonResults, setComparisonResults] = useState({
    old: {
      totalTaxLiability: 0
    },
    new: {
      totalTaxLiability: 0
    }
  });

  const watchAllFields = form.watch();

  useEffect(() => {
    const { income, regime, age } = watchAllFields;
    const results = calculateIncomeTax(income, regime, age);
    setResults(results);
    
    // Calculate for comparison
    const oldRegimeResults = calculateIncomeTax(income, 'old', age);
    const newRegimeResults = calculateIncomeTax(income, 'new', age);
    
    setComparisonResults({
      old: {
        totalTaxLiability: oldRegimeResults.totalTaxLiability
      },
      new: {
        totalTaxLiability: newRegimeResults.totalTaxLiability
      }
    });
  }, [watchAllFields]);

  const comparisonData = [
    {
      name: 'Old Regime',
      tax: comparisonResults.old.totalTaxLiability
    },
    {
      name: 'New Regime',
      tax: comparisonResults.new.totalTaxLiability
    }
  ];

  const betterRegime = comparisonResults.old.totalTaxLiability <= comparisonResults.new.totalTaxLiability ? 'old' : 'new';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Income Tax Calculator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calculate Your Income Tax</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-6">
                  <SliderInput
                    control={form.control}
                    name="income"
                    label="Annual Income"
                    min={250000}
                    max={5000000}
                    step={10000}
                    formatDisplay={formatCurrency}
                    unit=""
                  />
                  
                  <div className="space-y-3">
                    <Label>Tax Regime</Label>
                    <RadioGroup 
                      defaultValue={form.getValues('regime')}
                      onValueChange={(value) => form.setValue('regime', value as 'old' | 'new')}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="old" id="old" />
                        <Label htmlFor="old">Old Regime (with deductions)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new">New Regime (no deductions)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <SliderInput
                    control={form.control}
                    name="age"
                    label="Age"
                    min={18}
                    max={100}
                    step={1}
                    unit=" years"
                  />
                </div>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <ResultCard
              title="Net Taxable Income"
              value={formatCurrency(results.netTaxableIncome)}
              description="After standard deduction"
              className="bg-finance-navy/5 border-finance-navy/30"
            />
            <ResultCard
              title="Income Tax"
              value={formatCurrency(results.incomeTax)}
              description="As per tax slabs"
              className="bg-finance-blue/5 border-finance-blue/30"
            />
            <ResultCard
              title="Health & Education Cess"
              value={formatCurrency(results.cess)}
              description="4% of income tax"
              className="bg-finance-purple/5 border-finance-purple/30"
            />
            <ResultCard
              title="Total Tax Liability"
              value={formatCurrency(results.totalTaxLiability)}
              description="Total tax payable"
              className="bg-finance-red/5 border-finance-red/30"
            />
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tax Regime Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">The {betterRegime === 'old' ? 'Old' : 'New'} Regime is better for you, saving you {formatCurrency(Math.abs(comparisonResults.old.totalTaxLiability - comparisonResults.new.totalTaxLiability))}</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar 
                    dataKey="tax" 
                    name="Tax Amount" 
                    fill="#4299E1" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-gray-600 text-sm">
          <h3 className="font-semibold mb-2">About Income Tax Calculator</h3>
          <p>This calculator helps you estimate your income tax liability based on the income tax slabs for the current financial year. It compares both the old and new tax regimes to help you choose the most beneficial option.</p>
          <p className="mt-2">The old regime allows for various deductions and exemptions, while the new regime offers lower tax rates but without most deductions.</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Old Regime: Allows standard deduction of ₹50,000 and other exemptions</li>
            <li>New Regime: Offers reduced tax rates but without most deductions</li>
            <li>Health & Education Cess: 4% of income tax for both regimes</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default IncomeTaxCalculator;
