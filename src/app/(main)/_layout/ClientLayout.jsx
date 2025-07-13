'use client';

import React, { useState } from 'react';
import Container from '../_UI/Container';
import NavBar from '../_components/NavBar';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const pathname = usePathname();

    const hideSidebarRoutes = ['/login', '/register', '/forgot-password'];
    const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

    if (shouldHideSidebar) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {children}
            </div>
        );
    }

    const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
    const closeSideMenu = () => setIsSideMenuOpen(false);

    const mainLayoutStyle = clsx("flex h-screen w-full overflow-hidden");

    return (

        <div className={mainLayoutStyle}>
            {/* Side Menu */}
            <NavBar isOpen={isSideMenuOpen} isClose={closeSideMenu} />

            {/* Overlay (mobile only) */}
            {isSideMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSideMenu}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 z-10 relative">
                {/* Topbar (mobile only) */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <button
                        onClick={toggleSideMenu}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu />
                    </button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>

                {/* Page content */}
                <Container className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto p-4">
                        {children}
                    </div>
                </Container>

            </div>
        </div>

    );
}
