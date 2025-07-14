'use client'
import React, { useCallback } from 'react'
import { useBookingStore } from '../../_store';
import { useAppointmentStore } from '../_store';
import { getStatusColor } from '../_hooks/GetStatusColor';
import { useSelectedAppointment } from '../_hooks/selectedAppointment';
import { AlertCircle, Calendar, CheckCircle, Clock, Phone, User } from 'lucide-react';
import AppointmentsCardModal from './AppointmentsCardModal';

export default function AppointmentsCard() {
    const { filteredAppointments } = useBookingStore();
    const { selectedAppointment, setSelectedAppointment } = useAppointmentStore();


    const getStatusIcon = useCallback((status) => {
        switch (status) {
            case "paid":
                return <CheckCircle className="w-4 h-4" />;
            case "partial":
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    }, []);


    const getStatusText = useCallback((status) => {
        switch (status) {
            case "paid": return "paid";
            case "partial": return "installment";
            default: return "unpaid";
        }
    }, []);
    return (
        <div>
            {
                filteredAppointments.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredAppointments.map((el) => (
                            <div
                                key={el.id}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                                onClick={() => setSelectedAppointment(el)}
                            >

                                {/* Status Badge */}
                                <div
                                    className={`bg-gradient-to-r ${getStatusColor(
                                        el.paymentStatus
                                    )} p-4`}
                                >
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(el.paymentStatus)}
                                            <span className="font-semibold">
                                                {getStatusText(el.paymentStatus)}
                                            </span>
                                        </div>
                                        <span className="text-sm opacity-90">#{el.id}</span>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    {/* Patient Info */}
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                                            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className='flex flex-col gap-0.5'>
                                            <h3 className="font-bold text-gray-800 dark:text-white">
                                                {el.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
                                                <Phone className="w-4 h-4" />
                                                <span>{el.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Service */}
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                                        <p className="font-semibold text-gray-800 dark:text-white text-center">
                                            {el.service}
                                        </p>
                                    </div>

                                    {/* Date & Time */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {el.date}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {el.time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Total Amount:
                                            </span>
                                            <span className="font-bold text-gray-800 dark:text-white">
                                                {el.servicePrice || 0} EGP
                                            </span>
                                        </div>

                                        {el.isInstallment && (
                                            <>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        Presenter:
                                                    </span>
                                                    <span className="font-semibold text-green-600 dark:text-green-400">
                                                        {el.downPayment} EGP
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        residual:
                                                    </span>
                                                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                                                        {el.remainingAmount} EGP
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 max-w-md mx-auto">
                            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                There are no appointments
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                No dates were found that matched the search or filter specified.                            </p>
                        </div>
                    </div>
                )
            }
    {selectedAppointment && <AppointmentsCardModal />}
        </div>
    )
}
