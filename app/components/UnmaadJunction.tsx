"use client";

import Image from "next/image";
import Link from "next/link";
import { Bai_Jamjuree } from 'next/font/google';
import { useState, useEffect } from "react";

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const UnmaadJunction = () => {
    const [currentImage, setCurrentImage] = useState(1);
    const [prevImage, setPrevImage] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevImage(currentImage);
            setCurrentImage((prev) => (prev % 10) + 1);
        }, 4000); // 40s rotation / 10 images = 4s per image (36 degrees)

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <section id="unmaad-junction" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-10 md:py-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/unmaad assets/light-blue.png"
                    alt="Background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-50">
                <Image
                    src="/unmaad assets/pattern.svg"
                    alt="Pattern Overlay"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-center text-center px-4">

                {/* Title */}
                <h2 className="text-5xl md:text-6xl text-white mb-6 md:mb-8 font-samarkan transition-all">
                    Unmaad Junction
                </h2>

                {/* Stats */}
                <p className="text-base md:text-xl text-white mb-2 md:mb-4 font-century-gothic tracking-wider">
                    5000+ attendees | 50+ events | Since 200X
                </p>

                {/* Description */}
                <p className="text-xs md:text-sm text-white max-w-2xl mb-6 md:mb-16 font-century-gothic opacity-90">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                {/* Mandala Container */}
                <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] mb-12 md:mb-16">
                    {/* Rotating Mandala */}
                    <div className="absolute inset-0 animate-spin-slow">
                        <Image
                            src="/unmaad assets/mandala.svg"
                            alt="Mandala"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Center Images (Stationary) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-[66%] h-[66%] rounded-full overflow-hidden border-2 border-white/50 shadow-lg transition-all duration-100">
                            {/* Previous Image (Background) - Always Visible */}
                            <Image
                                src={`/unmaad assets/junction images/image${prevImage}.jpg`}
                                alt={`Memory ${prevImage}`}
                                fill
                                className="object-cover"
                                key={`prev-${prevImage}`}
                            />
                            {/* Current Image (Foreground) - Wipes In over Previous */}
                            <Image
                                src={`/unmaad assets/junction images/image${currentImage}.jpg`}
                                alt={`Memory ${currentImage}`}
                                fill
                                className="object-cover animate-clock"
                                key={`curr-${currentImage}`} // Force re-render for animation
                            />
                        </div>
                    </div>
                </div>

                {/* Button */}
                <Link href="#shops" className="relative group block hover:scale-105 transition-transform">
                    <Image
                        src="/unmaad assets/home-button.svg"
                        alt="Explore Shops"
                        width={150}
                        height={50}
                        className="w-40 md:w-60 h-auto object-contain"
                    />
                    <span className={`absolute inset-0 flex items-center justify-center text-[#FF00A8] text-xs md:text-lg font-bold font-century-gothic`}>
                        Watch Aftermovie
                    </span>
                </Link>

            </div>
        </section>
    );
};

export default UnmaadJunction;
