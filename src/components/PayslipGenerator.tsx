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
  fuelAllowance: number;
  compensatoryLeave: number;
  bonus: number;
  lunchBill: number;
  eobi: number;
  providentFund: number;
  mobilDeduction: number;
  incomeTax: number;
}

const PayslipGenerator = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Jun');
  const [selectedYear, setSelectedYear] = useState<number>(2013);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const generateRandomDeduction = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generatePayslipData = (month: string, year: number): PayslipData => {
    const basicSalary = 50000;
    const otherAllowance = Math.floor(basicSalary * 0.1); // 10% of basic
    const fuelAllowance = generateRandomDeduction(12000, 15000);
    const compensatoryLeave = generateRandomDeduction(13000, 14000);
    const bonus = generateRandomDeduction(6000, 7000);

    // Fixed tax deductions
    const incomeTax = 12605; // Fixed as per requirement
    
    // Random other deductions
    const lunchBill = generateRandomDeduction(2200, 2800);
    const eobi = generateRandomDeduction(120, 140);
    const providentFund = generateRandomDeduction(7000, 7500);
    const mobilDeduction = generateRandomDeduction(1500, 1700);

    return {
      month,
      year,
      basicSalary,
      otherAllowance,
      fuelAllowance,
      compensatoryLeave,
      bonus,
      lunchBill,
      eobi,
      providentFund,
      mobilDeduction,
      incomeTax
    };
  };

  const payslipData = generatePayslipData(selectedMonth, selectedYear);

  const grossSalary = payslipData.basicSalary + payslipData.otherAllowance;
  const totalAdditions = payslipData.fuelAllowance + payslipData.compensatoryLeave + payslipData.bonus;
  const totalDeductions = payslipData.lunchBill + payslipData.eobi + payslipData.providentFund + payslipData.mobilDeduction + payslipData.incomeTax;
  const netPayable = grossSalary + totalAdditions - totalDeductions;

  const handlePrint = () => {
    window.print();
  };

  const getAvailableMonthsYears = () => {
    const result = [];
    
    // June 2013 to December 2013
    for (let i = 5; i < 12; i++) { // June is index 5
      result.push({ month: months[i], year: 2013 });
    }
    
    // January 2014 to July 2014
    for (let i = 0; i < 7; i++) { // July is index 6
      result.push({ month: months[i], year: 2014 });
    }
    
    return result;
  };

  const availableOptions = getAvailableMonthsYears();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <Card className="mb-6 no-print">
          <CardHeader>
            <CardTitle className="text-corporate-dark">Payslip Generator</CardTitle>
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

        {/* Payslip */}
        <Card className="payslip-container bg-white shadow-lg">
          <CardContent className="p-8">
            {/* Header */}
            <div className="border border-gray-400 mb-6">
              {/* Top section with logo and employee info */}
              <div className="p-4 flex justify-between items-start">
                <div>
                  <div className="text-4xl font-bold text-gray-600 mb-1">
                    a<span className="text-orange-500">X</span>act
                  </div>
                  <div className="text-sm text-gray-600 font-medium">World's Leading IT Company</div>
                </div>
                
                <div className="text-right">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                    <div className="text-left">
                      <div><span className="font-medium">Axactian Name :</span></div>
                      <div><span className="font-medium">Designation :</span></div>
                      <div><span className="font-medium">Department :</span></div>
                    </div>
                    <div className="text-left">
                      <div>Noman Waheed</div>
                      <div>Senior Software Architect</div>
                      <div>Software</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm mt-3">
                    <div className="text-left">
                      <div><span className="font-medium">Period :</span></div>
                      <div><span className="font-medium">Location :</span></div>
                      <div><span className="font-medium">Currency :</span></div>
                    </div>
                    <div className="text-left">
                      <div>{selectedMonth} {selectedYear}</div>
                      <div>Karachi Pakistan</div>
                      <div>Pak-Rupees</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PAYSLIP header bar */}
              <div className="bg-orange-500 text-white p-2 text-center border-t border-gray-400">
                <h1 className="text-xl font-bold tracking-wider">PAYSLIP</h1>
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
                      <td>Gross Salary : {grossSalary.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <table className="w-full payslip-table mt-4">
                  <thead>
                    <tr>
                      <th className="payslip-section text-left">Addition</th>
                      <th className="payslip-section text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Fuel Allowance</td>
                      <td className="text-right">{payslipData.fuelAllowance.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Compensatory Leave Allowance 1 Day(s)</td>
                      <td className="text-right">{payslipData.compensatoryLeave.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Bonus</td>
                      <td className="text-right">{payslipData.bonus.toFixed(2)}</td>
                    </tr>
                    <tr className="font-semibold">
                      <td>Total Additions: {totalAdditions.toFixed(2)}</td>
                      <td></td>
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
                      <td>Total Deduction : {totalDeductions.toFixed(2)}</td>
                      <td></td>
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
              
              <div className="grid grid-cols-4 gap-4 mt-4 text-xs">
                {/* Mobile Details */}
                <div>
                  <div className="bg-blue-100 p-1 text-center font-semibold">Mobile Details</div>
                  <table className="w-full payslip-table">
                    <tr><td>Balance Allocated</td><td className="text-right">2500.00</td></tr>
                    <tr><td>Balance Used</td><td className="text-right">{(2500 - payslipData.mobilDeduction).toFixed(2)}</td></tr>
                  </table>
                </div>

                {/* Leave Details */}
                <div>
                  <div className="bg-blue-100 p-1 text-center font-semibold">Annual Leave Details</div>
                  <table className="w-full payslip-table">
                    <tr><td>Allocated Leaves</td><td className="text-right">34.00</td></tr>
                    <tr><td>Leaves Allocated</td><td className="text-right">2.50</td></tr>
                    <tr><td>Total</td><td className="text-right">31.5</td></tr>
                  </table>
                </div>

                {/* Provident Fund */}
                <div>
                  <div className="bg-blue-100 p-1 text-center font-semibold">Provident Fund Details</div>
                  <table className="w-full payslip-table">
                    <tr><td>This Month (Year 2018)</td><td className="text-right">{payslipData.providentFund.toFixed(2)}</td></tr>
                    <tr><td>Your Contribution</td><td className="text-right">{payslipData.providentFund.toFixed(2)}</td></tr>
                    <tr><td>Axact's Contribution</td><td className="text-right">{payslipData.providentFund.toFixed(2)}</td></tr>
                  </table>
                </div>

                {/* Facilities */}
                <div>
                  <div className="bg-blue-100 p-1 text-center font-semibold">Monthly Facilities Details</div>
                  <table className="w-full payslip-table">
                    <tr><td>Facility</td><td className="text-right">Availed (# of Times)</td></tr>
                    <tr><td>Gym</td><td className="text-right">00.00</td></tr>
                    <tr><td>Library</td><td className="text-right">00.00</td></tr>
                    <tr><td>Salon</td><td className="text-right">5</td></tr>
                    <tr><td>Indoor Games</td><td className="text-right">0</td></tr>
                    <tr><td>Movie Theater</td><td className="text-right">00.00</td></tr>
                    <tr><td>Hut</td><td className="text-right">00.00</td></tr>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayslipGenerator;