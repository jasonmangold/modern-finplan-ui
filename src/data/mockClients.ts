interface MockClient {
  id: string;
  name: string;
  phone: string;
  address: string;
  presentationItems: {
    id: string;
    name: string;
    source: "Analysis" | "Education" | "Calculators";
  }[];
  companyInfo: {
    advisorName: string;
    designations: string;
    title: string;
    companyName: string;
    address: string;
    phone: string;
    mobile: string;
    fax: string;
    email: string;
    website: string;
    disclaimer: string;
    disclosure: string;
  };
}

export const mockClients: MockClient[] = [
  {
    id: "sample-client-1",
    name: "John & Jane Sample",
    phone: "(555) 123-4567",
    address: "123 Main Street, Anytown, ST 12345",
    presentationItems: [
      { id: "analysis-goals", name: "Analysis Goals", source: "Analysis" },
      { id: "financial-inventory", name: "Financial Inventory", source: "Analysis" },
      { id: "financial-fitness", name: "Financial Fitness", source: "Analysis" },
      { id: "retirement-analysis", name: "Retirement Analysis", source: "Analysis" },
      { id: "capital-available", name: "Capital Available for Retirement", source: "Analysis" },
      { id: "retirement-timeline", name: "Retirement Timeline", source: "Calculators" },
      { id: "alternatives-retirement", name: "Alternatives to Achieving Retirement Goals", source: "Analysis" },
      { id: "education-funding", name: "Education Funding Summary", source: "Education" },
      { id: "survivor-needs", name: "Survivor Needs - Client 1 Dies", source: "Analysis" },
      { id: "asset-allocation", name: "Asset Allocation Comparison", source: "Analysis" }
    ],
    companyInfo: {
      advisorName: "Sarah Johnson, CFP®",
      designations: "CFP®, ChFC®, CLU®",
      title: "Senior Financial Advisor",
      companyName: "Premier Financial Planning",
      address: "456 Financial Way, Suite 200, Business City, ST 54321",
      phone: "(555) 987-6543",
      mobile: "(555) 987-6544",
      fax: "(555) 987-6545",
      email: "sarah.johnson@premierfinancial.com",
      website: "www.premierfinancial.com",
      disclaimer: "This presentation is for educational purposes only and does not constitute investment advice.",
      disclosure: "Securities offered through Premier Financial Planning, LLC. Investment advisory services offered through Premier Advisory Services, LLC."
    }
  }
];

export const getSampleClient = () => mockClients[0];