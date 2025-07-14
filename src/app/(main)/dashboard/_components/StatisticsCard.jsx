'use client'

import { memo, useEffect, useMemo } from "react"
import { Calendar, CheckCircle, CreditCard, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { useBookingStore } from "../../_store"

export default memo(
    function StatisticsCard() {
        const { filteredAppointments } = useBookingStore()
        const statisticsCard = useMemo(() => {

            const totalRevenue = filteredAppointments.reduce(
                (sum, apt) => sum + apt.servicePrice,
                0
            );
            const totalPaid = filteredAppointments.reduce(
                (sum, apt) => sum + apt.downPayment,
                0
            );
            const totalRemaining = filteredAppointments.reduce(
                (sum, apt) => sum + apt.remainingAmount,
                0
            );

            return [
                {
                    id: 1,
                    title: "Total Appointments",
                    value: filteredAppointments.length,
                    icon: Calendar,
                    color: "text-blue-600 dark:text-blue-400",
                    bg: "bg-blue-50 dark:bg-blue-900/20",
                    growth: "+12%",
                    isPositive: true,
                },
                {
                    id: 2,
                    title: "Total Revenue",
                    value: totalRevenue,
                    icon: DollarSign,
                    color: "text-green-600 dark:text-green-400",
                    bg: "bg-green-50 dark:bg-green-900/20",
                    growth: "+8%",
                    isPositive: true,
                },
                {
                    id: 3,
                    title: "Amount Paid",
                    value: totalPaid,
                    icon: CheckCircle,
                    color: "text-emerald-600 dark:text-emerald-400",
                    bg: "bg-emerald-50 dark:bg-emerald-900/20",
                    growth: "+15%",
                    isPositive: true,
                },
                {
                    id: 4,
                    title: "Remaining Amount",
                    value: totalRemaining,
                    icon: CreditCard,
                    color: "text-orange-600 dark:text-orange-400",
                    bg: "bg-orange-50 dark:bg-orange-900/20",
                    growth: "-5%",
                    isPositive: false,
                },
            ]
        }, [filteredAppointments])

        useEffect(() => {
            console.log(filteredAppointments)
        }, [])
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {
                    statisticsCard.map((el, index) => (
                        <div key={el.id} className={`bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 ${el.bg}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        {el.title}
                                    </p>
                                    <p className={`text-xl lg:text-2xl font-bold ${el.color} mb-1`}>{el.value}</p>

                                    <p className={`capitalize text-xs flex items-center gap-1 ${el.isPositive
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                        }`}>
                                        {el.isPositive ? (
                                            <TrendingUp className="w-3 h-3" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3" />
                                        )}
                                        {el.growth} from last month
                                    </p>
                                </div>
                                <el.icon className={`w-8 h-8 ${el.color}`} />
                            </div>
                        </div>
                    ))
                }
            </div >
        )
    }
) 
