
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import SliderInput from '@/components/calculator/SliderInput';
import ResultCard from '@/components/calculator/ResultCard';
import { calculatePPF, formatCurrency } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PPFFormValues {
  yearlyInvestment: number;
  tenure: number;
}

const PPFCalculator = () => {
  const form = useForm<PPFFormValues>({
    defaultValues: {
      yearlyInvestment: 150000,
      tenure: 15
    }
  });

  const [results, setResults] = useState({
    maturityAmount: 0,
    totalInvestment: 0,
    totalInterestEarned: 0,
    yearlyDetails: [] as Array<{
      year: number;
      investment: number;
      interest: number;
      balance: number;
    }>
  });

  const watchAllFields = form.watch();

  useEffect(() => {
    const { yearlyInvestment, tenure } = watchAllFields;
    const results = calculatePPF(yearlyInvestment, tenure);
    setResults(results);
  }, [watchAllFields]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">PPF Calculator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calculate Your PPF Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-6">
                  <SliderInput
                    control={form.control}
                    name="yearlyInvestment"
                    label="Yearly Investment"
                    min={500}
                    max={150000}
                    step={1000}
                    formatDisplay={formatCurrency}
                    unit=""
                  />
                  
                  <SliderInput
                    control={form.control}
                    name="tenure"
                    label="Investment Period"
                    min={15}
                    max={50}
                    step={1}
                    unit=" years"
                  />
                </div>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <ResultCard
              title="Maturity Amount"
              value={formatCurrency(results.maturityAmount)}
              description="Total amount at the end of tenure"
              className="bg-finance-purple/5 border-finance-purple/30"
            />
            <ResultCard
              title="Total Investment"
              value={formatCurrency(results.totalInvestment)}
              description="Total amount invested over the years"
              className="bg-finance-navy/5 border-finance-navy/30"
            />
            <ResultCard
              title="Interest Earned"
              value={formatCurrency(results.totalInterestEarned)}
              description="Total interest earned during the period"
              className="bg-finance-green/5 border-finance-green/30"
            />
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Growth Projection</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={results.yearlyDetails}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${(value/1000)}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="#9F7AEA" name="Balance" strokeWidth={2} />
                <Line type="monotone" dataKey="interest" stroke="#48BB78" name="Interest" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Year-by-Year Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Interest Earned</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.yearlyDetails.map((detail) => (
                    <TableRow key={detail.year}>
                      <TableCell>{detail.year}</TableCell>
                      <TableCell>{formatCurrency(detail.investment)}</TableCell>
                      <TableCell>{formatCurrency(detail.interest)}</TableCell>
                      <TableCell>{formatCurrency(detail.balance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-gray-600 text-sm">
          <h3 className="font-semibold mb-2">About PPF Calculator</h3>
          <p>This calculator helps you determine the returns on your Public Provident Fund (PPF) investment based on the yearly investment amount and investment period.</p>
          <p className="mt-2">The current PPF interest rate is 7.1% per annum, compounded yearly. The minimum tenure for a PPF account is 15 years, which can be extended in blocks of 5 years.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PPFCalculator;
