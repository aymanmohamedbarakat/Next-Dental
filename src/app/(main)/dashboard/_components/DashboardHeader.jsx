import React from 'react'

export default function DashboardHeader() {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8">
            <div>
                <h1 className="text-2xl capitalize lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Clinic Dashboard
                </h1>
                <p className="capitalize text-gray-600 dark:text-gray-400">
                    appointment & payment management
                </p>
            </div>
        </div>
    )
}
