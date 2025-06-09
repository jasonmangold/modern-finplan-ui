import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Printer, BookOpen, TrendingUp, Users, Heart, Home, PiggyBank, Calendar, DollarSign } from "lucide-react";

interface ReportViewerProps {
  reportId: string;
}

export const ReportViewer = ({ reportId }: ReportViewerProps) => {
  if (reportId === "retirement-planning") {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <PiggyBank className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">The Need for Retirement Planning</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the evolving landscape of retirement and the importance of comprehensive planning for your financial future
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Financial Planning
            </Badge>
            <Badge variant="outline">8 min read</Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop"
            alt="Retirement planning concept"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/20"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. 
                An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. 
                Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.
              </p>
            </CardContent>
          </Card>

          {/* Modern Retirement */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              The Changing Face of Retirement
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Early Retirement</h3>
                  <p className="text-gray-700">
                    Many individuals are voluntarily choosing to retire early, in their 40s or 50s, enabled by careful financial planning and lifestyle choices.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Extended Careers</h3>
                  <p className="text-gray-700">
                    Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <p className="text-lg text-gray-700">
                Many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as 
                <strong className="text-blue-700"> travel, returning to school, volunteer work,</strong> or the pursuit of favorite hobbies or sports.
              </p>
            </div>
          </div>

          {/* Longevity Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              Longer Lives, Greater Opportunities
            </h2>
            
            <Card className="bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Life Expectancy Growth</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">1900:</span>
                        <span className="text-2xl font-bold text-red-600">47.3 years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">2020:</span>
                        <span className="text-2xl font-bold text-green-600">77.0 years</span>
                      </div>
                      <div className="text-center pt-2">
                        <span className="text-lg font-semibold text-blue-600">+29.7 years increase</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
                      alt="Healthy aging"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Issues */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
              Common Retirement Planning Issues
            </h2>
            
            <p className="text-lg text-gray-700">
              Planning for a much longer life span involves addressing problems not faced by earlier generations. Some of the key issues include:
            </p>

            <div className="grid gap-6">
              {/* Income Issue */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <PiggyBank className="h-6 w-6 text-green-600" />
                    Paying for Retirement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Providing a steady income is often the key problem involved in retirement planning. Longer life spans raise the issue of the impact of inflation on fixed dollar payments, as well as the possibility of outliving accumulated personal savings.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Key Consideration:</strong> Social Security retirement benefits and income from employer-sponsored retirement plans typically provide only a portion of the total income required.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Health Care */}
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-red-600" />
                    Health Care Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    The health benefits provided through the federal government's Medicare program are generally considered to be only a foundation. Often a supplemental Medigap policy is needed, as is a long-term care policy.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Health care proxy for medical decisions</li>
                    <li>Living will expressing individual wishes</li>
                    <li>Long-term care insurance consideration</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Estate Planning */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    Estate Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Retirement planning inevitably must consider what happens to an individual's assets after retirement is over. Estate planning should ensure assets are transferred efficiently with minimal tax and administrative expense.
                  </p>
                </CardContent>
              </Card>

              {/* Housing */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Home className="h-6 w-6 text-orange-600" />
                    Housing Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    This involves not only the size and type of home (condo, house, shared housing, assisted living), but also its location.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Factors:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Climate preferences</li>
                        <li>Proximity to family</li>
                        <li>Access to medical care</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Financial Options:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Paying off home loans</li>
                        <li>Reverse mortgage options</li>
                        <li>Downsizing strategies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Professional Guidance */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-blue-900">
                Seek Professional Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-blue-800">
                Developing a successful retirement plan involves carefully considering a wide range of issues and potential problems. 
                Finding solutions to these questions often requires both personal education and the guidance of knowledgeable individuals from many professional disciplines.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-xl font-bold text-blue-900">
                  The key is to begin planning as early as possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (reportId === "retirement-planning-2") {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <PiggyBank className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">The Need for Retirement Planning (2)</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the evolving landscape of retirement and the importance of comprehensive planning for your financial future
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Financial Planning
            </Badge>
            <Badge variant="outline">12 min read</Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"
            alt="Retirement planning concept"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/20"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Traditional Retirement */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.
              </p>
            </CardContent>
          </Card>

          {/* Modern Retirement Changes */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              The Changing Face of Retirement
            </h2>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <p className="text-lg text-gray-700 mb-4">
                More recently, however, many individuals are beginning to recognize that for a number of reasons, this traditional view of retirement is no longer accurate. Some individuals, for example, are voluntarily choosing to retire early, in their 40s or 50s. Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65.
              </p>
              <p className="text-lg text-gray-700">
                And, many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as travel, returning to school, volunteer work, or the pursuit of favorite hobbies or sports.
              </p>
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700">
                  This changed the face of retirement, however, with all of its possibilities, does not happen automatically. Many of the issues associated with retirement, such as ill health, and the need to provide income, still exist. With proper planning, however, these needs can be met.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Longer Lives Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              Longer Lives
            </h2>
            
            <Card className="bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-lg text-gray-700 mb-6">
                      The single most important factor in this changed retirement picture is the fact that we now live much longer than before. A child born in 1900, for example, had an average life expectancy of 47.3 years. For a child born in 2020, however, average life expectancy had increased to 77.0 years. The following graph illustrates this change.
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">1900:</span>
                        <span className="text-2xl font-bold text-red-600">47.3 years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">2020:</span>
                        <span className="text-2xl font-bold text-green-600">77.0 years</span>
                      </div>
                      <div className="text-center pt-2">
                        <span className="text-lg font-semibold text-blue-600">+29.7 years increase</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
                      alt="Healthy aging and longer lives"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Issues Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
              Common Retirement Planning Issues
            </h2>
            
            <p className="text-lg text-gray-700">
              Planning for a much longer life span involves addressing problems not faced by earlier generations. Some of the key issues include the following:
            </p>

            <div className="grid gap-6">
              {/* Paying for Retirement */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    Paying for retirement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Providing a steady income is often the key problem involved in retirement planning. Longer life spans raise the issue of the impact of inflation on fixed dollar payments, as well as the possibility of outliving accumulated personal savings. Social Security retirement benefits and income from employer-sponsored retirement plans typically provide only a portion of the total income required. If income is insufficient, a retiree may be forced to either continue working, or face a reduced standard of living.
                  </p>
                </CardContent>
              </Card>

              {/* Health Care */}
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-red-600" />
                    Health care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    The health benefits provided through the federal government's Medicare program are generally considered to be only a foundation. Often a supplemental Medigap policy is needed, as is a long-term care policy, to provide needed benefits not available through Medicare. Health care planning should also consider a health care proxy, allowing someone else to make medical decisions when an individual is temporarily incapacitated, as well as a living will that expresses an individual's wishes when no hope of recovery is possible.
                  </p>
                </CardContent>
              </Card>

              {/* Estate Planning */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    Estate planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Retirement planning inevitably must consider what happens to an individual's assets after retirement is over. Estate planning should ensure not only that assets are transferred to the individuals or organizations chosen by the owner, but also that the transfer is done with the least amount of tax and administrative expense.
                  </p>
                </CardContent>
              </Card>

              {/* Housing */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Home className="h-6 w-6 text-orange-600" />
                    Housing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    This question involves not only the size and type of home (condo, house, shared housing, assisted living), but also its location. Such factors as climate and proximity to close family members and medical care are often important. Completely paying off a home loan can reduce monthly income needs. A reverse mortgage may provide additional monthly income.
                  </p>
                </CardContent>
              </Card>

              {/* Lifestyle */}
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    Lifestyle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Some individuals, accustomed to a busy work life, find it difficult to enjoy the freedom offered by retirement. Planning ahead can make this transition easier.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Professional Guidance */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-blue-900">
                Seek Professional Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-blue-800">
                Developing a successful retirement plan involves carefully considering a wide range of issues and potential problems. Finding solutions to these questions often requires both personal education and the guidance of knowledgeable individuals, from many professional disciplines. The key is to begin planning as early as possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <div>Report not found</div>;
};
