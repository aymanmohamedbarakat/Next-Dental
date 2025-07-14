import React from 'react'
import HeaderAppointment from './_components/HeaderAppointment'
import SearchFilterBar from './_components/SearchFilterBar'
import StatisticsCards from './_components/StatisticsCards'
import AppointmentsCard from './_components/AppointmentsCard'

export default function Appointments() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900 py-8 px-4 rounded-2xl">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <HeaderAppointment />

        {/* Search and Filter Bar */}
        <SearchFilterBar />

        {/* Statistics Cards */}
        <StatisticsCards />

        {/* Appointments Grid */}
        <AppointmentsCard />
      </div>
    </div>
  )
}
