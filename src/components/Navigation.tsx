import { Link } from '@tanstack/react-router'

import { ReactNode } from 'react'

export function Navigation() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex gap-8 pointer-events-auto shadow-lg">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/what">What</NavLink>
                <NavLink to="/how">How</NavLink>
                <NavLink to="/why">Why</NavLink>
            </div>
        </nav>
    )
}

function NavLink({ to, children }: { to: string, children: ReactNode }) {
    return (
        <Link
            to={to}
            className="text-white/70 hover:text-white transition-colors font-medium [&.active]:text-white [&.active]:font-bold text-sm uppercase tracking-wider"
        >
            {children}
        </Link>
    )
}
