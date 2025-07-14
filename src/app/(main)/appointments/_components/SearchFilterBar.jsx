'use client'
import { Filter, Search } from 'lucide-react'
import React, { useState } from 'react'
import { useBookingStore } from '../../_store';

export default function SearchFilterBar() {
    const { searchAndFilter, currentFilter, searchTerm } = useBookingStore();
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");
    const [filterStatus, setFilterStatus] = useState(currentFilter || "all");

    const handleSearch = (e) => {
        const value = e.target.value;
        setLocalSearchTerm(value);
        searchAndFilter(value, filterStatus);
    };

    const handleFilter = (e) => {
        const value = e.target.value;
        setFilterStatus(value);
        searchAndFilter(localSearchTerm, value);
    };
    return (
        <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or service..."
                        value={localSearchTerm}
                        onChange={handleSearch}
                        className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                        value={filterStatus}
                        onChange={handleFilter}
                        className="pr-12 sm:w-full pl-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                    >
                        <option value="all"> All cases </option>
                        <option value="paid">paid  </option>
                        <option value="installment"> installment </option>
                    </select>
                </div>
            </div>
        </div>
    )
}
