export const numberFormat = (x, currency, isDecimal = true) => {
  if (isNaN(x) || x === null) return x;
  let amount;

  if (Math.abs(x) < 9999) {
    amount = x.toFixed(isDecimal ? 2 : 0);
  } else if (Math.abs(x) < 1000000) {
    amount = (x / 1000).toFixed(isDecimal ? 2 : 0) + 'K';
  } else if (Math.abs(x) < 10000000) {
    amount = (x / 1000000).toFixed(isDecimal ? 2 : 0) + 'M';
  } else if (Math.abs(x) < 1000000000) {
    amount = (x / 1000000).toFixed(isDecimal ? 2 : 0) + 'M';
  } else if (Math.abs(x) < 1000000000000) {
    amount = (x / 1000000000).toFixed(isDecimal ? 2 : 0) + 'B';
  } else if (Math.abs(x) < 1000000000000000) {
    amount = (x / 1000000000000).toFixed(isDecimal ? 2 : 0) + 'T';
  } else {
    amount = x.toLocaleString('en');
  }

  return amount;
};

export const formatMap = {
  INR: 'en',
  HKD: 'zh-Hans-HK',
  SGD: 'zh-Hans-SG',
  AED: 'en-AR',
  USD: 'en',
};

export const formatCurrency = (
  value,
  currency = 'USD',
  noCurrency,
  decimalPlace
) => {
  if (typeof value === 'undefined' || value === null || value === 0) {
    return null;
  }
  const isWholeNumber = value % 1 === 0;
  return (
    <span className="currency-block">
      <span className="currency">{!noCurrency ? `${currency} ` : ''}</span>
      <label className="currency-value">{`${parseFloat(
        parseFloat(value).toFixed(decimalPlace ? decimalPlace : 2)
      ).toLocaleString(formatMap[currency])}${
        isWholeNumber ? '.00' : ''
      }`}</label>
    </span>
  );
};

export const defaultAnswerObj = {
  currentAge: 42,
  retirementAge: 60,
  currentInv: 500000,
  netSavings: 100000,
  rent: 36000,
  yearsToHousePurchase: 5,
  downPayment: 100000,
  loanTenure: 10,
  emi: 30000,
  perIncInSavings: 5,
  child1Age: 0,
  child2Age: 0,
  child3Age: 0,
  univCost: 100000,
  retirementExp: 100000,
  inflationRate: 4,
  deathLegacy: 1000000,
  numberOfChildren: 0,
};

const getMarks = (min = 0, max = 0, noOfMarks = 0) => {
  const diff = max - min;
  let marksObj = {};
  const markdDif = diff / noOfMarks;
  for (let i = 1; i <= noOfMarks; i++) {
    marksObj = {
      ...marksObj,
      [min + i * markdDif]: {
        label: "'",
        style: {
          marginTop: '-8px',
          color: '#cccccc',
        },
      },
    };
  }
  return marksObj;
};

const getValueMark = (value) => {
  return {
    label: (
      <>
        <span style={{ display: 'block', marginTop: '-8px', color: '#cccccc' }}>
          '
        </span>
        <span style={{ display: 'block', marginTop: '-10px' }}>{value}</span>
      </>
    ),
  };
};

