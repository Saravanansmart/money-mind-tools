
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import SliderInput from '@/components/calculator/SliderInput';
import ResultCard from '@/components/calculator/ResultCard';
import { calculateLoan, formatCurrency } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface LoanFormValues {
  principal: number;
  interestRate: number;
  tenure: number;
}

const LoanCalculator = () => {
  const form = useForm<LoanFormValues>({
    defaultValues: {
      principal: 2000000,
      interestRate: 10,
      tenure: 240
    }
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    paymentSchedule: [] as Array<{
      month: number;
      payment: number;
      principal: number;
      interest: number;
      remainingPrincipal: number;
    }>
  });

  const watchAllFields = form.watch();

  useEffect(() => {
    const { principal, interestRate, tenure } = watchAllFields;
    const results = calculateLoan(principal, interestRate, tenure);
    setResults(results);
  }, [watchAllFields]);

  // Sample data for charts (use first 12 months, then every 12th month)
  const prepareChartData = () => {
    if (results.paymentSchedule.length === 0) return [];
    
    const data = [];
    const totalMonths = results.paymentSchedule.length;
    
    // First 12 months
    for (let i = 0; i < Math.min(12, totalMonths); i++) {
      data.push(results.paymentSchedule[i]);
    }
    
    // Then every 12th month
    if (totalMonths > 12) {
      for (let i = 23; i < totalMonths; i += 12) {
        data.push(results.paymentSchedule[i]);
      }
    }
    
    // Make sure to include the last month
    if (totalMonths > 12 && data[data.length - 1].month !== totalMonths) {
      data.push(results.paymentSchedule[totalMonths - 1]);
    }
    
    return data;
  };
  
  const chartData = prepareChartData();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Loan Calculator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calculate Your Loan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-6">
                  <SliderInput
                    control={form.control}
                    name="principal"
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
                    name="tenure"
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
              title="Monthly Payment"
              value={formatCurrency(results.monthlyPayment)}
              description="Your monthly loan payment"
              className="bg-finance-red/5 border-finance-red/30"
            />
            <ResultCard
              title="Total Interest"
              value={formatCurrency(results.totalInterest)}
              description="Total interest over loan tenure"
              className="bg-finance-blue/5 border-finance-blue/30"
            />
            <ResultCard
              title="Total Payment"
              value={formatCurrency(results.totalPayment)}
              description="Principal + Interest"
              className="bg-finance-purple/5 border-finance-purple/30"
            />
          </div>
        </div>

        <Tabs defaultValue="chart" className="mt-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="chart">Payment Chart</TabsTrigger>
            <TabsTrigger value="schedule">Amortization Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>Payment Breakdown Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="principal" 
                      stackId="1" 
                      stroke="#4299E1" 
                      fill="#4299E1" 
                      name="Principal"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="interest" 
                      stackId="1" 
                      stroke="#F56565" 
                      fill="#F56565" 
                      name="Interest"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Loan Amortization Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Remaining</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.paymentSchedule.slice(0, 12).map((payment) => (
                        <TableRow key={payment.month}>
                          <TableCell>{payment.month}</TableCell>
                          <TableCell>{formatCurrency(payment.payment)}</TableCell>
                          <TableCell>{formatCurrency(payment.principal)}</TableCell>
                          <TableCell>{formatCurrency(payment.interest)}</TableCell>
                          <TableCell>{formatCurrency(payment.remainingPrincipal)}</TableCell>
                        </TableRow>
                      ))}
                      {results.paymentSchedule.length > 12 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-2">
                            ... {results.paymentSchedule.length - 12} more payments ...
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-gray-600 text-sm">
          <h3 className="font-semibold mb-2">About Loan Calculator</h3>
          <p>This calculator provides a comprehensive analysis of your loan, including monthly payments, total interest paid, and an amortization schedule.</p>
          <p className="mt-2">The amortization schedule shows how each payment is split between principal and interest, and how the remaining loan balance decreases over time.</p>
        </div>
      </div>
    </Layout>
  );
};

export default LoanCalculator;
