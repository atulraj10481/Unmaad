"use client";

import Image from "next/image";
import Footer from "../../components/Footer";
import HomeButton from "../../components/HomeButton";
import { Bai_Jamjuree } from 'next/font/google';

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const SponsorAlley = () => {
    return (
        <section className="w-full bg-[#E6E6FA] min-h-screen flex flex-col">
            {/* Title Section */}
            <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/unmaad-assets/royal-blue.png"
                        alt="Royal Blue Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
                    <Image
                        src="/unmaad-assets/pattern.svg"
                        alt="Pattern Overlay"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-20 text-center">
                    <h1 className="text-5xl md:text-7xl text-white font-samarkan">
                        sponsor-alley
                    </h1>
                </div>
            </div>

            {/* Content Section Container */}
            <div className="relative w-full flex-grow flex flex-col">

                {/* Top Strip */}
                <div className="relative z-30 w-full transform rotate-180 bg-[#E6E6FA]">
                    <Image
                        src="/unmaad-assets/sponsor-alley/sponsor-strip.svg"
                        alt="Sponsor Strip Top"
                        width={1920}
                        height={100}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Title Partner Section */}
                <div className="relative w-full py-10 px-4">
                    {/* Background & Overlay for Title Partner */}
                    <div className="absolute inset-0 z-0 bg-[#E6E6FA]">
                        <div
                            className="absolute inset-0 z-0 opacity-100"
                            style={{
                                backgroundImage: "url('/unmaad-assets/sponsor-alley/lavender-bg.svg')",
                                backgroundRepeat: "repeat",
                                backgroundSize: "100% auto",
                            }}
                        />
                        <div
                            className="absolute inset-0 z-10 opacity-50 pointer-events-none"
                            style={{
                                backgroundImage: "url('/unmaad-assets/pattern.svg')",
                                backgroundRepeat: "repeat",
                                backgroundSize: "auto"
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-6xl text-white font-samarkan mb-12 text-center">
                            Title Partner
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full place-items-center mb-16">
                            {[1, 2, 3].map((cardId) => (
                                <div key={cardId} className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
                                    <Image
                                        src="/unmaad-assets/sponsor-alley/green-frame.svg"
                                        alt="Sponsor Frame"
                                        fill
                                        className="object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center p-12">
                                        <span className={`text-black opacity-50 ${baiJamjuree.className}`}>Sponsor Logo</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Associate Partner Section */}
                <div className="relative w-full py-10 px-4">
                    {/* Background & Overlay for Associate Partner */}
                    <div className="absolute inset-0 z-0 bg-[#E6E6FA]">
                        <div
                            className="absolute inset-0 z-0 opacity-100"
                            style={{
                                backgroundImage: "url('/unmaad-assets/sponsor-alley/lavender-bg.svg')",
                                backgroundRepeat: "repeat",
                                backgroundSize: "100% auto",
                            }}
                        />
                        <div
                            className="absolute inset-0 z-10 opacity-50 pointer-events-none"
                            style={{
                                backgroundImage: "url('/unmaad-assets/pattern.svg')",
                                backgroundRepeat: "repeat",
                                backgroundSize: "auto"
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-6xl text-white font-samarkan mb-12 text-center">
                            Associate Partner
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full place-items-center mb-16">
                            {[1, 2, 3].map((cardId) => (
                                <div key={cardId} className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
                                    <Image
                                        src="/unmaad-assets/sponsor-alley/green-frame.svg"
                                        alt="Sponsor Frame"
                                        fill
                                        className="object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center p-12">
                                        <span className={`text-black opacity-50 ${baiJamjuree.className}`}>Sponsor Logo</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Enter the Street Button */}
                        <div className="mt-8 mb-8">
                            <HomeButton
                                href="/pages/events-street"
                                text="Enter the street"
                                textClassName={baiJamjuree.className}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Strip */}
                <div className="relative z-30 w-full bg-[#E6E6FA]">
                    <Image
                        src="/unmaad-assets/sponsor-alley/sponsor-strip.svg"
                        alt="Sponsor Strip Bottom"
                        width={1920}
                        height={100}
                        className="w-full h-auto object-cover block"
                    />
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default SponsorAlley;
