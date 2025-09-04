import type { AIResponse, KnowledgeBaseItem } from './types';

// Mock knowledge base based on education data structure
const knowledgeBase: KnowledgeBaseItem[] = [
  {
    title: "Traditional IRAs",
    folder: "Retirement Planning", 
    subfolder: "IRAs",
    keywords: ["ira", "traditional", "retirement", "contribution", "deduction", "tax"],
    summary: "Traditional IRAs allow you to make tax-deductible contributions and grow your investments tax-deferred until retirement."
  },
  {
    title: "Roth IRAs", 
    folder: "Retirement Planning",
    subfolder: "IRAs", 
    keywords: ["roth", "ira", "contribution", "tax-free", "retirement", "income limits"],
    summary: "Roth IRAs are funded with after-tax dollars but provide tax-free growth and withdrawals in retirement. For 2024, you can contribute up to $7,000 ($8,000 if 50 or older)."
  },
  {
    title: "Cash or Deferred 401(k) Plan",
    folder: "Retirement Planning",
    subfolder: "Employer Plans", 
    keywords: ["401k", "employer", "match", "contribution", "retirement", "plan"],
    summary: "401(k) plans allow employees to defer salary into retirement accounts. Many employers offer matching contributions, which is essentially free money for retirement."
  },
  {
    title: "Social Security Retirement Benefits",
    folder: "Retirement Planning",
    subfolder: "Social Security",
    keywords: ["social security", "retirement", "benefits", "age", "claiming", "pia"],
    summary: "You can start claiming Social Security at age 62, but full benefits begin at full retirement age (66-67). Delaying until age 70 increases benefits by 8% per year."
  },
  {
    title: "Taxation of Social Security Benefits", 
    folder: "Tax Strategy",
    subfolder: "Social Security",
    keywords: ["social security", "tax", "taxation", "income", "provisional"],
    summary: "Social Security benefits may be taxable depending on your provisional income. Up to 85% of benefits can be subject to federal income tax."
  },
  {
    title: "Advantages of a Will",
    folder: "Estate Planning", 
    subfolder: "Wills",
    keywords: ["will", "estate", "planning", "probate", "beneficiary", "assets"],
    summary: "A will ensures your assets are distributed according to your wishes and can name guardians for minor children. Without a will, state laws determine asset distribution."
  },
  {
    title: "Basic Steps in the Estate Planning Process",
    folder: "Estate Planning",
    keywords: ["estate", "planning", "process", "documents", "beneficiary", "trust"],
    summary: "Estate planning involves creating wills, trusts, power of attorney documents, and beneficiary designations to protect your assets and provide for your loved ones."
  },
  {
    title: "Term Life Insurance", 
    folder: "Insurance",
    subfolder: "Life Insurance",
    keywords: ["term", "life", "insurance", "coverage", "premium", "temporary"],
    summary: "Term life insurance provides temporary coverage for a specific period (10, 20, or 30 years) at lower premiums than permanent insurance."
  },
  {
    title: "Whole Life Insurance",
    folder: "Insurance", 
    subfolder: "Life Insurance",
    keywords: ["whole", "life", "insurance", "permanent", "cash", "value"],
    summary: "Whole life insurance provides permanent coverage with level premiums and builds cash value you can borrow against."
  },
  {
    title: "Disability Insurance",
    folder: "Insurance",
    subfolder: "Disability",
    keywords: ["disability", "insurance", "income", "protection", "short-term", "long-term"],
    summary: "Disability insurance replaces a portion of your income if you become unable to work due to illness or injury."
  }
];

