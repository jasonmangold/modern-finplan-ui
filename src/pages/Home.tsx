
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const inflationData = [
  { year: '2020', rate: 1.2 },
  { year: '2021', rate: 4.7 },
  { year: '2022', rate: 8.0 },
  { year: '2023', rate: 4.1 },
  { year: '2024', rate: 3.2 },
];

const Home = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Featured Reports */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Featured Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Fast Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-600 text-white p-4 rounded mb-4">
                <div className="text-sm">2024 Annual Contribution Limits</div>
                <div className="space-y-2 mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>401(k) Elective Deferral</span>
                    <span>$23,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IRA</span>
                    <span>$7,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Catch-up (401k)</span>
                    <span>$7,500</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">One page listing latest contribution limits and more.</p>
              <Button variant="outline" className="text-blue-600">Read More</Button>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Federal Income Tax Tables - 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <div className="text-sm font-medium mb-2">Filing Status</div>
                <table className="w-full text-xs">
                  <tbody>
                    <tr>
                      <td>Single</td>
                      <td className="text-right">$13,850</td>
                    </tr>
                    <tr>
                      <td>Married Filing Jointly</td>
                      <td className="text-right">$27,700</td>
                    </tr>
                    <tr>
                      <td>Head of Household</td>
                      <td className="text-right">$20,800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 mb-4">Be up to date on the latest tax tables.</p>
              <Button variant="outline" className="text-blue-600">Read More</Button>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">History of Inflation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inflationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Bar dataKey="rate" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-600 mb-4">View the annual inflation history rate.</p>
              <Button variant="outline" className="text-blue-600">Read More</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">John Doe</span> - Financial planning session completed.
              </div>
              <div className="text-sm">
                <span className="font-medium">Jane Smith</span> - Investment portfolio review scheduled.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorites */}
        <Card>
          <CardHeader>
            <CardTitle>Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">Retirement Savings Calculator</span> - Estimate your retirement savings needs.
              </div>
              <div className="text-sm">
                <span className="font-medium">Fast Facts Report</span> - Quick reference for contribution limits.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Webinars */}
        <Card>
          <CardHeader>
            <CardTitle>Webinars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">Retirement Planning 101</span> - Join our live webinar to learn the basics.
              </div>
              <div className="text-sm">
                <span className="font-medium">Investing in 2025</span> - Discover top investment strategies.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Minute Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Two Minute Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">Saving for College</span> - Quick tips on setting up a 529 plan.
              </div>
              <div className="text-sm">
                <span className="font-medium">Budgeting Basics</span> - Learn to manage your finances in 2 minutes.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
