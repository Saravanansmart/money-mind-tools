
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import SliderInput from '@/components/calculator/SliderInput';
import ResultCard from '@/components/calculator/ResultCard';
import { calculateFD, formatCurrency } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FDFormValues {
  principal: number;
  interestRate: number;
  tenure: number;
  compoundFrequency: number;
}

const FDCalculator = () => {
  const form = useForm<FDFormValues>({
    defaultValues: {
      principal: 100000,
      interestRate: 7,
      tenure: 5,
      compoundFrequency: 4
    }
  });

  const [results, setResults] = useState({
    maturityAmount: 0,
    interestEarned: 0
  });

  const watchAllFields = form.watch();

  useEffect(() => {
    const { principal, interestRate, tenure, compoundFrequency } = watchAllFields;
    const results = calculateFD(principal, interestRate, tenure, compoundFrequency);
    setResults(results);
  }, [watchAllFields]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Fixed Deposit Calculator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calculate Your FD Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-6">
                  <SliderInput
                    control={form.control}
                    name="principal"
                    label="Principal Amount"
                    min={1000}
                    max={10000000}
                    step={1000}
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
                    min={1}
                    max={30}
                    step={1}
                    unit=" years"
                  />
                  
                  <div className="space-y-2">
                    <label className="text-base font-medium">Compounding Frequency</label>
                    <Select 
                      onValueChange={(value) => form.setValue('compoundFrequency', parseInt(value))}
                      defaultValue={form.getValues('compoundFrequency').toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Annually</SelectItem>
                        <SelectItem value="2">Semi-Annually</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <ResultCard
              title="Maturity Amount"
              value={formatCurrency(results.maturityAmount)}
              description="Total amount you'll receive at maturity"
              className="bg-finance-teal/5 border-finance-teal/30"
            />
            <ResultCard
              title="Interest Earned"
              value={formatCurrency(results.interestEarned)}
              description="Total interest earned during the period"
              className="bg-finance-green/5 border-finance-green/30"
            />
            <ResultCard
              title="Invested Amount"
              value={formatCurrency(form.watch('principal'))}
              description="Your initial investment"
              className="bg-gray-100 border-gray-200"
            />
          </div>
        </div>
        
        <div className="mt-8 text-gray-600 text-sm">
          <h3 className="font-semibold mb-2">About Fixed Deposit Calculator</h3>
          <p>This calculator helps you determine the maturity amount and interest earned on your fixed deposit based on the principal amount, interest rate, tenure, and compounding frequency.</p>
          <p className="mt-2">The formula used is A = P(1 + r/n)^(nt), where:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>A = Maturity Amount</li>
            <li>P = Principal Amount</li>
            <li>r = Interest Rate (in decimal)</li>
            <li>n = Compounding Frequency</li>
            <li>t = Tenure (in years)</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default FDCalculator;
