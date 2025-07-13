'use-client'
import { BookCheckIcon, Clock, LayoutDashboardIcon, Phone, } from "lucide-react";
import { create } from "zustand";

export const useLinks = create((set) => ({

  links: [
    { id: 1, name: "Home", path: "/", icon: LayoutDashboardIcon },
    { id: 2, name: "Booking", path: "/booking", icon: BookCheckIcon },
    { id: 3, name: "Appointments", path: "/appointments", icon: Clock },
  ],

  setLinks: (li) => set(() => ({ links: li }))
}))

