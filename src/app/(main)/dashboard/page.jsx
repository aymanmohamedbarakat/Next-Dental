'use client'
import DashboardDisplay from './_components/DashboardDisplay'
import DashboardHeader from './_components/DashboardHeader'
import StatisticsCard from './_components/StatisticsCard'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FilterControls = dynamic(() =>
    import('./_components/FilterControls'),
    {
        ssr: false,
        loading: () => <div>Loading filters...</div>
    }
)

export default function Dashboard() {
    return (
        <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 lg:p-6 rounded-2xl">
            <div className="max-w-7xl mx-auto">
                <DashboardHeader />
                <StatisticsCard />
                <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                    <FilterControls />
                </div>

                <DashboardDisplay />
            </div>
        </div>
    )
}
