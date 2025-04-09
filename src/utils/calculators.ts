
// Financial calculation utility functions

// Fixed Deposit (FD) Calculator
export const calculateFD = (principal: number, rate: number, years: number, compoundFrequency: number = 4) => {
  const r = rate / 100;
  const n = compoundFrequency;
  const t = years;
  
  // A = P(1 + r/n)^(nt)
  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const interestEarned = maturityAmount - principal;
  
  return {
    maturityAmount: Math.round(maturityAmount),
    interestEarned: Math.round(interestEarned)
  };
};

// Recurring Deposit (RD) Calculator
export const calculateRD = (monthlyInvestment: number, rate: number, months: number) => {
  const r = rate / 100 / 12; // Monthly interest rate
  const n = months;
  
  // M × (((1 + r)^n - 1) / r) × (1 + r)
  const maturityAmount = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalInvestment = monthlyInvestment * months;
  const interestEarned = maturityAmount - totalInvestment;
  
  return {
    maturityAmount: Math.round(maturityAmount),
    totalInvestment: Math.round(totalInvestment),
    interestEarned: Math.round(interestEarned)
  };
};

// EMI Calculator
export const calculateEMI = (loanAmount: number, interestRate: number, tenureInMonths: number) => {
  const r = interestRate / 100 / 12; // Monthly interest rate
  const n = tenureInMonths;
  
  // EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;
  
  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal: loanAmount
  };
};

// PPF Calculator
export const calculatePPF = (yearlyInvestment: number, years: number) => {
  const rate = 7.1 / 100; // Current PPF interest rate (can be updated)
  let balance = 0;
  let totalInvestment = 0;
  let yearlyDetails = [];
  
  for (let year = 1; year <= years; year++) {
    totalInvestment += yearlyInvestment;
    const interestForYear = (balance + yearlyInvestment) * rate;
    balance = balance + yearlyInvestment + interestForYear;
    
    yearlyDetails.push({
      year,
      investment: yearlyInvestment,
      interest: Math.round(interestForYear),
      balance: Math.round(balance)
    });
  }
  
  return {
    maturityAmount: Math.round(balance),
    totalInvestment,
    totalInterestEarned: Math.round(balance - totalInvestment),
    yearlyDetails
  };
};

// Loan Calculator (More comprehensive than EMI calculator)
export const calculateLoan = (principal: number, interestRate: number, tenureInMonths: number) => {
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths) / 
                         (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
  
  let remainingPrincipal = principal;
  let paymentSchedule = [];
  let totalInterest = 0;
  
  for (let month = 1; month <= tenureInMonths; month++) {
    const interestForMonth = remainingPrincipal * monthlyRate;
    const principalForMonth = monthlyPayment - interestForMonth;
    
    remainingPrincipal -= principalForMonth;
    totalInterest += interestForMonth;
    
    paymentSchedule.push({
      month,
      payment: monthlyPayment,
      principal: principalForMonth,
      interest: interestForMonth,
      remainingPrincipal: Math.max(0, remainingPrincipal)
    });
  }
  
  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(monthlyPayment * tenureInMonths),
    totalInterest: Math.round(totalInterest),
    paymentSchedule
  };
};

// Income Tax Calculator (Indian tax slabs for FY 2023-24)
export const calculateIncomeTax = (income: number, regime: 'old' | 'new', age: number) => {
  let taxableIncome = income;
  let tax = 0;
  
  // Deductions only applicable in old regime
  const standardDeduction = regime === 'old' ? 50000 : 0;
  taxableIncome -= standardDeduction;
  
  if (regime === 'old') {
    // Old Regime
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }
    
    // Senior citizen special slabs (60-80 years)
    if (age >= 60 && age < 80) {
      if (taxableIncome <= 300000) {
        tax = 0;
      } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 10000 + (taxableIncome - 500000) * 0.2;
      } else {
        tax = 110000 + (taxableIncome - 1000000) * 0.3;
      }
    }
    
    // Super senior citizen (80+ years)
    if (age >= 80) {
      if (taxableIncome <= 500000) {
        tax = 0;
      } else if (taxableIncome <= 1000000) {
        tax = (taxableIncome - 500000) * 0.2;
      } else {
        tax = 100000 + (taxableIncome - 1000000) * 0.3;
      }
    }
  } else {
    // New Regime
    if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome <= 600000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 900000) {
      tax = 15000 + (taxableIncome - 600000) * 0.1;
    } else if (taxableIncome <= 1200000) {
      tax = 45000 + (taxableIncome - 900000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      tax = 90000 + (taxableIncome - 1200000) * 0.2;
    } else {
      tax = 150000 + (taxableIncome - 1500000) * 0.3;
    }
  }
  
  // Calculate cess
  const cess = tax * 0.04;
  
  return {
    netTaxableIncome: Math.round(taxableIncome),
    incomeTax: Math.round(tax),
    cess: Math.round(cess),
    totalTaxLiability: Math.round(tax + cess)
  };
};

// Utility function to format currency (INR)
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