// Mock conversation patterns and responses
const conversationPatterns = {
  roth_ira: {
    keywords: ["roth", "ira", "contribution", "limit"],
    response: "For 2024, you can contribute up to $7,000 to a Roth IRA ($8,000 if you're 50 or older). However, contribution limits phase out based on income - for single filers, the phase-out begins at $138,000 and is completely phased out at $153,000. Roth IRAs offer tax-free growth and tax-free withdrawals in retirement, making them an excellent long-term savings vehicle.",
    sources: ["Roth IRAs", "Traditional IRAs"]
  },
  
  social_security: {
    keywords: ["social", "security", "when", "start", "collect", "claim"],
    response: "The optimal time to claim Social Security depends on your personal situation. You can start as early as age 62 (with reduced benefits), claim full benefits at your full retirement age (66-67), or delay until age 70 for increased benefits. For each year you delay past full retirement age, your benefits increase by about 8%. Consider your health, financial needs, and other retirement income when deciding.",
    sources: ["Social Security Retirement Benefits", "Taxation of Social Security Benefits"]
  },
  
  "401k": {
    keywords: ["401k", "401(k)", "employer", "plan", "benefit", "match"],
    response: "A 401(k) plan is an employer-sponsored retirement account that allows you to contribute pre-tax dollars, reducing your current taxable income. Many employers offer matching contributions - this is essentially free money, so always contribute enough to get the full match. For 2024, you can contribute up to $23,000 ($30,500 if 50 or older). The money grows tax-deferred until retirement.",
    sources: ["Cash or Deferred 401(k) Plan"]
  },
  
  estate_planning: {
    keywords: ["estate", "planning", "documents", "will", "need"],
    response: "Essential estate planning documents include: 1) A will to distribute your assets and name guardians for children, 2) Durable power of attorney for financial decisions, 3) Healthcare power of attorney for medical decisions, 4) Advanced directive/living will for end-of-life care preferences. Depending on your situation, you may also need trusts to minimize taxes and avoid probate.",
    sources: ["Advantages of a Will", "Basic Steps in the Estate Planning Process"]
  },
  
  life_insurance: {
    keywords: ["life", "insurance", "type", "need", "coverage"],
    response: "There are two main types of life insurance: Term and Permanent. Term life insurance provides coverage for a specific period (10-30 years) at lower cost, ideal for temporary needs like mortgage protection or income replacement while children are young. Permanent insurance (whole/universal life) provides lifelong coverage and builds cash value, but costs more. Most people start with term insurance for affordability.",
    sources: ["Term Life Insurance", "Whole Life Insurance"]
  },
  
  retirement_planning: {
    keywords: ["retirement", "planning", "calculate", "need", "how much"],
    response: "A common rule of thumb is to save 10-15% of your income for retirement and plan to replace 70-90% of your pre-retirement income. Consider using the 4% withdrawal rule as a starting point - you'll need about 25 times your annual expenses saved. Start early to benefit from compound growth, maximize employer matches, and consider both traditional and Roth accounts for tax diversification.",
    sources: ["Traditional IRAs", "Roth IRAs", "Cash or Deferred 401(k) Plan"]
  }
};

export const aiChatService = {
  async getResponse(userMessage: string): Promise<AIResponse> {
    const messageLower = userMessage.toLowerCase();
    
    // Find matching conversation pattern
    for (const [key, pattern] of Object.entries(conversationPatterns)) {
      if (pattern.keywords.some(keyword => messageLower.includes(keyword))) {
        return {
          content: pattern.response,
          sources: pattern.sources
        };
      }
    }
    
    // Fallback response with general search
    const matchingKnowledge = knowledgeBase.filter(item =>
      item.keywords.some(keyword => messageLower.includes(keyword))
    );
    
    if (matchingKnowledge.length > 0) {
      const item = matchingKnowledge[0];
      return {
        content: `Based on our educational resources about ${item.title.toLowerCase()}: ${item.summary}\n\nFor more detailed information, please refer to the linked educational materials.`,
        sources: [item.title]
      };
    }
    
    // Generic helpful response
    return {
      content: "I'd be happy to help with your financial planning question! I have access to comprehensive educational resources covering retirement planning, investment strategies, insurance, estate planning, and tax strategies. Could you please be more specific about what you'd like to learn? For example, you might ask about retirement account contribution limits, insurance needs, or estate planning basics.",
      sources: []
    };
  }
};