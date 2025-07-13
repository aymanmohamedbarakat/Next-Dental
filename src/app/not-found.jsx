'use client'
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* 404 Number */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Could not find the requested resource
                    </p>
                </div>

                {/* Illustration */}
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        The page you're looking for doesn't exist
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={() => router.back()}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </button>
                </div>

                {/* Help Text */}
                <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                    <p>If you think this is a mistake, please contact support</p>
                </div>
            </div>
        </div>
    );
}