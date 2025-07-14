import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { services } from '../../_store';
import { ArrowDown, ArrowDownFromLine, CheckCircle, FilterIcon } from 'lucide-react';
import { IoIosArrowDown } from "react-icons/io";
export default function CustomField({ name, type = "text", placeholder, icon: Icon, min, max, options, formik, label, ...props }) {
    const hasError = formik.touched[name] && formik.errors[name];
    const hasValue = formik.values[name];
    const isValid = formik.touched[name] && !formik.errors[name] && hasValue;

    if (type === "select") {
        return (
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {Icon && <Icon className="w-5 h-5 text-purple-600" />}
                    {label}
                </label>
                <div className="relative">
                    <Field
                        as="select"
                        name={name}
                        className={`w-full pl-12 pr-10 py-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-2xl appearance-none transition-all duration-300  ${hasError
                            ? "border-red-500 bg-red-50/50"
                            : "border-gray-200 dark:border-gray-600"
                            }`}
                        onChange={(e) => {
                            if (name === "service") {
                                const selectedService = services.find(
                                    (el) => el.name === e.target.value
                                );
                                formik.setFieldValue("service", e.target.value);
                                formik.setFieldValue("servicePrice", selectedService?.price || 0);
                            } else {
                                formik.setFieldValue(name, e.target.value);
                            }
                        }}
                        {...props}
                    >
                        <option value="">{placeholder}</option>
                        {options?.map((el) => (
                            <option key={el.value} value={el.value} className='dark:bg-gray-700'>
                                {el.label}
                            </option>
                        ))}
                    </Field>

                    {/* dropdown arrow icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <IoIosArrowDown />
                    </div>
                </div>

                <ErrorMessage
                    name={name}
                    component="p"
                    className="text-red-500 text-sm mt-1 animate-in slide-in-from-top-1"
                />
            </div>

        )
    }
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {Icon && <Icon className="w-5 h-5 text-purple-600" />}
                {label}
            </label>
            <div className="relative">
                <Field
                    type={type}
                    name={name}
                    min={min}
                    max={max}
                    className={`w-full px-4 py-4 bg-gray-50/50 dark:bg-gray-700/50 border-2 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 ${hasError
                        ? "border-red-500 bg-red-50/50"
                        : "border-gray-200 dark:border-gray-600 focus:border-purple-500"
                        }`}
                    placeholder={placeholder}
                    onChange={(e) => formik.setFieldValue(name, e.target.value)}
                    value={formik.values[name] || ""}
                    {...props}
                />
                {isValid && (
                    <CheckCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
            </div>
            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-sm mt-1 animate-in slide-in-from-top-1"
            />
        </div>
    );
}
