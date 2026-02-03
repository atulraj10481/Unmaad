"use client";

import Image from "next/image";
import Link from "next/link";
import { Bai_Jamjuree } from 'next/font/google';

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const UnmaadJunction = () => {
    return (
        <section id="unmaad-junction" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
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
                    src="/unmaad assets/pattern.png"
                    alt="Pattern Overlay"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-center text-center px-4">

                {/* Title */}
                <h2 className="text-4xl md:text-6xl text-white mb-4 font-samarkan">
                    Unmaad Junction
                </h2>

                {/* Stats */}
                <p className="text-xl md:text-2xl text-white mb-6 font-marines tracking-wider">
                    5000+ attendees | 50+ events | Since 200X
                </p>

                {/* Description */}
                <p className="text-sm md:text-base text-white max-w-2xl mb-12 font-century-gothic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                {/* Mandala Image */}
                <div className="relative w-100 h-100 md:w-100 md:h-100 mb-12">
                    <Image
                        src="/unmaad assets/mandala.svg"
                        alt="Mandala"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Button */}
                <Link href="#shops" className="relative group block hover:scale-105 transition-transform">
                    <Image
                        src="/unmaad assets/home-button.png"
                        alt="Explore Shops"
                        width={150}
                        height={50}
                        className="w-60 md:w-60 h-auto object-contain"
                    />
                    <span className={`absolute inset-0 flex items-center justify-center text-[#FF00A8] text-xl md:text-2xl font-bold ${baiJamjuree.className}`}>
                        Watch Aftermovie
                    </span>
                </Link>

            </div>
        </section>
    );
};

export default UnmaadJunction;
