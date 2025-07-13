"use client"
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const dummyAppointments = [
    {
        id: 1,
        name: "Ahmed Mohamed Ali",
        service: "Teeth Cleaning",
        phone: "01012345678",
        date: "2025-07-15",
        time: "10:00",
        wantsInstallment: false,
        isInstallment: false,
        servicePrice: 500,
        downPayment: 500,
        remainingAmount: 0,
        installments: 1,
        installmentCount: 1,
        monthlyPayment: 0,
        isPaid: true,
        paymentStatus: "paid",
    },
    {
        id: 2,
        name: "Fatma El-Sayed Mahmoud",
        service: "Tooth Filling",
        phone: "01098765432",
        date: "2025-07-16",
        time: "14:30",
        wantsInstallment: true,
        isInstallment: true,
        servicePrice: 800,
        downPayment: 300,
        remainingAmount: 500,
        installments: 5,
        installmentCount: 5,
        monthlyPayment: 100,
        isPaid: false,
        paymentStatus: "partial",
    },
    {
        id: 3,
        name: "Mohamed Ahmed Hassan",
        service: "Braces (Orthodontics)",
        phone: "01155555555",
        date: "2025-07-17",
        time: "09:00",
        wantsInstallment: true,
        isInstallment: true,
        servicePrice: 3000,
        downPayment: 1000,
        remainingAmount: 2000,
        installments: 10,
        installmentCount: 10,
        monthlyPayment: 200,
        isPaid: false,
        paymentStatus: "partial",
    },
    {
        id: 4,
        name: "Sara Ali Mohamed",
        service: "Teeth Whitening",
        phone: "01023456789",
        date: "2025-07-18",
        time: "16:00",
        wantsInstallment: false,
        isInstallment: false,
        servicePrice: 1200,
        downPayment: 1200,
        remainingAmount: 0,
        installments: 1,
        installmentCount: 1,
        monthlyPayment: 0,
        isPaid: true,
        paymentStatus: "paid",
    },
    {
        id: 5,
        name: "Omar Mahmoud Taha",
        service: "Dental Implants",
        phone: "01087654321",
        date: "2025-07-19",
        time: "11:30",
        wantsInstallment: true,
        isInstallment: true,
        servicePrice: 5000,
        downPayment: 2000,
        remainingAmount: 3000,
        installments: 12,
        installmentCount: 12,
        monthlyPayment: 250,
        isPaid: false,
        paymentStatus: "partial",
    },
];

export const useBookingStore = create(persist((set, get) => ({

    appointments: dummyAppointments,
    filteredAppointments: dummyAppointments,
    currentFilter: "all",

    addAppointments: (appointments) => {
        const newAppointment = {
            ...appointments,
            id: appointments.length + 1,
            createdAt: new Date(),
        }
        set((state) => ({
            appointments: [...state.appointments, newAppointment],
            filteredAppointments: [...state.filteredAppointments, newAppointment]
        }))
    },

    applyFiltersAndSearch: (appointments, filter, searchTerm) => {
        let filtered = appointments;

        switch (filter) {
            case "installment":
                filtered = appointments.filter((el) => el.paymentStatus === "partial");
                break;
            case "paid":
                filtered = appointments.filter((el) => el.paymentStatus === "paid");
                break;
            default:
                filtered = appointments;
        }

        if (searchTerm) {
            filtered = filtered.filter((el) =>
                el.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    },

    filterAppointments: (filter) => {
        const { appointments, searchTerm } = get()
        const filtered = get().applyFiltersAndSearch(appointments, filter, searchTerm)
        set({ filteredAppointments: filtered, currentFilter: filter })
    },

    updatePaymentStatus: (id, status) => {
        set((state) => {
            const updatedAppointments = state.appointments.map((el) => el.id === id ? { ...el, paymentStatus: status, isPaid: status === "paid" } : el)
            const filtered = get().applyFiltersAndSearch(
                updatedAppointments, state.currentFilter, state.searchTerm
            );

            return { appointments: updatePaymentStatus, filteredAppointments: filtered }
        })
    }

})))