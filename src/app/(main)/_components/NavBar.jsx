'use client';

import { useLinks } from '../_store';
import clsx from 'clsx';
import { CircleX } from 'lucide-react';
import Link from 'next/link';

export default function NavBar({ isOpen, isClose }) {
    const { links } = useLinks();

    const sideMenuStyle = clsx(
        // base styles
        "w-[200px] sm:w-[250px] h-full flex flex-col gap-4 p-4",
        "border-r border-slate-100/20 dark:border-gray-700/50",
        "bg-white dark:bg-gray-900",
        "transition-transform duration-300 ease-in-out",

        // Desktop styles
        "lg:translate-x-0 lg:static lg:z-auto",

        // Mobile styles
        "fixed top-0 left-0 z-50 lg:relative",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    );

    return (
        <div className={sideMenuStyle}>
            <div className="flex items-center justify-between lg:hidden mb-4">
                <h1 className="text-xl font-bold">Menu</h1>
                <button
                    onClick={isClose}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close menu"
                >
                    <CircleX />
                </button>
            </div>

            <div className="hidden lg:flex flex-col gap-4">
                <h1 className="text-2xl font-bold">SideMenu</h1>
            </div>
            <div className="flex flex-col justify-between h-full">

                <nav className="flex flex-col gap-4 mt-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <div key={link.id} className="flex items-center gap-2">
                                <Icon className="w-5 h-5" />
                                <Link href={link.path} className="w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{link.name}</Link>
                            </div>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-2 mt-4">
                    <Link
                        href="/login"
                        className="w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
