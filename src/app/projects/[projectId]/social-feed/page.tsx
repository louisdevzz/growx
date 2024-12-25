"use client"

const SocialFeedTab = () => {
  return (
    <div className="py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
        {/* Empty State Illustration */}
        <div className="relative w-48 h-48 mb-6">
          {/* Stacked Papers Effect */}
          <div className="absolute right-0 top-0 w-32 h-40 bg-white rounded-lg shadow-md transform rotate-6"></div>
          <div className="absolute right-2 top-2 w-32 h-40 bg-white rounded-lg shadow-md transform rotate-3"></div>
          <div className="absolute right-4 top-4 w-32 h-40 bg-white rounded-lg shadow-md">
            {/* Content Lines */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-24 h-2 bg-gray-200 rounded"></div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Empty State Text */}
        <h3 className="text-lg font-medium text-gray-900 italic mb-2">
          This project has not posted yet.
        </h3>
      </div>
    </div>
  );
}

export default SocialFeedTab; 