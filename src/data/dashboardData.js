/**
 * Comprehensive dashboard data for MetaRealFi platform
 */

export const portfolioData = {
  summary: {
    totalValue: 8245780.35,
    totalProperties: 7,
    monthlyIncome: 62458.80,
    roi: 14.2,
    changePercentage: 5.3,
    lastUpdated: "2023-06-15T10:30:00Z",
    totalTokensOwned: 3100,
    totalInvested: 6850000,
    annualIncome: 749505.60,
    projectedGrowth: 18.5,
    diversificationScore: 8.7,
    riskScore: 3.2
  },
  properties: [
    {
      id: 1,
      name: "Skyline Tower #1205",
      location: "New York, NY",
      type: "Residential",
      category: "Luxury",
      purchaseDate: "2022-03-15",
      purchasePrice: 750000,
      currentValue: 892500,
      monthlyIncome: 5800,
      roi: 12.8,
      appreciation: 19.0,
      occupancyRate: 98,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      status: "Owned",
      tokenized: true,
      totalTokens: 1000,
      yourTokens: 750,
      tokenPrice: 892.50,
      valueHistory: [
        { date: "2022-03-15", value: 750000 },
        { date: "2022-09-15", value: 795000 },
        { date: "2023-03-15", value: 845000 },
        { date: "2023-09-15", value: 892500 }
      ],
      forecast: {
        oneYear: { value: 950000, roi: 13.5 },
        threeYear: { value: 1050000, roi: 14.2 },
        fiveYear: { value: 1150000, roi: 14.8 }
      }
    },
    {
      id: 2,
      name: "Tech Hub Office #42",
      location: "San Francisco, CA",
      type: "Commercial",
      category: "Office",
      purchaseDate: "2022-05-22",
      purchasePrice: 1250000,
      currentValue: 1437500,
      monthlyIncome: 10500,
      roi: 10.1,
      appreciation: 15.0,
      occupancyRate: 100,
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      status: "Owned",
      tokenized: true,
      totalTokens: 1000,
      yourTokens: 500,
      tokenPrice: 1437.50,
      valueHistory: [
        { date: "2022-05-22", value: 1250000 },
        { date: "2022-11-22", value: 1325000 },
        { date: "2023-05-22", value: 1400000 },
        { date: "2023-11-22", value: 1437500 }
      ],
      forecast: {
        oneYear: { value: 1550000, roi: 10.8 },
        threeYear: { value: 1750000, roi: 11.5 },
        fiveYear: { value: 1950000, roi: 12.2 }
      }
    },
    {
      id: 3,
      name: "Beachfront Villa #8",
      location: "Malibu, CA",
      type: "Residential",
      category: "Luxury",
      purchaseDate: "2021-11-08",
      purchasePrice: 3200000,
      currentValue: 3840000,
      monthlyIncome: 25000,
      roi: 9.4,
      appreciation: 20.0,
      occupancyRate: 92,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      status: "Owned",
      tokenized: true,
      totalTokens: 2000,
      yourTokens: 400,
      tokenPrice: 1920.00,
      valueHistory: [
        { date: "2021-11-08", value: 3200000 },
        { date: "2022-05-08", value: 3400000 },
        { date: "2022-11-08", value: 3600000 },
        { date: "2023-05-08", value: 3750000 },
        { date: "2023-11-08", value: 3840000 }
      ],
      forecast: {
        oneYear: { value: 4100000, roi: 9.8 },
        threeYear: { value: 4600000, roi: 10.5 },
        fiveYear: { value: 5200000, roi: 11.2 }
      }
    },
    {
      id: 4,
      name: "Downtown Loft #305",
      location: "Portland, OR",
      type: "Residential",
      category: "Urban",
      purchaseDate: "2022-01-30",
      purchasePrice: 420000,
      currentValue: 478800,
      monthlyIncome: 3200,
      roi: 9.1,
      appreciation: 14.0,
      occupancyRate: 96,
      image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      status: "Owned",
      tokenized: true,
      totalTokens: 1000,
      yourTokens: 600,
      tokenPrice: 478.80,
      valueHistory: [
        { date: "2022-01-30", value: 420000 },
        { date: "2022-07-30", value: 445000 },
        { date: "2023-01-30", value: 465000 },
        { date: "2023-07-30", value: 478800 }
      ],
      forecast: {
        oneYear: { value: 510000, roi: 9.5 },
        threeYear: { value: 570000, roi: 10.2 },
        fiveYear: { value: 640000, roi: 10.8 }
      }
    },
    {
      id: 5,
      name: "Retail Plaza #12",
      location: "Dallas, TX",
      type: "Commercial",
      category: "Retail",
      purchaseDate: "2022-07-12",
      purchasePrice: 980000,
      currentValue: 1078000,
      monthlyIncome: 8200,
      roi: 10.0,
      appreciation: 10.0,
      occupancyRate: 100,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      status: "Owned",
      tokenized: true,
      totalTokens: 1000,
      yourTokens: 300,
      tokenPrice: 1078.00,
      valueHistory: [
        { date: "2022-07-12", value: 980000 },
        { date: "2023-01-12", value: 1030000 },
        { date: "2023-07-12", value: 1078000 }
      ],
      forecast: {
        oneYear: { value: 1150000, roi: 10.4 },
        threeYear: { value: 1300000, roi: 11.0 },
        fiveYear: { value: 1450000, roi: 11.5 }
      }
    },
    {
      id: 6,
      name: "Suburban Home #27",
      location: "Charlotte, NC",
      type: "Residential",
      category: "Family",
      purchaseDate: "2022-09-05",
      purchasePrice: 350000,
      currentValue: 385000,
      monthlyIncome: 2600,
      roi: 8.9,
      appreciation: 10.0,
      occupancyRate: 100,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      status: "Owned",
      tokenized: true,
      totalTokens: 1000,
      yourTokens: 350,
      tokenPrice: 385.00,
      valueHistory: [
        { date: "2022-09-05", value: 350000 },
        { date: "2023-03-05", value: 370000 },
        { date: "2023-09-05", value: 385000 }
      ],
      forecast: {
        oneYear: { value: 410000, roi: 9.2 },
        threeYear: { value: 460000, roi: 9.8 },
        fiveYear: { value: 520000, roi: 10.5 }
      }
    },
    {
      id: 7,
      name: "Industrial Warehouse #3",
      location: "Phoenix, AZ",
      type: "Industrial",
      category: "Warehouse",
      purchaseDate: "2022-02-18",
      purchasePrice: 780000,
      currentValue: 850000,
      monthlyIncome: 6200,
      roi: 9.5,
      appreciation: 9.0,
      occupancyRate: 100,
      image: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      status: "Owned",
      tokenized: true,
      totalTokens: 2000,
      yourTokens: 200,
      tokenPrice: 425.00,
      valueHistory: [
        { date: "2022-02-18", value: 780000 },
        { date: "2022-08-18", value: 810000 },
        { date: "2023-02-18", value: 835000 },
        { date: "2023-08-18", value: 850000 }
      ],
      forecast: {
        oneYear: { value: 890000, roi: 9.8 },
        threeYear: { value: 980000, roi: 10.5 },
        fiveYear: { value: 1080000, roi: 11.2 }
      }
    }
  ]
};

export const marketplaceData = {
  featured: [
    {
      id: 101,
      name: "Skyline Tower #1205",
      location: "New York, NY",
      type: "Residential",
      category: "Luxury",
      price: 892500,
      tokenPrice: 892.50,
      availableTokens: 250,
      totalTokens: 1000,
      monthlyIncome: 5800,
      projectedRoi: 12.8,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description: "Luxury high-rise apartment with stunning city views",
      amenities: ["Doorman", "Gym", "Pool", "Rooftop Terrace"],
      tokenized: true,
      trending: true,
      yourTokens: 750
    },
    {
      id: 102,
      name: "Tech Hub Office #42",
      location: "San Francisco, CA",
      type: "Commercial",
      category: "Office",
      price: 1437500,
      tokenPrice: 1437.50,
      availableTokens: 500,
      totalTokens: 1000,
      monthlyIncome: 10500,
      projectedRoi: 10.1,
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      description: "Modern office space in the heart of the tech district",
      amenities: ["24/7 Access", "Conference Rooms", "Kitchen", "Parking"],
      tokenized: true,
      trending: true,
      yourTokens: 500
    },
    {
      id: 103,
      name: "Beachfront Villa #8",
      location: "Malibu, CA",
      type: "Residential",
      category: "Luxury",
      price: 3840000,
      tokenPrice: 1920.00,
      availableTokens: 1600,
      totalTokens: 2000,
      monthlyIncome: 25000,
      projectedRoi: 9.4,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description: "Stunning beachfront property with direct ocean access",
      amenities: ["Private Beach", "Pool", "Home Theater", "Guest House"],
      tokenized: true,
      trending: false,
      yourTokens: 400
    }
  ],
  newListings: [
    {
      id: 104,
      name: "Mountain Retreat #12",
      location: "Denver, CO",
      type: "Residential",
      category: "Vacation",
      price: 1250000,
      tokenPrice: 1250.00,
      availableTokens: 1000,
      totalTokens: 1000,
      monthlyIncome: 9500,
      projectedRoi: 11.4,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80",
      description: "Luxurious mountain retreat with panoramic views",
      amenities: ["Hot Tub", "Fireplace", "Ski Storage", "Game Room"],
      tokenized: true,
      trending: true,
      yourTokens: 0
    },
    {
      id: 105,
      name: "Medical Office #9",
      location: "Boston, MA",
      type: "Commercial",
      category: "Medical",
      price: 1850000,
      tokenPrice: 1850.00,
      availableTokens: 1000,
      totalTokens: 1000,
      monthlyIncome: 15200,
      projectedRoi: 9.8,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      description: "Purpose-built medical office in healthcare district",
      amenities: ["ADA Compliant", "Waiting Room", "Private Offices"],
      tokenized: true,
      trending: false,
      yourTokens: 0
    }
  ],
  recommended: [
    {
      id: 106,
      name: "Vacation Rental #15",
      location: "Orlando, FL",
      type: "Residential",
      category: "Vacation",
      price: 580000,
      tokenPrice: 580.00,
      availableTokens: 1000,
      totalTokens: 1000,
      monthlyIncome: 4800,
      projectedRoi: 9.9,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      description: "Turnkey vacation rental near major attractions",
      amenities: ["Pool", "Game Room", "Multiple Bedrooms"],
      tokenized: true,
      trending: true,
      yourTokens: 0,
      aiRecommendation: {
        score: 9.2,
        reason: "High demand location with strong rental history and growth potential"
      }
    },
    {
      id: 107,
      name: "Downtown Office #7",
      location: "Chicago, IL",
      type: "Commercial",
      category: "Office",
      price: 2250000,
      tokenPrice: 2250.00,
      availableTokens: 1000,
      totalTokens: 1000,
      monthlyIncome: 18500,
      projectedRoi: 9.8,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      description: "Prime office space in downtown business district",
      amenities: ["24/7 Security", "Conference Center", "Fitness Center"],
      tokenized: true,
      trending: false,
      yourTokens: 0,
      aiRecommendation: {
        score: 8.7,
        reason: "Stable tenant with long-term lease and strong appreciation potential"
      }
    }
  ]
};

export const transactionsData = {
  recent: [
    {
      id: 1001,
      type: "purchase",
      property: "Skyline Tower #1205",
      propertyId: 1,
      amount: 89250.00,
      tokens: 100,
      date: "2023-06-12T14:30:00Z",
      status: "completed",
      fee: 892.50
    },
    {
      id: 1002,
      type: "dividend",
      property: "Tech Hub Office #42",
      propertyId: 2,
      amount: 5250.00,
      date: "2023-06-10T09:15:00Z",
      status: "completed",
      fee: 0
    },
    {
      id: 1003,
      type: "sale",
      property: "Beachfront Villa #8",
      propertyId: 3,
      amount: 38400.00,
      tokens: 20,
      date: "2023-06-08T16:45:00Z",
      status: "completed",
      fee: 384.00
    },
    {
      id: 1004,
      type: "dividend",
      property: "Downtown Loft #305",
      propertyId: 4,
      amount: 1920.00,
      date: "2023-06-05T11:30:00Z",
      status: "completed",
      fee: 0
    },
    {
      id: 1005,
      type: "purchase",
      property: "Retail Plaza #12",
      propertyId: 5,
      amount: 21560.00,
      tokens: 20,
      date: "2023-06-01T10:15:00Z",
      status: "completed",
      fee: 215.60
    }
  ],
  history: [
    {
      id: 1006,
      type: "dividend",
      property: "Suburban Home #27",
      propertyId: 6,
      amount: 910.00,
      date: "2023-05-28T13:45:00Z",
      status: "completed",
      fee: 0
    },
    {
      id: 1007,
      type: "purchase",
      property: "Industrial Warehouse #3",
      propertyId: 7,
      amount: 42500.00,
      tokens: 100,
      date: "2023-05-22T15:30:00Z",
      status: "completed",
      fee: 425.00
    },
    {
      id: 1008,
      type: "sale",
      property: "Tech Hub Office #42",
      propertyId: 2,
      amount: 71875.00,
      tokens: 50,
      date: "2023-05-15T09:20:00Z",
      status: "completed",
      fee: 718.75
    },
    {
      id: 1009,
      type: "dividend",
      property: "Skyline Tower #1205",
      propertyId: 1,
      amount: 4350.00,
      date: "2023-05-10T14:15:00Z",
      status: "completed",
      fee: 0
    },
    {
      id: 1010,
      type: "purchase",
      property: "Downtown Loft #305",
      propertyId: 4,
      amount: 47880.00,
      tokens: 100,
      date: "2023-05-05T11:45:00Z",
      status: "completed",
      fee: 478.80
    }
  ],
  summary: {
    totalTransactions: 125,
    totalPurchased: 1850000,
    totalSold: 350000,
    totalDividends: 185000,
    totalFees: 21500,
    averageROI: 11.8,
    bestPerforming: {
      property: "Skyline Tower #1205",
      propertyId: 1,
      roi: 12.8
    },
    worstPerforming: {
      property: "Suburban Home #27",
      propertyId: 6,
      roi: 8.9
    }
  }
};

