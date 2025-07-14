'use client'
import React from 'react'
import HeaderBook from './_components/HeaderBook'
import ProgressSteps from './_components/ProgressSteps'
import { useCurrentStep } from './_hooks/useCurrentStep'
import FormBook from './_components/FormBook'

export default function Booking() {
  const { currentStep, setCurrentStep } = useCurrentStep()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900 py-8 px-4 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <HeaderBook />

        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep}/>

        {/* Main Form */}
        <FormBook currentStep={currentStep} setCurrentStep={setCurrentStep}/>
      </div>
    </div>
  )
}
