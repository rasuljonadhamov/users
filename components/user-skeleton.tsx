export function UserSkeleton() {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="w-3/4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
  
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
  
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }
  
  