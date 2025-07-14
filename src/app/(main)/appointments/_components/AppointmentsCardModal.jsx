import React from 'react'
import { useAppointmentStore } from '../_store';
import { getStatusColor } from '../_hooks/GetStatusColor';
import { X } from 'lucide-react';

export default function AppointmentsCardModal() {
    const { selectedAppointment, setSelectedAppointment } = useAppointmentStore();

    if (!selectedAppointment) return null;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div
                    className={`bg-gradient-to-r ${getStatusColor(
                        selectedAppointment.paymentStatus
                    )} p-6 text-white`}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Appointment details</h2>
                        <button
                            onClick={() => setSelectedAppointment(null)}
                            className="text-white/80 hover:text-white text-2xl transition-colors"
                        >
                            <X />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    {/* Main Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Patient's name
                            </label>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                {selectedAppointment.name}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Phone number
                            </label>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                {selectedAppointment.phone}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Service
                            </label>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                {selectedAppointment.service}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Date
                            </label>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                {selectedAppointment.date}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Time
                            </label>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                {selectedAppointment.time}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total amount
                            </label>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                {selectedAppointment.servicePrice} جنيه
                            </p>
                        </div>
                    </div>
                    {/* Installment Details */}
                    {selectedAppointment.isInstallment && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 text-center">
                                Installment details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                                        Presenter
                                    </span>
                                    <p className="font-semibold text-green-600 text-lg">
                                        {selectedAppointment.downPayment} EGP
                                    </p>
                                </div>
                                <div className="text-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                                        residual
                                    </span>
                                    <p className="font-semibold text-orange-600 text-lg">
                                        {selectedAppointment.remainingAmount} EGP
                                    </p>
                                </div>
                                <div className="text-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                                        Number of installments
                                    </span>
                                    <p className="font-semibold text-gray-800 dark:text-white text-lg">
                                        {selectedAppointment.installmentCount} installment
                                    </p>
                                </div>
                                <div className="text-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                                        Monthly installment
                                    </span>
                                    <p className="font-semibold text-gray-800 dark:text-white text-lg">
                                        {selectedAppointment.monthlyPayment} EGP
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