export const questionsContainers = [
  {
    title: 'General Inquiries',
    questions: [
      {
        question: 'Present Age (in years)',
        type: 'number',
        key: 'currentAge',
        toolTipData: 'Your age in years as of today.',
        max: 90,
      },
      {
        question: 'Desired Retirement Age',
        type: 'number',
        key: 'retirementAge',
        toolTipData:
          'Age at which you plan to retire. If you have already retired, provide your current age.',
      },
      {
        question: 'Current Financial Investments',
        type: 'slider',
        key: 'currentInv',
        addonBefore: true,
        min: 0,
        max: 20000000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 25, 10),
          25: getValueMark('5M'),
          ...getMarks(25, 50, 10),
          50: getValueMark('10M'),
          ...getMarks(50, 75, 10),
          75: getValueMark('15M'),
          ...getMarks(75, 100, 10),
          100: getValueMark('20M'),
        },
        toolTipData:
          'Include all your investments and subtract any outstanding loans. Do not include your personal residence or mortgage debt.',
      },
      {
        question: 'Annual Net Savings',
        type: 'slider',
        key: 'netSavings',
        addonBefore: true,
        min: 0,
        max: 1000000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 25, 5),
          25: getValueMark('250K'),
          ...getMarks(25, 50, 5),
          50: getValueMark('500K'),
          ...getMarks(50, 75, 5),
          75: getValueMark('750K'),
          ...getMarks(75, 100, 5),
          100: getValueMark('1M'),
        },
        toolTipData:
          'Net savings per year in today’s value, excluding rent or mortgage payments for your home.',
      },
      {
        question: 'Yearly Increase in Net Savings',
        type: 'slider',
        key: 'perIncInSavings',
        addonBefore: null,
        min: 0,
        max: 25,
        postfix: '%',
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 20, 5),
          20: getValueMark('5%'),
          ...getMarks(20, 40, 5),
          40: getValueMark('10%'),
          ...getMarks(40, 60, 5),
          60: getValueMark('15%'),
          ...getMarks(60, 80, 5),
          80: getValueMark('20%'),
          ...getMarks(80, 100, 5),
          100: getValueMark('25%'),
        },
        toolTipData: 'Percentage increase in annual net savings.',
      },
      {
        question: 'Estimated Retirement Expenses',
        type: 'slider',
        key: 'retirementExp',
        addonBefore: true,
        min: 0,
        max: 1000000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 25, 5),
          25: getValueMark('250K'),
          ...getMarks(25, 50, 5),
          50: getValueMark('500K'),
          ...getMarks(50, 75, 5),
          75: getValueMark('750K'),
          ...getMarks(75, 100, 5),
          100: getValueMark('1M'),
        },
        toolTipData:
          'Estimated annual retirement expenses, in today’s dollars.',
      },
      {
        question: 'Projected Inflation Rate',
        type: 'slider',
        key: 'inflationRate',
        addonBefore: null,
        min: 0,
        max: 15,
        postfix: '%',
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 33.33, 5),
          33.33: getValueMark('5%'),
          ...getMarks(33.33, 66.66, 5),
          66.66: getValueMark('10%'),
          ...getMarks(66.66, 100, 5),
          100: getValueMark('15%'),
        },
        toolTipData:
          'Expected inflation rate over time. Historically, inflation has been around 2% annually in the US.',
      },
      {
        question: 'Inheritance After Passing',
        type: 'slider',
        key: 'deathLegacy',
        addonBefore: true,
        min: 0,
        max: 20000000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 50, 10),
          50: getValueMark('10M'),
          ...getMarks(50, 100, 10),
          100: getValueMark('20M'),
        },
        toolTipData:
          'The wealth you plan to leave behind after your passing, for your family, friends, and causes that matter to you.',
      },
    ],
  },
  {
    title: 'Rental Expenses for Home',
    questions: [
      {
        question: 'Annual Rent',
        type: 'slider',
        key: 'rent',
        addonBefore: true,
        min: 0,
        max: 200000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 25, 5),
          25: getValueMark('50K'),
          ...getMarks(25, 50, 5),
          50: getValueMark('100K'),
          ...getMarks(50, 75, 5),
          75: getValueMark('150K'),
          ...getMarks(75, 100, 5),
          100: getValueMark('200K'),
        },
        toolTipData:
          "Provide the annual rent if you don't own a residence. Enter '0' if you own your property.",
      },
    ],
  },
  {
    title: 'Home Loan (EMI) Expenses',
    questions: [
      {
        question: 'Years Until Home Purchase',
        type: 'number',
        key: 'yearsToHousePurchase',
        toolTipData:
          "How many years from now you plan to buy a home. If already purchased, input '0'.",
      },
      {
        question: 'Loan Term (in Years)',
        type: 'slider',
        key: 'loanTenure',
        addonBefore: null,
        min: 0,
        max: 45,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 34, 5),
          33: <span style={{ marginLeft: '5px' }}>15</span>,
          ...getMarks(34, 67, 5),
          67: <span style={{ marginLeft: '5px' }}>30</span>,
          ...getMarks(67, 100, 5),
          100: getValueMark('45'),
        },
        toolTipData: 'Loan tenure in years for your home loan.',
      },
      {
        question: 'Down Payment Estimate',
        type: 'slider',
        key: 'downPayment',
        addonBefore: true,
        min: 0,
        max: 2000000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 25, 10),
          25: getValueMark('500K'),
          ...getMarks(25, 50, 10),
          50: getValueMark('1M'),
          ...getMarks(50, 75, 10),
          75: getValueMark('1.5M'),
          ...getMarks(75, 100, 10),
          100: getValueMark('2M'),
        },
        toolTipData: 'The down payment you plan to make on your home purchase.',
      },
      {
        question: 'Annual EMI Payments',
        type: 'slider',
        addonBefore: true,
        key: 'emi',
        min: 0,
        max: 200000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 25, 5),
          25: getValueMark('50K'),
          ...getMarks(25, 50, 5),
          50: getValueMark('100K'),
          ...getMarks(50, 75, 5),
          75: getValueMark('150K'),
          ...getMarks(75, 100, 5),
          100: getValueMark('200K'),
        },
        toolTipData:
          'Annual EMI if the house is already owned or expected if you plan to buy one.',
      },
    ],
  },
  {
    title: 'Children’s Education Expenses',
    questions: [
      {
        question: 'Number of Children',
        type: 'number',
        key: 'numberOfChildren',
        min: 0,
        max: 3,
      },
      {
        question: 'Child 1 Education Fund',
        type: 'slider',
        key: 'childEduFund1',
        addonBefore: true,
        min: 0,
        max: 500000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 25, 10),
          25: getValueMark('100K'),
          ...getMarks(25, 50, 10),
          50: getValueMark('200K'),
          ...getMarks(50, 75, 10),
          75: getValueMark('300K'),
          ...getMarks(75, 100, 10),
          100: getValueMark('500K'),
        },
        toolTipData:
          'Education funds for your child. Enter 0 if no funds are planned.',
      },
      {
        question: 'Child 2 Education Fund',
        type: 'slider',
        key: 'childEduFund2',
        addonBefore: true,
        min: 0,
        max: 500000,
        marks: {
          0: getValueMark('0'),
          ...getMarks(0, 25, 10),
          25: getValueMark('100K'),
          ...getMarks(25, 50, 10),
          50: getValueMark('200K'),
          ...getMarks(50, 75, 10),
          75: getValueMark('300K'),
          ...getMarks(75, 100, 10),
          100: getValueMark('500K'),
        },
        toolTipData:
          'Education funds for your second child. Enter 0 if no funds are planned.',
      },
    ],
  },
];

