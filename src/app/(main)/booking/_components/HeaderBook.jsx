import { Sparkles } from 'lucide-react'
import React from 'react'

export default function HeaderBook() {
    return (
        <div className="mb-12 text-center flex flex-col md:flex-row items-center gap-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    Book a new appointment
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                    Book your appointment easily and get the best services at the clinic.
                </p>
            </div>
        </div>
    )
}
