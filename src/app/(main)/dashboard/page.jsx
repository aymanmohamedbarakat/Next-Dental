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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900 py-8 px-4 rounded-2xl">
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
