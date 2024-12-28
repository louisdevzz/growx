const ProjectCardSkeleton = () => {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur opacity-75"></div>
      <div className="relative bg-white rounded-2xl p-1 animate-pulse">
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          <div className="h-48 bg-gray-200"/>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"/>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"/>
            <div className="h-2 bg-gray-100 rounded-full mb-3"/>
            <div className="flex justify-between items-center text-sm mb-4">
              <div>
                <div className="h-5 bg-gray-200 rounded w-20 mb-1"/>
                <div className="h-4 bg-gray-200 rounded w-24"/>
              </div>
              <div className="text-right">
                <div className="h-5 bg-gray-200 rounded w-16 mb-1"/>
                <div className="h-4 bg-gray-200 rounded w-12"/>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-20"/>
                <div className="h-4 bg-gray-200 rounded w-16"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardSkeleton 