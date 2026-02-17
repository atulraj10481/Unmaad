"use client";

import Image from "next/image";
import Link from "next/link";
import { Bai_Jamjuree } from 'next/font/google';
import { useState, useEffect, useRef } from "react";
import HomeButton from "../../components/HomeButton";

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

import ShutterCard from "./ShutterCard";

const Street = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();

        const handleScroll = () => {
            if (sectionRef.current) {
                const sectionTop = sectionRef.current.offsetTop;
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;

                // Calculate how far we've scrolled into the section
                // Start increasing when section enters viewport from bottom
                const relativeScroll = scrollY + windowHeight - sectionTop;

                // Only update if we are near or in the section to avoid unnecessary updates
                if (relativeScroll > 0) {
                    setScrollOffset(relativeScroll);
                }
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
        <section ref={sectionRef} id="event" className="relative w-full flex flex-col overflow-hidden bg-[#001D4A]">

            {/* 1. Orange Theme Section (Fluid Content) */}
            <div className="relative w-full overflow-hidden">
                {/* Background Image: Orange */}
                {/* Background Image: Orange */}
                <div className="absolute inset-0 z-0 bg-[#E68D3F]">
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: "url('/unmaad-assets/hero-page/orange-bg.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "100% auto", // Fills width, maintains ratio, repeats vertically
                            backgroundPosition: "top center"
                        }}
                    />
                    {/* Pattern Overlay */}
                    <div
                        className="absolute inset-0 z-10 opacity-50 pointer-events-none"
                        style={{
                            backgroundImage: "url('/unmaad-assets/pattern.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "auto"
                        }}
                    />
                </div>

                {/* Content Layer (Relative to wrap in document flow) */}
                <div className="relative z-20 flex flex-col items-center px-4 pt-10 md:pt-16 pb-0">
                    {/* Title */}
                    <div className="flex justify-center mt-[5px] md:mt-0 mb-4 md:mb-6">
                        <h2 className="text-5xl md:text-6xl text-white font-samarkan">
                            events-street
                        </h2>
                    </div>

                    {/* Button */}
                    <div className="flex justify-center mb-12 md:mb-16">
                        <HomeButton
                            href="/pages/events-street"
                            text="Explore All Events"
                            textClassName={baiJamjuree.className}
                        />
                    </div>

                    {/* Shutters (Base rests on the bottom of this container) */}
                    <div className="flex flex-col md:grid md:grid-cols-2 md:place-items-center lg:flex lg:flex-row items-end justify-center gap-10 md:gap-y-10 md:gap-x-4 lg:gap-15 z-30 transition-all -mb-3">
                        <div className="md:order-2 lg:order-none hidden">
                            <ShutterCard posterImage="/unmaad-assets/hero-page/post1.svg" />
                        </div>
                        <div className="md:order-1 lg:order-none md:col-span-2 md:mb-0 lg:mb-0 z-10">
                            <ShutterCard posterImage="/unmaad-assets/hero-page/post2.svg" />
                        </div>
                        <div className="md:order-3 lg:order-none">
                            <ShutterCard posterImage="/unmaad-assets/hero-page/post3.svg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Grey Ground Section (Visible on all screens) */}
            <div className="relative w-full h-[15vh] md:h-[25vh] overflow-hidden">
                {/* Background Image: Grey */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/unmaad-assets/hero-page/grey-bg.png"
                        alt="Grey Background"
                        fill
                        className="object-cover"
                    />
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
                        <Image
                            src="/unmaad-assets/pattern.svg"
                            alt="Pattern Overlay"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* 3. Decorative Layer (Overlaying both Orange and Grey) */}
            <div className="block absolute bottom-0 w-full h-[15vh] md:h-[25vh] z-40 pointer-events-none overflow-visible">
                {/* Parallax Decorations */}
                <div className="absolute inset-0">
                    {/* Auto - Left (Desktop only) */}
                    <div
                        className="hidden md:block absolute bottom-[70px] left-6 md:left-12 w-36 h-36 md:w-60 md:h-60 transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(${scrollOffset * 0.4}px)` }}
                    >
                        <Image
                            src="/unmaad-assets/hero-page/auto.svg"
                            alt="Auto"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Cycle (Desktop only) */}
                    <div
                        className="hidden md:block absolute bottom-6 left-[40%] -translate-x-1/2 w-30 h-30 md:w-48 md:h-48 transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(calc(-50% - ${scrollOffset * 0.14}px))` }}
                    >
                        <Image
                            src="/unmaad-assets/hero-page/cycle.svg"
                            alt="Cycle"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Cart (Desktop only) */}
                    <div
                        className="hidden md:block absolute bottom-8 right-1/4 translate-x-1/2 w-30 h-30 md:w-48 md:h-48 transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(calc(50% - ${scrollOffset * 0.18}px))` }}
                    >
                        <Image
                            src="/unmaad-assets/hero-page/cart.svg"
                            alt="Cart"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Auto - Right (Visible on Mobile - Slides Left to Right) */}
                    <div
                        className="absolute bottom-[26px] -left-[150px] md:left-auto md:right-4 w-36 h-36 md:w-60 md:h-60 ease-out"
                        style={{ transform: `translateX(${scrollOffset * (isMobile ? 0.15 : 0.1)}px)` }}
                    >
                        <Image
                            src="/unmaad-assets/hero-page/auto.svg"
                            alt="Auto"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Grass Bushes (Desktop Loop) */}
                <div className="hidden md:flex absolute bottom-0 w-[110%] left-[-5%] z-50 justify-center -space-x-12 md:-space-x-24">
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
                                src={`/unmaad-assets/hero-page/grass${(i % 2) + 1}.svg`}
                                alt="Grass"
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Grass - Fixed Corners */}
            <div className="md:hidden">
                {/* Grass 1 - Left */}
                <div className="absolute bottom-0 left-0 w-32 h-32 z-50">
                    <Image
                        src="/unmaad-assets/hero-page/grass1.svg"
                        alt="Grass"
                        fill
                        className="object-contain"
                    />
                </div>
                {/* Grass 2 - Right */}
                <div className="absolute bottom-0 right-0 w-32 h-32 z-50">
                    <Image
                        src="/unmaad-assets/hero-page/grass2.svg"
                        alt="Grass"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Street;
