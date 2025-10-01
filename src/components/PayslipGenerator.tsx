import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Printer, Download } from 'lucide-react';

interface PayslipData {
  month: string;
  year: number;
  basicSalary: number;
  otherAllowance: number;
  lunchBill: number;
  eobi: number;
  providentFund: number;
  mobilDeduction: number;
  incomeTax: number;
}

const PayslipGenerator = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Jul');
  const [selectedYear, setSelectedYear] = useState<number>(2013);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const generateRandomDeduction = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generatePayslipData = (month: string, year: number): PayslipData => {
    // Determine salary and deductions based on year and month
    let basicSalary: number;
    let otherAllowance: number;
    let incomeTax: number;
    let providentFund: number;
    const monthIndex = months.indexOf(month);
    
    // Period 1: July 2013 to June 2014
    if (year === 2013 || (year === 2014 && monthIndex < 6)) {
      basicSalary = 30000;
      otherAllowance = 20000;
      incomeTax = 1083;
      providentFund = 3000;
    }
    // Period 2: July 2014 to June 2015
    else if ((year === 2014 && monthIndex >= 6) || (year === 2015 && monthIndex < 6)) {
      basicSalary = 42000;
      otherAllowance = 28000;
      incomeTax = 2208;
      providentFund = 4200;
    }
    // Period 3: July 2016 to June 2017
    else if ((year === 2016 && monthIndex >= 6) || (year === 2017 && monthIndex < 6)) {
      basicSalary = 57000;
      otherAllowance = 38000;
      incomeTax = 4458;
      providentFund = 5700;
    }
    // Period 4: July 2018 to June 2019
    else if ((year === 2018 && monthIndex >= 6) || (year === 2019 && monthIndex < 6)) {
      basicSalary = 57000;
      otherAllowance = 38000;
      incomeTax = 4458;
      providentFund = 5700;
    }
    // Period 5: July 2019 to June 2020
    else if ((year === 2019 && monthIndex >= 6) || (year === 2020 && monthIndex < 6)) {
      basicSalary = 57000;
      otherAllowance = 38000;
      incomeTax = 4458;
      providentFund = 5700;
    }
    // Period 6: July 2020 to June 2021
    else if ((year === 2020 && monthIndex >= 6) || (year === 2021 && monthIndex < 6)) {
      basicSalary = 66000;
      otherAllowance = 44000;
      incomeTax = 3500;
      providentFund = 6600;
    }
    // Period 7: July 2021 to June 2022
    else if ((year === 2021 && monthIndex >= 6) || (year === 2022 && monthIndex < 6)) {
      basicSalary = 90000;
      otherAllowance = 60000;
      incomeTax = 7500;
      providentFund = 9000;
    }
    // Period 8: July 2022 to June 2023
    else if ((year === 2022 && monthIndex >= 6) || (year === 2023 && monthIndex < 6)) {
      basicSalary = 99000;
      otherAllowance = 66000;
      incomeTax = 9375;
      providentFund = 9900;
    }
    // Default fallback
    else {
      basicSalary = 30000;
      otherAllowance = 20000;
      incomeTax = 1083;
      providentFund = 3000;
    }

    // Fixed deductions (same for all months)
    const eobi = 130;
    const mobilDeduction = 1600; // Fixed mobile deduction
    
    // Random deductions
    const lunchBill = generateRandomDeduction(2200, 2800);

    return {
      month,
      year,
      basicSalary,
      otherAllowance,
      lunchBill,
      eobi,
      providentFund,
      mobilDeduction,
      incomeTax
    };
  };

  const payslipData = generatePayslipData(selectedMonth, selectedYear);

  const grossSalary = payslipData.basicSalary + payslipData.otherAllowance;
  const totalDeductions = payslipData.lunchBill + payslipData.eobi + payslipData.providentFund + payslipData.mobilDeduction + payslipData.incomeTax;
  const netPayable = grossSalary - totalDeductions;

  // Calculate cumulative PF based on the current period
  const calculateCumulativePF = (month: string, year: number): number => {
    const monthIndex = months.indexOf(month);
    let monthsInCurrentPeriod = 0;
    
    // Determine which period and calculate months elapsed in that period
    if (year === 2013 || (year === 2014 && monthIndex < 6)) {
      // Period 1: July 2013 to June 2014
      if (year === 2013) {
        monthsInCurrentPeriod = monthIndex - 6 + 1; // July=1, Aug=2, etc.
      } else {
        monthsInCurrentPeriod = 6 + monthIndex + 1; // Jan=7, Feb=8, etc.
      }
    } else if ((year === 2014 && monthIndex >= 6) || (year === 2015 && monthIndex < 6)) {
      // Period 2: July 2014 to June 2015
      if (year === 2014) {
        monthsInCurrentPeriod = monthIndex - 6 + 1;
      } else {
        monthsInCurrentPeriod = 6 + monthIndex + 1;
      }
    } else if ((year === 2016 && monthIndex >= 6) || (year === 2017 && monthIndex < 6)) {
      // Period 3: July 2016 to June 2017
      if (year === 2016) {
        monthsInCurrentPeriod = monthIndex - 6 + 1;
      } else {
        monthsInCurrentPeriod = 6 + monthIndex + 1;
      }
    } else if ((year === 2018 && monthIndex >= 6) || (year === 2019 && monthIndex < 6)) {
      // Period 4: July 2018 to June 2019
      if (year === 2018) {
        monthsInCurrentPeriod = monthIndex - 6 + 1;
      } else {
        monthsInCurrentPeriod = 6 + monthIndex + 1;
      }
    } else if ((year === 2019 && monthIndex >= 6) || (year === 2020 && monthIndex < 6)) {
      // Period 5: July 2019 to June 2020
      if (year === 2019) {
        monthsInCurrentPeriod = monthIndex - 6 + 1;
      } else {
        monthsInCurrentPeriod = 6 + monthIndex + 1;
      }
    } else if ((year === 2020 && monthIndex >= 6) || (year === 2021 && monthIndex < 6)) {
      // Period 6: July 2020 to June 2021
      if (year === 2020) {
        monthsInCurrentPeriod = monthIndex - 6 + 1;
      } else {
        monthsInCurrentPeriod = 6 + monthIndex + 1;
      }
    } else if ((year === 2021 && monthIndex >= 6) || (year === 2022 && monthIndex < 6)) {
      // Period 7: July 2021 to June 2022
      if (year === 2021) {
        monthsInCurrentPeriod = monthIndex - 6 + 1;
      } else {
        monthsInCurrentPeriod = 6 + monthIndex + 1;
      }
    } else if ((year === 2022 && monthIndex >= 6) || (year === 2023 && monthIndex < 6)) {
      // Period 8: July 2022 to June 2023
      if (year === 2022) {
        monthsInCurrentPeriod = monthIndex - 6 + 1;
      } else {
        monthsInCurrentPeriod = 6 + monthIndex + 1;
      }
    }
    
    return payslipData.providentFund * monthsInCurrentPeriod;
  };

  const cumulativePF = calculateCumulativePF(selectedMonth, selectedYear);

  const handlePrint = () => {
    window.print();
  };

  const getAvailableMonthsYears = () => {
    const result = [];
    
    // Period 1: July 2013 to June 2014
    for (let i = 6; i < 12; i++) result.push({ month: months[i], year: 2013 });
    for (let i = 0; i < 6; i++) result.push({ month: months[i], year: 2014 });
    
    // Period 2: July 2014 to June 2015
    for (let i = 6; i < 12; i++) result.push({ month: months[i], year: 2014 });
    for (let i = 0; i < 6; i++) result.push({ month: months[i], year: 2015 });
    
    // Period 3: July 2016 to June 2017
    for (let i = 6; i < 12; i++) result.push({ month: months[i], year: 2016 });
    for (let i = 0; i < 6; i++) result.push({ month: months[i], year: 2017 });
    
    // Period 4: July 2018 to June 2019
    for (let i = 6; i < 12; i++) result.push({ month: months[i], year: 2018 });
    for (let i = 0; i < 6; i++) result.push({ month: months[i], year: 2019 });
    
    // Period 5: July 2019 to June 2020
    for (let i = 6; i < 12; i++) result.push({ month: months[i], year: 2019 });
    for (let i = 0; i < 6; i++) result.push({ month: months[i], year: 2020 });
    
    // Period 6: July 2020 to June 2021
    for (let i = 6; i < 12; i++) result.push({ month: months[i], year: 2020 });
    for (let i = 0; i < 6; i++) result.push({ month: months[i], year: 2021 });
    
    // Period 7: July 2021 to June 2022
    for (let i = 6; i < 12; i++) result.push({ month: months[i], year: 2021 });
    for (let i = 0; i < 6; i++) result.push({ month: months[i], year: 2022 });
    
    // Period 8: July 2022 to June 2023
    for (let i = 6; i < 12; i++) result.push({ month: months[i], year: 2022 });
    for (let i = 0; i < 6; i++) result.push({ month: months[i], year: 2023 });
    
    return result;
  };

  const availableOptions = getAvailableMonthsYears();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Controls - Hidden in print */}
        <div className="mb-6 no-print">
          <Card>
            <CardHeader>
              <CardTitle className="text-corporate-dark">PaySlip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium">Select Month & Year</label>
                  <Select
                    value={`${selectedMonth}-${selectedYear}`}
                    onValueChange={(value) => {
                      const [month, year] = value.split('-');
                      setSelectedMonth(month);
                      setSelectedYear(parseInt(year));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableOptions.map((option) => (
                        <SelectItem key={`${option.month}-${option.year}`} value={`${option.month}-${option.year}`}>
                          {option.month} {option.year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handlePrint} className="flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print Payslip
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payslip - Print optimized */}
        <div className="payslip-container bg-white shadow-lg border border-gray-300 relative overflow-hidden">
          {/* Watermark */}
          <div className="watermark" style={{ color: 'rgba(255, 184, 0, 0.15)', fontStyle: 'italic' }}>X</div>
          
          <div className="p-8 relative z-10">
            {/* Header - Exact match to original */}
            <div className="border border-black">
              {/* PAYSLIP header bar at top */}
              <div className="text-white p-3 text-right" style={{ backgroundColor: '#FFB800' }}>
                <h1 className="text-2xl font-bold tracking-wider">PAYSLIP</h1>
              </div>
              
              {/* Main header content */}
              <div className="p-4 flex justify-between items-start">
                <div>
                  <div className="text-5xl font-bold mb-1" style={{ letterSpacing: '-2px' }}>
                    <span className="text-gray-600">a</span>
                    <span className="text-yellow-500 italic" style={{ color: '#FFB800' }}>X</span>
                    <span className="text-gray-600">act</span>
                  </div>
                  <div className="text-xs text-gray-700 font-medium">World's Leading IT Company</div>
                </div>
                
                <div className="text-right">
                  <table className="text-sm">
                    <tbody>
                      <tr>
                        <td className="text-left pr-4"><span className="font-medium">Axactian Name :</span></td>
                        <td className="text-left">Noman Waheed</td>
                        <td className="text-left pl-8 pr-4"><span className="font-medium">Period :</span></td>
                        <td className="text-left">{selectedMonth} {selectedYear}</td>
                      </tr>
                      <tr>
                        <td className="text-left pr-4"><span className="font-medium">Designation :</span></td>
                        <td className="text-left">Software Eng</td>
                        <td className="text-left pl-8 pr-4"><span className="font-medium">Location :</span></td>
                        <td className="text-left">Karachi Pakistan</td>
                      </tr>
                      <tr>
                        <td className="text-left pr-4"><span className="font-medium">Department :</span></td>
                        <td className="text-left">Software</td>
                        <td className="text-left pl-8 pr-4"><span className="font-medium">Currency :</span></td>
                        <td className="text-left">Pak-Rupees</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Salary Details */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Salary Section */}
              <div>
                <table className="w-full payslip-table">
                  <thead>
                    <tr>
                      <th className="payslip-section text-left">Salary</th>
                      <th className="payslip-section text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Basic Salary</td>
                      <td className="text-right">{payslipData.basicSalary.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Other Allowance</td>
                      <td className="text-right">{payslipData.otherAllowance.toFixed(2)}</td>
                    </tr>
                    <tr className="font-semibold">
                      <td>Gross Salary : </td>
                      <td className="text-right">{grossSalary.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Deductions Section */}
              <div>
                <table className="w-full payslip-table">
                  <thead>
                    <tr>
                      <th className="payslip-section text-left">Deduction</th>
                      <th className="payslip-section text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lunch Bill</td>
                      <td className="text-right">{payslipData.lunchBill.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>EOBI</td>
                      <td className="text-right">{payslipData.eobi.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Provident Fund</td>
                      <td className="text-right">{payslipData.providentFund.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Mobile Deduction</td>
                      <td className="text-right">{payslipData.mobilDeduction.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Income Tax Deduction</td>
                      <td className="text-right">{payslipData.incomeTax.toFixed(2)}</td>
                    </tr>
                    <tr className="font-semibold">
                      <td>Total Deduction : </td>
                      <td className="text-right">{totalDeductions.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Net Payable */}
            <div className="border border-black">
              <div className="bg-gray-200 p-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Net PAYABLE AMOUNT :</span>
                  <span className="font-bold text-lg">{netPayable.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-6">
              <div className="bg-gray-200 p-2 text-center font-semibold border border-black">
                DETAILS
              </div>
              
              <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                {/* Mobile Details */}
                <div>
                  <div className="bg-blue-100 p-1 text-center font-semibold">Mobile Details</div>
                  <table className="w-full payslip-table">
                    <tr><td>Balance Allocated</td><td className="text-right">2500.00</td></tr>
                    <tr><td>Balance Used</td><td className="text-right">{(2500 + payslipData.mobilDeduction).toFixed(2)}</td></tr>
                  </table>
                </div>

               

                {/* Provident Fund */}
                <div>
                  <div className="bg-blue-100 p-1 text-center font-semibold">Provident Fund Details</div>
                  <table className="w-full payslip-table">
                    <tr><td>This Month (Year {selectedYear})</td><td className="text-right">{(payslipData.providentFund + payslipData.providentFund).toFixed(2)}</td></tr>
                    <tr><td>Your Contribution</td><td className="text-right">{payslipData.providentFund.toFixed(2)}</td></tr>
                    <tr><td>Axact's Contribution</td><td className="text-right">{payslipData.providentFund.toFixed(2)}</td></tr>
                  </table>
                </div>

                {/* Facilities */}
                <div>
                  <div className="bg-blue-100 p-1 text-center font-semibold">Monthly Facilities Details</div>
                  <table className="w-full payslip-table">
                    <tr><td>Facility</td><td className="text-right">Availed</td></tr>                    
                    <tr><td>Salon</td><td className="text-right">5</td></tr>
                    
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipGenerator;