// Help text data for different input contexts
export interface HelpTextItem {
  field: string;
  description: string;
}

export interface HelpTextSection {
  title: string;
  description?: string;
  fields: HelpTextItem[];
}

export const helpTexts: Record<string, Record<string, HelpTextSection[]>> = {
  "retirement-accumulation": {
    personal: [
      {
        title: "Personal Information",
        description: "Basic demographic information for retirement planning analysis.",
        fields: [
          {
            field: "Client 1 Name",
            description: "The name of the primary client for this retirement analysis."
          },
          {
            field: "Client 1 Date of Birth",
            description: "Birth date used to calculate current age and years until retirement."
          },
          {
            field: "Client 1 Retirement Age",
            description: "The age at which Client 1 plans to retire. This affects the accumulation period and when retirement distributions begin."
          },
          {
            field: "Add Client 2",
            description: "Check this box if there is a spouse or partner to include in the retirement analysis."
          },
          {
            field: "Client 2 Name",
            description: "The name of the secondary client (spouse/partner)."
          },
          {
            field: "Client 2 Date of Birth", 
            description: "Birth date for the secondary client, used for age calculations and joint planning scenarios."
          },
          {
            field: "Client 2 Retirement Age",
            description: "The age at which Client 2 plans to retire. May differ from Client 1's retirement age."
          },
          {
            field: "Married",
            description: "Indicates marital status, which affects tax calculations, Social Security benefits, and survivor benefits."
          }
        ]
      }
    ],
    "income-needs": [
      {
        title: "Monthly Income Needs",
        description: "Define the monthly income required during different phases of retirement.",
        fields: [
          {
            field: "Beginning at retirement (Dollar Amount)",
            description: "The specific monthly income amount needed when retirement begins. This is the primary method for defining income needs."
          },
          {
            field: "Beginning at retirement (Percentage)",
            description: "Alternative method: specify income needs as a percentage of current total income. Common ranges are 70-90% of pre-retirement income."
          },
          {
            field: "Beginning X years after retirement - Period 1",
            description: "Income needs may change during retirement. This allows you to specify different income requirements starting at a future point in retirement."
          },
          {
            field: "Beginning X years after retirement - Period 2", 
            description: "A third phase of retirement income needs, often used to account for reduced expenses in later retirement years."
          }
        ]
      }
    ],
    "income-sources": [
      {
        title: "Employment Income",
        description: "Current employment income that will be used to fund retirement savings.",
        fields: [
          {
            field: "Client 1 Annual Employment Income",
            description: "Current gross annual income from employment, including salary, bonuses, and other compensation."
          },
          {
            field: "Client 2 Annual Employment Income",
            description: "Current gross annual income for the second client, if applicable."
          }
        ]
      },
      {
        title: "Social Security Benefits",
        description: "Expected Social Security benefits for each client.",
        fields: [
          {
            field: "Client 1 Annual Social Security",
            description: "Estimated annual Social Security benefit at full retirement age. You can obtain estimates from the Social Security Administration."
          },
          {
            field: "Client 1 SS Start Age",
            description: "Age when Client 1 will begin claiming Social Security benefits. Benefits can start as early as 62 (with reduction) or be delayed until 70 (with increases)."
          },
          {
            field: "Client 2 Annual Social Security",
            description: "Estimated annual Social Security benefit for Client 2 at full retirement age."
          },
          {
            field: "Client 2 SS Start Age",
            description: "Age when Client 2 will begin claiming Social Security benefits."
          }
        ]
      },
      {
        title: "Other Income Sources",
        description: "Additional sources of retirement income such as pensions, annuities, or rental income.",
        fields: [
          {
            field: "Name",
            description: "A descriptive name for this income source (e.g., 'Company Pension', 'Rental Property')."
          },
          {
            field: "Type",
            description: "The category of income source: Pension, Annuity, Rental Income, Business Income, or Other."
          },
          {
            field: "Owner",
            description: "Which client owns this income source: Client 1, Client 2, or Joint ownership."
          },
          {
            field: "Start Age",
            description: "The age at which this income source begins paying benefits."
          },
          {
            field: "Amount",
            description: "The annual or monthly payment amount from this source."
          },
          {
            field: "Frequency",
            description: "How often payments are received: Monthly, Quarterly, or Annually."
          },
          {
            field: "Value Type",
            description: "Whether the amount is stated in Present Value (today's dollars) or Future Value (inflated dollars)."
          },
          {
            field: "Payable For",
            description: "Duration of payments: Life (until death), a specific number of years, or until a certain age."
          },
          {
            field: "Inflation Rate",
            description: "Annual rate at which this income source increases due to cost-of-living adjustments."
          },
          {
            field: "Percent Available to Survivors",
            description: "What percentage of this income continues to the surviving spouse after the owner's death."
          }
        ]
      }
    ],
    capital: [
      {
        title: "Current Assets",
        description: "Existing retirement savings and assets that will be used for retirement.",
        fields: [
          {
            field: "Current Assets Fields",
            description: "Enter the current value of retirement accounts, investment accounts, and other assets designated for retirement."
          }
        ]
      }
    ],
    assumptions: [
      {
        title: "General Assumptions",
        description: "Economic and planning assumptions that affect the retirement analysis.",
        fields: [
          {
            field: "Return Before Retirement",
            description: "Expected annual rate of return on investments during the accumulation phase (before retirement)."
          },
          {
            field: "Return After Retirement", 
            description: "Expected annual rate of return on investments during the distribution phase (after retirement)."
          },
          {
            field: "Inflation Rate",
            description: "Expected annual inflation rate, used to calculate future purchasing power and cost increases."
          },
          {
            field: "Tax Rate on Capital Gains",
            description: "Expected tax rate on capital gains and investment income."
          }
        ]
      },
      {
        title: "Client-Specific Assumptions",
        description: "Individual assumptions for each client.",
        fields: [
          {
            field: "Client 1 Mortality Age",
            description: "Expected lifespan for Client 1. This affects how long retirement funds need to last."
          },
          {
            field: "Client 2 Mortality Age",
            description: "Expected lifespan for Client 2, if applicable."
          },
          {
            field: "Client 1 Employment Inflation Rate",
            description: "Expected annual increase in Client 1's employment income due to raises and promotions."
          },
          {
            field: "Client 2 Employment Inflation Rate", 
            description: "Expected annual increase in Client 2's employment income."
          }
        ]
      },
      {
        title: "Specific to the Retirement Analysis",
        description: "Assumptions specific to retirement planning calculations.",
        fields: [
          {
            field: "Retirement-Specific Fields",
            description: "Additional assumptions and parameters specific to retirement analysis calculations."
          }
        ]
      }
    ]
  },
  "education-funding": {
    default: [
      {
        title: "Education Goals",
        description: "Configure education funding parameters and goals.",
        fields: [
          {
            field: "Number of Children",
            description: "Total number of children for whom you're planning education expenses."
          },
          {
            field: "Years Until College",
            description: "Number of years until the first child enters college."
          },
          {
            field: "School Type",
            description: "Type of institution: Public In-State (lowest cost), Public Out-of-State (moderate cost), or Private (highest cost)."
          },
          {
            field: "Current Annual Cost",
            description: "Today's annual cost for the selected school type. This will be inflated to calculate future costs."
          }
        ]
      },
      {
        title: "Current Savings",
        description: "Existing education savings and contribution plans.",
        fields: [
          {
            field: "529 Plan Balance",
            description: "Current balance in 529 education savings plans. These accounts offer tax advantages for education expenses."
          },
          {
            field: "Monthly Contribution",
            description: "Amount you plan to contribute monthly to education savings."
          },
          {
            field: "Coverage Goal",
            description: "What percentage of total education costs you want to cover through savings (vs. loans, scholarships, etc.)."
          }
        ]
      }
    ]
  },
  "survivor-needs": {
    default: [
      {
        title: "Survivor Needs Analysis",
        description: "Calculate life insurance needs to protect survivors.",
        fields: [
          {
            field: "Survivor Analysis Fields",
            description: "Input fields specific to survivor needs and life insurance analysis."
          }
        ]
      }
    ]
  },
  college: {
    default: [
      {
        title: "College Planning",
        description: "Plan for higher education expenses and funding strategies.",
        fields: [
          {
            field: "College Planning Fields",
            description: "Input fields for college planning and education funding analysis."
          }
        ]
      }
    ]
  }
};

// Function to get help text for a specific context
export const getHelpText = (goalId: string, tabId?: string): HelpTextSection[] => {
  const goalHelp = helpTexts[goalId];
  if (!goalHelp) return [];
  
  if (tabId && goalHelp[tabId]) {
    return goalHelp[tabId];
  }
  
  return goalHelp.default || [];
};