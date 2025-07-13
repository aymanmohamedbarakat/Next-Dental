import React from 'react'
import { getStatusBadge } from '../_utils/Helpers'
import { Calendar, Eye, Phone } from 'lucide-react'

export default function DashBoardCard({ appointment, onViewDetails }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
            <div className="p-4 lg:p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {appointment.name}
                    </h3>
                    <div className='flex'>
                        <button
                            onClick={() => onViewDetails(appointment.id)}
                            className="flex items-center gap-2 px-2 py-2  text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        {getStatusBadge(appointment.paymentStatus)}
                    </div>
                </div>
                <div className="space-y-3 text-sm">

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {appointment.date} - {appointment.time}
                        </span>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-4">
                        <div className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                            {appointment.service}
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className=''>
                                <span className="capitalize text-gray-500 dark:text-gray-400">
                                    full price :
                                </span>
                                <div className="font-semibold text-gray-800 dark:text-gray-200 mt-1">
                                    {appointment.servicePrice}
                                </div>
                            </div>
                            {appointment.isInstallment && (
                                <>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Down Payment :
                                        </span>
                                        <div className="font-semibold text-green-600 dark:text-green-400 mt-1">
                                            {appointment.downPayment}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Remaining :
                                        </span>
                                        <div className="font-semibold text-orange-600 dark:text-orange-400 mt-1">
                                            {appointment.remainingAmount}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Monthly Installment :
                                        </span>
                                        <div className="font-semibold text-blue-600 dark:text-blue-400 mt-1">
                                            {appointment.monthlyPayment}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={() => onViewDetails(appointment.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        <Eye className="w-4 h-4" />
                        Show Details
                    </button>
                </div> */}
            </div>
        </div>
    )
}
