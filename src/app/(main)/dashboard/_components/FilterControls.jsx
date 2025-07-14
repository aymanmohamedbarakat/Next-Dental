'use client'

import { useCallback } from "react"
import { CheckCircle, CreditCard, Filter, Users } from "lucide-react";
import { useBookingStore } from "../../_store";

export default function FilterControls() {
    const { appointments, filterAppointments, applyFiltersAndSearch, currentFilter, filteredAppointments, } = useBookingStore();

    const handleFilterChange = useCallback((filter) => { filterAppointments(filter) }, [filterAppointments])

    const getStats = useCallback(() => {
        const total = appointments.length;
        const paid = applyFiltersAndSearch(appointments, "paid", "").length;
        const installment = applyFiltersAndSearch(appointments, "installment", "").length;

        return { total, paid, installment };
    }, [appointments, applyFiltersAndSearch]);


    const stats = getStats()

    const filterOptions = [
        {
            key: "all",
            label: "All appointments",
            icon: Users,
            count: stats.total,
            activeColor: "bg-blue-600 text-white border-blue-600 shadow-blue-200",
            inactiveColor:
                "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
            badgeColor:
                "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        },
        {
            key: "installment",
            label: "Installment",
            icon: CreditCard,
            count: stats.installment,
            activeColor:
                "bg-purple-600 text-white border-purple-600 shadow-purple-200",
            inactiveColor:
                "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
            badgeColor:
                "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        },
        {
            key: "paid",
            label: "Paid",
            icon: CheckCircle,
            count: stats.paid,
            activeColor: "bg-green-600 text-white border-green-600 shadow-green-200",
            inactiveColor:
                "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/20",
            badgeColor:
                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        },

    ]
    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="capitalize text-lg font-semibold text-gray-900 dark:text-white">
                        Filter Appointments
                    </h3>
                    <p className="capitalize text-sm text-gray-500 dark:text-gray-400">
                        choose the type of appointments you want to display
                    </p>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex gap-3 flex-wrap">
                {filterOptions.map(({ key, label, icon: Icon, count, activeColor, inactiveColor, badgeColor, }) => (
                    <button key={key}
                        onClick={() => handleFilterChange(key)}
                        className={`
                relative flex items-center gap-3 px-4 py-3 rounded-lg border-2 font-medium text-sm
                transition-all duration-200 hover:scale-[1.02] hover:shadow-md
                ${currentFilter === key ? activeColor : inactiveColor}
              `}>
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                        <span
                            className={`inline-flex items-center justify-center min-w-[20px] h-5 px-2 text-xs font-semibold rounded-full ${currentFilter === key ? "bg-white/20 text-white" : badgeColor
                                }`}
                        >
                            {count}
                        </span>
                        {currentFilter === key && (
                            <div className="absolute inset-0 rounded-lg shadow-lg opacity-30 pointer-events-none"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Tablet Layout */}
            <div className="hidden md:grid lg:hidden grid-cols-3 gap-3">
                {filterOptions.map(
                    ({
                        key,
                        label,
                        icon: Icon,
                        count,
                        activeColor,
                        inactiveColor,
                        badgeColor,
                    }) => (
                        <button
                            key={key}
                            onClick={() => handleFilterChange(key)}
                            className={`
              relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 font-medium text-sm
              transition-all duration-200 hover:scale-[1.02] hover:shadow-md
              ${currentFilter === key ? activeColor : inactiveColor}
            `}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-center leading-tight">{label}</span>
                            <span className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-semibold rounded-full ${currentFilter === key ? "bg-white/20 text-white" : badgeColor}`}>
                                {count}
                            </span>
                            {currentFilter === key && (
                                <div className="absolute inset-0 rounded-lg shadow-lg opacity-30 pointer-events-none"></div>
                            )}
                        </button>
                    )
                )}
            </div>


            {/* Mobile Layout */}
            <div className="md:hidden space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    {filterOptions
                        .slice(0, 4)
                        .map(
                            ({
                                key,
                                label,
                                icon: Icon,
                                count,
                                activeColor,
                                inactiveColor,
                                badgeColor,
                            }) => (
                                <button
                                    key={key}
                                    onClick={() => handleFilterChange(key)}
                                    className={` relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 font-medium text-xs transition-all duration-200 hover:scale-[1.02]${currentFilter === key ? activeColor : inactiveColor}`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-center leading-tight">{label}</span>
                                    <span
                                        className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full ${currentFilter === key
                                            ? "bg-white/20 text-white"
                                            : badgeColor
                                            }`}
                                    >
                                        {count}
                                    </span>
                                    {currentFilter === key && (
                                        <div className="absolute inset-0 rounded-lg shadow-lg opacity-30 pointer-events-none"></div>
                                    )}
                                </button>
                            )
                        )}
                </div>
            </div>
        </div>
    )
}
