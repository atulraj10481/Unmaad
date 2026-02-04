"use client";

import Image from "next/image";
import Link from "next/link";
import { Bai_Jamjuree } from 'next/font/google';
import { useState } from "react";

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const ShutterCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative w-20 h-46 md:w-70 md:h-75 cursor-pointer overflow-hidden mx-2 transition-transform hover:scale-105"
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* Content (Behind) */}
            <div className="absolute inset-1 z-1 flex items-center justify-center">
                <div className="w-full h-full">
                    <Image
                        src="/unmaad assets/shutter1.svg"
                        alt="Event details"
                        width={300}
                        height={300}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Shutter Cover (Front) - Slides Up */}
            <div
                className={`absolute inset-1 z-0 flex items-center justify-center transition-transform duration-700 ease-in-out ${isOpen ? "-translate-y-full" : "translate-y-0"
                    }`}
            >
                <div className="w-[85%] h-[70%]">
                    <Image
                        src="/unmaad assets/shutter.svg"
                        alt="Shutter"
                        width={300}
                        height={300}
                        className="object-contain"
                    />
                </div>
            </div>

        </div>
    );
};

const EventsStreet = () => {
    return (
        <section id="event" className="relative w-full h-screen flex flex-col overflow-hidden">
            {/* Background Image: Orange (Top 70%) */}
            <div className="absolute top-0 w-full h-[80%] z-0">
                <Image
                    src="/unmaad assets/orange-bg.png"
                    alt="Orange Background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Background Image: Grey (Bottom 30%) */}
            <div className="absolute bottom-0 w-full h-[25%] z-0">
                <Image
                    src="/unmaad assets/grey-bg.png"
                    alt="Grey Background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Pattern Overlay (Overlaps both) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Image
                    src="/unmaad assets/pattern.svg"
                    alt="Pattern Overlay"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center -mt-10">
                {/* Title */}
                <h2 className="text-xl md:text-3xl text-white mb-8 font-samarkan">
                    Events Street
                </h2>


                {/* Button */}
                <Link href="#explore" className="relative group block hover:scale-105 transition-transform mb-10">
                    <Image
                        src="/unmaad assets/home-button.svg"
                        alt="Explore all event"
                        width={150}
                        height={50}
                        className="w-60 md:w-60 h-auto object-contain"
                    />
                    <span className={`absolute inset-0 flex items-center justify-center text-[#FF00A8] text-xl md:text-2xl font-bold ${baiJamjuree.className}`}>
                        Explore all event
                    </span>
                </Link>

                {/* Shutters Container */}
                <div className="flex flex-row items-center justify-center mb-15 gap-15 z-30">
                    <ShutterCard />
                    <ShutterCard />
                    <ShutterCard />
                </div>
            </div>
        </section>
    );
};

export default EventsStreet;
