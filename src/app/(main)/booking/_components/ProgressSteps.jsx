import React from 'react'
import { Calendar, CheckCircle, CreditCard, User } from 'lucide-react';

export default function ProgressSteps({ currentStep }) {
    const steps = [
        { id: 1, title: "Personal data", icon: User },
        { id: 2, title: "Appointment details", icon: Calendar },
        { id: 3, title: "Payment and confirmation", icon: CreditCard },
    ];
    return (
        <div className="mb-12">
            <div className="flex justify-center items-center space-x-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex justify-center items-center">
                        <div
                            className={`flex flex-col items-center ${currentStep >= step.id
                                ? "text-purple-600 dark:text-purple-400"
                                : "text-gray-400 dark:text-gray-600"
                                }`}
                        >
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${currentStep >= step.id
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110"
                                    : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                {currentStep > step.id ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : (
                                    <step.icon className="w-6 h-6" />
                                )}
                            </div>
                            <span className="text-sm text-center font-medium hidden sm:block">
                                {step.title}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-16 h-1 rounded-full mx-1 transition-all duration-300 ${currentStep > step.id
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600"
                                    : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>

    )
}
