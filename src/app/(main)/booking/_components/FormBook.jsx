'use client'
import { Field, Form, Formik } from 'formik'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CustomField from './CustomField'
import { ArrowLeft, ArrowRight, Calendar, Clock, CreditCard, Phone, Sparkles, User } from 'lucide-react';
import { services, useBookingStore } from '../../_store';
import { useRouter } from 'next/navigation';

export default function FormBook({ currentStep, setCurrentStep }) {
    const { addAppointments } = useBookingStore();
    const [today, setToday] = useState("");

    useEffect(() => {
        const date = new Date().toISOString().split("T")[0];
        setToday(date)
    }, [])
    const router = useRouter()
    const initialValues = {
        name: "",
        phone: "",
        service: "",
        servicePrice: 0,
        date: "",
        time: "",
        isInstallment: false,
        downPayment: 0,
        installmentCount: 2,
    };

    const serviceOptions = services.map((service) => ({
        value: service.name,
        label: `${service.name} - ${service.price} EGP`,
    }));


    const handleSubmit = useCallback(
        (values, { setSubmitting }) => {
            const selectedService = services.find((el) => el.name === values.service);
            const servicePrice = selectedService?.price || 0;

            const remainingAmount = values.isInstallment
                ? servicePrice - values.downPayment
                : 0;

            const monthlyPayment = values.isInstallment
                ? Math.ceil(remainingAmount / values.installmentCount)
                : 0;

            const appointmentData = {
                ...values,
                servicePrice,
                remainingAmount,
                monthlyPayment,
                paymentStatus: values.isInstallment ? "partial" : "paid",
            };
            addAppointments(appointmentData)
            setSubmitting(false);
            router.push("/")
        }, [])

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {(formik) => {
                    const selectedService = useMemo(
                        () => services.find((s) => s.name === formik.values.service),
                        [formik.values.service]
                    );

                    const canProceedStep1 = formik.values.name && formik.values.phone;
                    const canProceedStep2 =
                        formik.values.service && formik.values.date && formik.values.time;


                    return (
                        <Form onSubmit={formik.handleSubmit} className="space-y-8">

                            {/* Step 1 */}

                            {currentStep === 1 && (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <CustomField name="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            label="full name"
                                            icon={User}
                                            formik={formik}
                                            onChange={(e) => {
                                                formik.setFieldValue("name", e.target.value);
                                            }} />
                                        <CustomField
                                            name="phone"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            label="phone number"
                                            icon={Phone}
                                            formik={formik}
                                            onChange={(e) => {
                                                formik.setFieldValue("phone", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(2)}
                                            disabled={!canProceedStep1}
                                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            Next
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2 */}
                            {currentStep === 2 && (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    <CustomField
                                        name="service"
                                        type="select"
                                        placeholder="Choose the type of service"
                                        label="Service Type"
                                        icon={Sparkles}
                                        options={serviceOptions}
                                        formik={formik}
                                        onChange={(e) => {
                                            formik.setFieldValue("service", e.target.value);
                                        }}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <CustomField
                                            name="date"
                                            type="date"
                                            min={today}
                                            label="appointment date"
                                            icon={Calendar}
                                            formik={formik}
                                            onChange={(e) => {
                                                formik.setFieldValue("date", e.target.value);
                                            }}
                                        />
                                        <CustomField
                                            name="time"
                                            type="time"
                                            label="Appointment time"
                                            icon={Clock}
                                            formik={formik}
                                            onChange={(e) => {
                                                formik.setFieldValue("time", e.target.value);
                                            }}
                                        />
                                    </div>

                                    {selectedService && (
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                    Total cost:
                                                </span>
                                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                    {selectedService.price} EGP
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(1)}
                                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-600 to-light-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            Previous
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(3)}
                                            disabled={!canProceedStep2}
                                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            Next
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3 */}
                            {currentStep === 3 && (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    {/* Booking Summary */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                                            Booking Summary
                                        </h3>
                                        <div className="space-y-3">

                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    Name:
                                                </span>
                                                <span className="font-semibold text-gray-800 dark:text-white">
                                                    {formik.values.name || "No Name"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    Service:
                                                </span>
                                                <span className="font-semibold text-gray-800 dark:text-white">
                                                    {formik.values.service || "No Service"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    Date:
                                                </span>
                                                <span className="font-semibold text-gray-800 dark:text-white">
                                                    {formik.values.date || "No Date"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    Time:
                                                </span>
                                                <span className="font-semibold text-gray-800 dark:text-white">
                                                    {formik.values.time || "No Time"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Installment */}
                                    <div className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <Field
                                                type="checkbox"
                                                name="isInstallment"
                                                className="w-6 h-6 text-purple-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-purple-500 focus:ring-2"
                                                checked={formik.values.isInstallment}
                                                onChange={(e) =>
                                                    formik.setFieldValue(
                                                        "isInstallment",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                <CreditCard className="w-6 h-6 text-purple-600" />
                                                Need installments
                                            </span>
                                        </label>
                                    </div>
                                    {formik.values.isInstallment && (
                                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-yellow-200/50 dark:border-yellow-700/50 space-y-6">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                Installment details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <CustomField
                                                    name="installmentCount"
                                                    type="number"
                                                    min="2"
                                                    max="24"
                                                    label="Number of installments"
                                                    formik={formik}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(
                                                            "installmentCount",
                                                            e.target.value
                                                        );
                                                    }}
                                                />

                                                <CustomField
                                                    name="downPayment"
                                                    type="number"
                                                    min="100"
                                                    max={selectedService?.price || 0}
                                                    label="down payment"
                                                    formik={formik}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("downPayment", e.target.value);
                                                    }}
                                                />
                                            </div>

                                            {selectedService && formik.values.downPayment > 0 && (
                                                <div className="bg-white/70 dark:bg-gray-700/70 rounded-2xl p-4 space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 dark:text-gray-300">
                                                            Remaining amount:
                                                        </span>
                                                        <span className="font-semibold text-gray-800 dark:text-white">
                                                            {selectedService.price -
                                                                formik.values.downPayment}
                                                            EGP
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 dark:text-gray-300">
                                                            Monthly installment:
                                                        </span>
                                                        <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                            {Math.ceil(
                                                                (selectedService.price -
                                                                    formik.values.downPayment) /
                                                                formik.values.installmentCount
                                                            )}
                                                            EGP
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(2)}
                                            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                                        >
                                            السابق
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={formik.isSubmitting}
                                            className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {formik.isSubmitting ? "جاري التأكيد..." : "تأكيد الحجز"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