export const analyticsData = {
  portfolioGrowth: [
    { month: "Jan", value: 6850000 },
    { month: "Feb", value: 7050000 },
    { month: "Mar", value: 7250000 },
    { month: "Apr", value: 7550000 },
    { month: "May", value: 7850000 },
    { month: "Jun", value: 8245780 }
  ],
  incomeByProperty: [
    { name: "Skyline Tower #1205", value: 5800, percentage: 9.3 },
    { name: "Tech Hub Office #42", value: 10500, percentage: 16.8 },
    { name: "Beachfront Villa #8", value: 25000, percentage: 40.0 },
    { name: "Downtown Loft #305", value: 3200, percentage: 5.1 },
    { name: "Retail Plaza #12", value: 8200, percentage: 13.1 },
    { name: "Suburban Home #27", value: 2600, percentage: 4.2 },
    { name: "Industrial Warehouse #3", value: 6200, percentage: 9.9 }
  ],
  propertyTypeDistribution: [
    { name: "Residential", value: 4, percentage: 57.1 },
    { name: "Commercial", value: 2, percentage: 28.6 },
    { name: "Industrial", value: 1, percentage: 14.3 }
  ],
  roiComparison: {
    portfolio: 14.2,
    realEstateFunds: 8.7,
    stockMarket: 10.1,
    bonds: 4.2,
    savings: 2.5
  },
  monthlyIncome: [
    { month: "Jan", value: 58000 },
    { month: "Feb", value: 59500 },
    { month: "Mar", value: 60200 },
    { month: "Apr", value: 61000 },
    { month: "May", value: 61800 },
    { month: "Jun", value: 62458 }
  ],
  occupancyRates: [
    { month: "Jan", value: 94 },
    { month: "Feb", value: 95 },
    { month: "Mar", value: 96 },
    { month: "Apr", value: 97 },
    { month: "May", value: 97 },
    { month: "Jun", value: 98 }
  ],
  marketTrends: {
    residentialGrowth: 8.5,
    commercialGrowth: 6.2,
    industrialGrowth: 7.8,
    vacancyRates: 3.2,
    interestRates: 4.5,
    constructionCosts: 5.8
  },
  aiPredictions: {
    marketOutlook: "Positive",
    confidenceScore: 87,
    growthHotspots: [
      { location: "Austin, TX", growth: 12.5, confidence: 92 },
      { location: "Nashville, TN", growth: 11.8, confidence: 89 },
      { location: "Raleigh, NC", growth: 10.5, confidence: 85 }
    ],
    riskFactors: [
      { factor: "Interest Rate Increases", impact: "Medium", probability: 65 },
      { factor: "Regulatory Changes", impact: "Low", probability: 30 },
      { factor: "Market Correction", impact: "High", probability: 15 }
    ]
  }
};

export const userSettings = {
  profile: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    joinDate: "2022-11-15T00:00:00Z",
    investorLevel: "Platinum",
    twoFactorEnabled: true,
    verificationStatus: "Verified",
    referralCode: "JOHND2023",
    referralCount: 8,
    referralBonus: 2500
  },
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false,
      dividendAlerts: true,
      marketUpdates: true,
      newListings: true,
      priceAlerts: true
    },
    investmentPreferences: {
      propertyTypes: ["Residential", "Commercial"],
      minROI: 8.5,
      maxInvestment: 100000,
      autoReinvest: true,
      riskTolerance: "Moderate",
      investmentHorizon: "Long-term",
      preferredLocations: ["New York", "California", "Texas", "Florida"]
    },
    displayPreferences: {
      currency: "USD",
      theme: "dark",
      language: "en-US",
      dateFormat: "MM/DD/YYYY",
      defaultDashboard: "overview"
    }
  },
  paymentMethods: [
    {
      id: 1,
      type: "credit_card",
      name: "Visa ending in 4242",
      expiryDate: "05/25",
      isDefault: true
    },
    {
      id: 2,
      type: "bank_account",
      name: "Chase Checking ****6789",
      isDefault: false
    }
  ],
  wallets: [
    {
      id: 1,
      type: "ethereum",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      balance: 2.45,
      isDefault: true
    },
    {
      id: 2,
      type: "bitcoin",
      address: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
      balance: 0.12,
      isDefault: false
    }
  ],
  documents: {
    verified: [
      { type: "ID", status: "Verified", date: "2022-11-20T00:00:00Z" },
      { type: "Address Proof", status: "Verified", date: "2022-11-22T00:00:00Z" }
    ],
    taxDocuments: [
      { year: 2022, status: "Available", downloadUrl: "/documents/tax/2022" }
    ]
  }
};