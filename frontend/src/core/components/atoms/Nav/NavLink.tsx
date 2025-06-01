import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';

const NavLink = ({ children, className = '', ...props }: NavLinkProps) => {
    return (
        <RouterNavLink
            {...props}
            className={({ isActive }) => {
                let baseClasses = ''
                if (typeof className === "string") {
                    baseClasses = className.trim();
                }
                const activeClasses = 'text-blue-500 ';
                const inactiveClasses = 'text-black';

                // Combine them carefully:
                return `${baseClasses} flex p-2 gap-2 outline-none ${isActive ? activeClasses : inactiveClasses}`.trim();
            }}
        >
            {children}
        </RouterNavLink>
    );
};

export default NavLink;
