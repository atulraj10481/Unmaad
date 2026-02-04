"use client";

import Image from "next/image";
import Link from "next/link";
import { Bai_Jamjuree } from 'next/font/google';
import { useState, useEffect } from "react";

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

import ShutterCard from "./ShutterCard";

const EventsStreet = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();

        const handleScroll = () => {
            if (window.innerWidth >= 768) {
                setScrollOffset(window.scrollY);
            }
        };

        window.addEventListener("resize", checkMobile);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section id="event" className="relative w-full h-auto min-h-screen md:h-[120vh] flex flex-col overflow-hidden bg-[#001D4A]">
            {/* Background Image: Orange (100% on mobile, Top 95vh on desktop) */}
            <div className="absolute top-0 w-full h-full md:h-[95vh] z-0 overflow-hidden">
                <Image
                    src="/unmaad assets/orange-bg.png"
                    alt="Orange Background"
                    fill
                    className="object-cover"
                />
                {/* Pattern Overlay for Orange Section */}
                <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
                    <Image
                        src="/unmaad assets/pattern.svg"
                        alt="Pattern Overlay"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Background Image: Grey (Bottom 25vh) - Hidden on Mobile */}
            <div className="hidden md:block absolute bottom-0 w-full h-[25vh] z-0 overflow-hidden">
                <Image
                    src="/unmaad assets/grey-bg.png"
                    alt="Grey Background"
                    fill
                    className="object-cover"
                />
                {/* Pattern Overlay for Grey Section */}
                <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
                    <Image
                        src="/unmaad assets/pattern.svg"
                        alt="Pattern Overlay"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Grass Bushes at the bottom edge - Overlapping and larger */}
            <div className="absolute bottom-0 w-[110%] left-[-5%] z-50 flex justify-center -space-x-24 pointer-events-none">
                {[...Array(14)].map((_, i) => (
                    <div
                        key={i}
                        className={`relative w-48 h-48 md:w-64 md:h-64 -mb-16 md:-mb-24`}
                        style={{
                            transform: `translateX(${(i % 3 - 1) * 20}px) translateY(${(i % 2) * 10}px)`,
                            zIndex: i % 2
                        }}
                    >
                        <Image
                            src={`/unmaad assets/grass${(i % 2) + 1}.svg`}
                            alt="Grass"
                            fill
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Content Layer - Strict Hierarchy: Title -> Button -> Shutters -> Grass */}
            <div className="relative z-20 flex flex-col min-h-screen md:absolute md:inset-0 pointer-events-none">
                {/* 1. Title (at the top) */}
                <div className="pt-10 md:pt-12 flex justify-center pointer-events-auto">
                    <h2 className="text-3xl md:text-6xl text-white font-samarkan">
                        Events Street
                    </h2>
                </div>

                {/* 2. Button (below title) */}
                <div className="pt-4 md:pt-6 flex justify-center pointer-events-auto">
                    <Link href="#explore" className="relative group block hover:scale-105 transition-transform">
                        <Image
                            src="/unmaad assets/home-button.svg"
                            alt="Explore all event"
                            width={150}
                            height={50}
                            className="w-40 md:w-60 h-auto object-contain"
                        />
                        <span className={`absolute inset-0 flex items-center justify-center text-[#FF00A8] text-sm md:text-2xl font-bold ${baiJamjuree.className}`}>
                            Explore all event
                        </span>
                    </Link>
                </div>

                {/* 3. Shutters (Base touches grey part) */}
                {/* On mobile: Stacked in a column with space. On desktop: Absolute at 95vh height. */}
                <div className="mt-12 mb-20 md:mt-0 md:mb-0 md:absolute md:top-[95vh] md:left-0 md:w-full md:-translate-y-full flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-15 z-30 pointer-events-auto">
                    <ShutterCard />
                    <ShutterCard />
                    <ShutterCard />
                </div>
            </div>

            {/* 4. Grass Bushes (Stuck to bottom base) - Hidden on Mobile */}
            <div className="hidden md:flex absolute bottom-0 w-[110%] left-[-5%] z-50 justify-center -space-x-12 md:-space-x-24 pointer-events-none">
                {[...Array(isMobile ? 8 : 14)].map((_, i) => (
                    <div
                        key={i}
                        className={`relative w-32 h-32 md:w-64 md:h-64 -mb-8 md:-mb-24`}
                        style={{
                            transform: `translateX(${(i % 3 - 1) * 20}px) translateY(${(i % 2) * 10}px)`,
                            zIndex: i % 2
                        }}
                    >
                        <Image
                            src={`/unmaad assets/grass${(i % 2) + 1}.svg`}
                            alt="Grass"
                            fill
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Parallax Decorations (Behind Grass, Above Shutters) - Hidden on Mobile */}
            <div className="hidden md:block absolute inset-0 z-40 pointer-events-none">
                <div className="absolute bottom-0 w-full h-[25%]">
                    {/* Auto - Left (Moves Right) */}
                    <div
                        className="absolute bottom-[70px] left-6 md:left-12 w-36 h-36 md:w-60 md:h-60 transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(${scrollOffset * 0.4}px)` }}
                    >
                        <Image
                            src="/unmaad assets/auto.svg"
                            alt="Auto"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Cycle - Middle Left (Moves Left) */}
                    <div
                        className="absolute bottom-6 left-[40%] -translate-x-1/2 w-30 h-30 md:w-48 md:h-48 transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(calc(-50% - ${scrollOffset * 0.14}px))` }}
                    >
                        <Image
                            src="/unmaad assets/cycle.svg"
                            alt="Cycle"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Cart - Middle Right (Moves Left) */}
                    <div
                        className="absolute bottom-8 right-1/4 translate-x-1/2 w-30 h-30 md:w-48 md:h-48 transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(calc(50% - ${scrollOffset * 0.18}px))` }}
                    >
                        <Image
                            src="/unmaad assets/cart.svg"
                            alt="Cart"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Auto - Right (Moves Right) */}
                    <div
                        className="absolute bottom-[26px] right-2 md:right-4 w-36 h-36 md:w-60 md:h-60 transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(${scrollOffset * 0.1}px)` }}
                    >
                        <Image
                            src="/unmaad assets/auto.svg"
                            alt="Auto"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsStreet;
