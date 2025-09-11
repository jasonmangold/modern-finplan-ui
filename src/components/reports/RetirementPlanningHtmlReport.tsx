import React from "react";

export const RetirementPlanningHtmlReport = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 text-gray-800 leading-relaxed">
      {/* Header */}
      <div className="text-center mb-8 pb-4 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          The Need for Retirement Planning
        </h1>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* First Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1">
            <p className="text-base mb-4">
              Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.
            </p>
            <p className="text-base">
              More recently, however, many individuals are beginning to recognize that for a number of reasons, this traditional view of retirement is no longer accurate. Some individuals, for example, are voluntarily choosing to retire early, in their 40s or 50s. Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65. And, many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as travel, returning to school, volunteer work, or the pursuit of favorite hobbies or sports.
            </p>
          </div>
          <div className="lg:w-80 flex-shrink-0">
            <img 
              src="/lovable-uploads/9172f7ae-ee66-4331-98b2-85ada5e35d22.png" 
              alt="Retirement planning book with pen" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        <p className="text-base">
          This changed the face of retirement, however, with all of its possibilities, does not happen automatically. Many of the issues associated with retirement, such as ill health, and the need to provide income, still exist. With proper planning, however, these needs can be met.
        </p>

        {/* Longer Lives Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Longer Lives</h2>
          <p className="text-base mb-6">
            The single most important factor in this changed retirement picture is the fact that we now live much longer than before. A child born in 1900, for example, had an average life expectancy of 47.3 years. For a child born in 2020, however, average life expectancy had increased to 77.0 years. The following graph<sup>1</sup> illustrates this change.
          </p>
          
          <div className="text-center mb-6">
            <img 
              src="/lovable-uploads/89b01d81-0768-40ef-b80c-7fb2a646e47c.png" 
              alt="Average U.S. Life Expectancy Chart (1900-2020)" 
              className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Common Retirement Planning Issues */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Common Retirement Planning Issues</h2>
          <p className="text-base mb-4">
            Planning for a much longer life span involves addressing problems not faced by earlier generations. Some of the key issues include the following:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-blue-700 mb-2">• Paying for retirement:</h3>
              <p className="text-base ml-4">
                Providing a steady income is often the key problem involved in retirement planning. Longer life spans raise the issue of the impact of inflation on fixed dollar payments, as well as the possibility of outliving accumulated personal savings. Social Security retirement benefits and income from employer-sponsored retirement plans typically provide only a portion of the total income required. If income is insufficient, a retiree may be forced to either continue working, or face a reduced standard of living.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-blue-700 mb-2">• Health care:</h3>
              <p className="text-base ml-4">
                The health benefits provided through the federal government's Medicare program are generally considered to be only a foundation. Often a supplemental Medigap policy is needed, as is a long-term care policy, to provide needed benefits not available through Medicare. Health care planning should also consider a health care proxy, allowing someone else to make medical decisions when an individual is temporarily incapacitated, as well as a living will that expresses an individual's wishes when no hope of recovery is possible.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-blue-700 mb-2">• Estate planning:</h3>
              <p className="text-base ml-4">
                Retirement planning inevitably must consider what happens to an individual's assets after retirement is over. Estate planning should ensure not only that assets are transferred to the individuals or organizations chosen by the owner, but also that the transfer is done with the least amount of tax and administrative expense.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-blue-700 mb-2">• Housing:</h3>
              <p className="text-base ml-4">
                This question involves not only the size and type of home (condo, house, shared housing, assisted living), but also its location. Such factors as climate and proximity to close family members and medical care are often important. Completely paying off a home loan can reduce monthly income needs. A reverse mortgage may provide additional monthly income.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-blue-700 mb-2">• Lifestyle:</h3>
              <p className="text-base ml-4">
                Some individuals, accustomed to a busy work life, find it difficult to enjoy the freedom offered by retirement. Planning ahead can make this transition easier.
              </p>
            </div>
          </div>
        </div>

        {/* Seek Professional Guidance */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Seek Professional Guidance</h2>
          <p className="text-base">
            Developing a successful retirement plan involves carefully considering a wide range of issues and potential problems. Finding solutions to these questions often requires both personal education and the guidance of knowledgeable individuals, from many professional disciplines. The key is to begin planning as early as possible.
          </p>
        </div>
      </div>
    </div>
  );
};