export const formatNumberWithCommas = (number) => {
  console.log(
    'hellodkjhfjkdhs',
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const mockCalculateReturns = (answersObj) => {
  const { currentInv, netSavings, emi, inflationRate, yearsToHousePurchase } =
    answersObj;

  // Convert string numbers to actual numbers
  const inv = parseFloat(currentInv);
  const savings = parseFloat(netSavings);
  const monthlyEmi = parseFloat(emi);
  const inflation = parseFloat(inflationRate);

  // Scoring system
  let score = 0;

  // Condition 1: High EMI
  if (monthlyEmi > 150000) score += 2;
  else if (monthlyEmi > 50000) score += 1;

  // Condition 2: High current investment
  if (inv > 10000000) score += 2;
  else if (inv > 5000000) score += 1;

  // Condition 3: Good net savings
  if (savings > 1000000) score += 2;
  else if (savings > 500000) score += 1;

  // Condition 4: Upcoming house purchase
  if (yearsToHousePurchase <= 3) score += 2;
  else if (yearsToHousePurchase <= 5) score += 1;

  // Condition 5: High inflation expectations
  if (inflation > 10) score += 2;
  else if (inflation > 6) score += 1;

  // Determine rateOfReturn based on score
  let rateOfReturn = 0;
  if (score >= 8) rateOfReturn = 5.0;
  else if (score >= 6) rateOfReturn = 4.0;
  else if (score >= 4) rateOfReturn = 2.5;
  else rateOfReturn = 1.5;

  // Determine model portfolio ID
  const modelPortfolioId = rateOfReturn >= 4 ? 1 : rateOfReturn >= 2 ? 2 : 3;

  // Asset allocation based on rate
  let assetAllocation = [];
  if (rateOfReturn >= 4) {
    assetAllocation = [
      { assetClass: 'Equity', allocationPercent: 0.6 },
      { assetClass: 'Alternatives', allocationPercent: 0.2 },
      { assetClass: 'Fixed Income', allocationPercent: 0.2 },
    ];
  } else if (rateOfReturn >= 2) {
    assetAllocation = [
      { assetClass: 'Equity', allocationPercent: 0.4 },
      { assetClass: 'Alternatives', allocationPercent: 0.3 },
      { assetClass: 'Fixed Income', allocationPercent: 0.3 },
    ];
  } else {
    assetAllocation = [
      { assetClass: 'Equity', allocationPercent: 0.2 },
      { assetClass: 'Alternatives', allocationPercent: 0.3 },
      { assetClass: 'Fixed Income', allocationPercent: 0.5 },
    ];
  }

  // Kristal holdings
  const kristalHoldingsResponse = assetAllocation.map((allocation) => ({
    kristalId: Math.floor(Math.random() * 10000),
    kristalName: `${allocation.assetClass} Fund`,
    uniqueKristalId: `KRIS-${Math.floor(Math.random() * 100000000)}`,
    kristalType: 'FUND',
    kristalSubtype: 'STANDARD',
    assetClass: allocation.assetClass,
    imageUrl: `https://example.com/images/${allocation.assetClass.toLowerCase()}.jpg`,
    weightPercent: allocation.allocationPercent,
  }));

  // Final return
  return {
    rateOfReturn,
    modelPortfolio: {
      modelPortfolioId,
      name: `${rateOfReturn}% Return Based Target`,
      assetAllocation,
      kristalHoldingsResponse,
      minimumReturnPercentage: rateOfReturn,
      maximumReturnPercentage: rateOfReturn + 10,
    },
    gtcFilterRequest: null,
    showQuestions: null,
    showPopup: true,
  };
};

export const calculatingData = {
  rateOfReturn: 0,
  modelPortfolio: {
    modelPortfolioId: 67,
    name: '1.5% Return Based Target',
    assetAllocation: [
      {
        assetClass: 'Equity',
        allocationPercent: 0.1,
      },
      {
        assetClass: 'Alternatives',
        allocationPercent: 0.1,
      },
      {
        assetClass: 'Fixed Income',
        allocationPercent: 0.8,
      },
    ],
    kristalHoldingsResponse: [
      {
        kristalId: 15383,
        kristalName: 'Verition Multi-Strategy Fund (iCapital Feeder)',
        uniqueKristalId: 'KRIS-36168400',
        kristalType: 'FUND',
        kristalSubtype: 'STANDARD',
        assetClass: 'Alternatives',
        imageUrl:
          'https://kristal-prod-backend.s3.ap-southeast-1.amazonaws.com/Images/Kristals/KRIS-36168400.jpg',
        weightPercent: 0.1,
      },
      {
        kristalId: 1932,
        kristalName: 'State Street Technology ETF',
        uniqueKristalId: 'KRIS-35624000',
        kristalType: 'ETF',
        kristalSubtype: 'ETF',
        assetClass: 'Equity',
        imageUrl:
          'https://kristal-prod-backend.s3.ap-southeast-1.amazonaws.com/Images/Kristals/KRIS-35624000_1680068234632.jpg',
        weightPercent: 0.05,
      },
      {
        kristalId: 3636,
        kristalName: 'Vanguard S&P 500 ETF',
        uniqueKristalId: 'KRIS-39696000',
        kristalType: 'ETF',
        kristalSubtype: 'ETF',
        assetClass: 'Equity',
        imageUrl:
          'https://s3.ap-southeast-1.amazonaws.com/kristal-prod-backend/Images/Kristals/KRIS-39696000.jpg',
        weightPercent: 0.05,
      },
      {
        kristalId: 13474,
        kristalName: 'Blackrock 0-3 Month Treasury Bond ETF',
        uniqueKristalId: 'KRIS-37076400',
        kristalType: 'ETF',
        kristalSubtype: 'ETF',
        assetClass: 'Fixed Income',
        imageUrl:
          'https://kristal-prod-backend.s3.ap-southeast-1.amazonaws.com/Images/Kristals/KRIS-37076400_1676272928582.jpg',
        weightPercent: 0.8,
      },
    ],
    minimumReturnPercentage: 1.5,
    maximumReturnPercentage: 13.99,
  },
  gtcFilterRequest: null,
  showQuestions: null,
  showPopup: true,
};
