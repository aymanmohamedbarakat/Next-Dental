'use client'
import React from 'react'
import { Calendar, CheckCircle, CreditCard } from 'lucide-react';
import { useBookingStore } from '../../_store';

export default function StatisticsCards() {
    const { filteredAppointments } = useBookingStore();

    const total = filteredAppointments.length;
    const paid = filteredAppointments.filter((a) => a.paymentStatus === "paid");
    const partial = filteredAppointments.filter((a) => a.paymentStatus === "partial");
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Cards */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium opacity-90">Total appointments</h3>
                        <p className="text-3xl font-bold">{total}</p>
                    </div>
                    <Calendar className="w-8 h-8 opacity-80" />
                </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium opacity-90">Paid in full</h3>
                        <p className="text-3xl font-bold">
                            {paid.length}
                        </p>
                    </div>
                    <CheckCircle className="w-8 h-8 opacity-80" />
                </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium opacity-90">In installments</h3>
                        <p className="text-3xl font-bold">
                            {partial.length}
                        </p>
                    </div>
                    <CreditCard className="w-8 h-8 opacity-80" />
                </div>
            </div>
        </div>
    )
}
