"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Unmaad Junction", href: "#unmaad-junction" },
        { name: "Events Street", href: "#event" },
        { name: "Competitions Bazaar", href: "#competition" },
        { name: "Merch Store", href: "#merch" },
        { name: "Sponsor Alley", href: "#sponsor" },
        { name: "Contact Spot", href: "#contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Left: Logo */}
                    <div className="shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/unmaad assets/unm.svg"
                                alt="Unmaad Logo"
                                width={150}
                                height={50}
                                className="h-7 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Center: Desktop Menu */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 font-century-gothic"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: Ticket Button */}
                    <div className="hidden md:block shrink-0">
                        <Link href="#tickets">
                            <Image
                                src="/unmaad assets/tic-button.svg"
                                alt="Get Tickets"
                                width={120}
                                height={40}
                                className="h-8 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/20 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-md" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-indigo-500 hover:text-indigo-900 block px-3 py-2 rounded-md text-base font-medium font-century-gothic"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mt-4 px-3">
                            <Image
                                src="/unmaad assets/ticket-button.png"
                                alt="Get Tickets"
                                width={120}
                                height={40}
                                className="h-8 w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
