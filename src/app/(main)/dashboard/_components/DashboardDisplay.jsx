'use client'
import DashBoardCard from "./DashBoardCard"
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useBookingStore } from "../../_store";

export default function DashboardDisplay() {
    const { filteredAppointments } = useBookingStore()
    const router = useRouter()

    const handleViewDetails = useCallback((appointmentId) => {
        router.push(`/patient/${appointmentId}`)
    }, []);
    return (
        <div>
            {
                filteredAppointments.length !== 0 ? (
                    <>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            {filteredAppointments.map((el) => (
                                <DashBoardCard key={el.id} appointment={el} onViewDetails={handleViewDetails} />
                            ))}
                        </div>

                    </>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="capitalize text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            no appointments
                        </h3>
                        <p className="capitalize text-gray-500 dark:text-gray-400 mb-4">
                            no appointments were found with the selected filter
                        </p>
                    </div>
                )
            }
        </div>
    )
}
