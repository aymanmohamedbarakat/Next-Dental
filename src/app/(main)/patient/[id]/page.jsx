'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useBookingStore } from '../../dashboard/_store'
import { ArrowLeft, Calendar, CheckCircle, Clock, CreditCard, DollarSign, FileText, Phone, Printer, User, X } from 'lucide-react'
import { getStatusBadge } from '../../dashboard/_utils/Helpers'

export default function PatientDetails() {
    const router = useRouter()

    const params = useParams()
    const id = params.id
    const { appointments, updatePaymentStatus } = useBookingStore()
    const [showInvoice, setShowInvoice] = useState(true);

    const PatientDetails = appointments.find((el) => el.id === parseInt(id))
    // useEffect(() => { console.log(PatientDetails) }, [])

    const handlePaymentStatusUpdate = useCallback((newStatus) => {
        if (updatePaymentStatus) {
            updatePaymentStatus(parseInt(id), newStatus)
        }
    }, [id, updatePaymentStatus])

    const handleBack = useCallback(() => {
        router.push("/dashboard");
    }, [router]);


    const handlePrintInvoice = useCallback(() => {
        setShowInvoice(true);
    }, []);

    const handlePrintInvoiceShow = useCallback(() => {
        setShowInvoice(true);
        setTimeout(() => {
            window.print();
            setShowInvoice(false);
        }, 100);
    }, []);


    if (!PatientDetails) {
        return (
            <div
                className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4"
            >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Patient not present
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The requested patient data was not found.              </p>
                    <button
                        onClick={handleBack}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to the control panel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6 print:hidden">
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    ><ArrowLeft className="w-5 h-5" /></button>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                            Patient Details
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {PatientDetails.name}
                        </p>
                    </div>
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    Patient Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                                                {PatientDetails.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Patient Name
                                            </p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {PatientDetails.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Phone Number
                                            </p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {PatientDetails.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Appointment date
                                            </p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {PatientDetails.date}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Appointment time
                                            </p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {PatientDetails.time}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* Service Details Card - Fixed */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    Service details
                                </h2>
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                                    <h3 className="font-semibold text-xl text-blue-600 dark:text-blue-400 mb-6">
                                        {PatientDetails.service}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                Full Price
                                            </p>
                                            <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                                                {PatientDetails.servicePrice}
                                            </p>
                                        </div>

                                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                Amount Paid
                                            </p>
                                            <p className="font-bold text-lg text-green-600 dark:text-green-400">
                                                {PatientDetails.downPayment}
                                            </p>
                                        </div>

                                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <CreditCard className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                Remaining Amount
                                            </p>
                                            <p className="font-bold text-lg text-orange-600 dark:text-orange-400">
                                                {PatientDetails.remainingAmount}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Installment Details */}
                        <div className="max-w-4xl mx-auto p-6">
                            {PatientDetails.isInstallment && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Installment Details
                                        </h2>
                                    </div>

                                    <div className="p-6">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            #
                                                        </th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Amount
                                                        </th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Due Date
                                                        </th>
                                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from(
                                                        {
                                                            length: PatientDetails.installmentCount || PatientDetails.installments,
                                                        },
                                                        (_, index) => {
                                                            const dueDate = new Date(PatientDetails.date);
                                                            dueDate.setMonth(dueDate.getMonth() + index + 1);

                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                                >
                                                                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">
                                                                        {index + 1}
                                                                    </td>
                                                                    <td className="py-4 px-4 text-gray-900 dark:text-white font-semibold">
                                                                        {PatientDetails.monthlyPayment}
                                                                    </td>
                                                                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                                                                        {dueDate.toLocaleDateString('en-GB')}
                                                                    </td>
                                                                    <td className="py-4 px-4">
                                                                        <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 rounded">
                                                                            Pending
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Action Panel - Fixed */}
                    <div className="space-y-6">
                        {/* Payment Status Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Payment status
                                </h2>
                                <div className="text-center mb-6">
                                    {getStatusBadge(PatientDetails.paymentStatus)}
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => handlePaymentStatusUpdate("paid")}
                                        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${PatientDetails.paymentStatus === "paid"
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                                            : "bg-green-600 text-white hover:bg-green-700"
                                            }`}
                                        disabled={PatientDetails.paymentStatus === "paid"}
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Register as fully paid
                                    </button>

                                    <button
                                        onClick={() => handlePaymentStatusUpdate("partial")}
                                        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${PatientDetails.paymentStatus === "partial"
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                                            : "bg-orange-600 text-white hover:bg-orange-700"
                                            }`}
                                        disabled={PatientDetails.paymentStatus === "partial"}
                                    >
                                        <Clock className="w-4 h-4" />
                                        Register as incomplete
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    procedures
                                </h2>
                                <div className="space-y-3">
                                    <button
                                        onClick={handlePrintInvoice}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Printer className="w-4 h-4" />
                                        Print invoice
                                    </button>
                                    <button
                                        onClick={handleBack}
                                        className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to the control panel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Print Invoice Section */}
                {showInvoice && (
                    <div className="print:block print-area">
                        <div className="bg-white text-black p-8 max-w-[600px] mx-auto shadow-lg print:shadow-none print:max-w-none">
                            {/* Header */}
                            <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                                <h1 className="text-4xl font-bold mb-2 text-gray-900">
                                    Dental Clinic
                                </h1>
                                <p className="text-lg text-gray-600">Payment Invoice</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Invoice #INV-{new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, '0')}-{String(new Date().getDate()).padStart(2, '0')}
                                </p>
                            </div>

                            {/* Patient & Invoice Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
                                        Patient Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex">
                                            <span className="font-medium text-gray-700 w-16">Name:</span>
                                            <span className="text-gray-900">{PatientDetails.name}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="font-medium text-gray-700 w-16">Phone:</span>
                                            <span className="text-gray-900">{PatientDetails.phone}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="font-medium text-gray-700 w-16">Date:</span>
                                            <span className="text-gray-900">{PatientDetails.date}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="font-medium text-gray-700 w-16">Time:</span>
                                            <span className="text-gray-900">{PatientDetails.time}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
                                        Service Details
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex">
                                            <span className="font-medium text-gray-700 w-20">Service:</span>
                                            <span className="text-gray-900">{PatientDetails.service}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="font-medium text-gray-700 w-20">Total:</span>
                                            <span className="text-gray-900 font-semibold">{PatientDetails.servicePrice}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="font-medium text-gray-700 w-20">Paid:</span>
                                            <span className="text-green-600 font-semibold">{PatientDetails.downPayment}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="font-medium text-gray-700 w-20">Balance:</span>
                                            <span className="text-orange-600 font-semibold">{PatientDetails.remainingAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Installment Schedule */}
                            {PatientDetails.isInstallment && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
                                        Payment Schedule
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                                                        Payment #
                                                    </th>
                                                    <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                                                        Amount
                                                    </th>
                                                    <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                                                        Due Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from(
                                                    {
                                                        length: PatientDetails.installmentCount || PatientDetails.installments,
                                                    },
                                                    (_, index) => {
                                                        const dueDate = new Date(PatientDetails.date);
                                                        dueDate.setMonth(dueDate.getMonth() + index + 1);

                                                        return (
                                                            <tr key={index} className="hover:bg-gray-50">
                                                                <td className="border border-gray-300 p-3 text-gray-900 font-medium">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="border border-gray-300 p-3 text-gray-900 font-semibold">
                                                                    {PatientDetails.monthlyPayment}
                                                                </td>
                                                                <td className="border border-gray-300 p-3 text-gray-900">
                                                                    {dueDate.toLocaleDateString('en-GB', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric'
                                                                    })}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="border-t-2 border-gray-200 pt-6 mt-8">
                                <div className="text-center space-y-2">
                                    <p className="text-gray-700 font-medium">
                                        Thank you for choosing our dental clinic
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        For questions about your invoice, please contact us at (+20) 1234657890
                                    </p>
                                    <p className="text-xs text-gray-400 mt-4">
                                        Invoice generated on: {new Date().toLocaleDateString("en-GB")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-center mt-6 gap-4 print:hidden">
                    <button
                        onClick={handlePrintInvoiceShow}
                        className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 ${showInvoice ? "block" : "hidden"}`}
                    >
                        <Printer className="w-5 h-5" />
                        Print Invoice
                    </button>

                    <button
                        onClick={() => setShowInvoice(false)}
                        className={`bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 ${showInvoice ? "block" : "hidden"}`}
                    >
                        <X className="w-5 h-5" />
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    )
}
