// import React from 'react'

// export default function Container({ children }) {
//   return (
//     <div className='container mx-auto p-4'>{children}</div>
//   )
// }

import React from 'react'

export default function Container({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        {/* Gradient Container Box */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  )
}