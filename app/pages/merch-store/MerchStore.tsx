"use client";

import Image from "next/image";
import Footer from "../../components/Footer";
import HomeButton from "../../components/HomeButton";
import { Bai_Jamjuree } from 'next/font/google';

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const MerchStore = () => {
    return (
        <section className="w-full bg-[#001D4A] min-h-screen flex flex-col">
            {/* Title Section */}
            <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/unmaad-assets/royal-blue.png"
                        alt="Royal Blue Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
                    <Image
                        src="/unmaad-assets/pattern.svg"
                        alt="Pattern Overlay"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Title Content */}
                <div className="relative z-20 text-center">
                    <h1 className="text-5xl md:text-7xl text-white font-samarkan">
                        merch-store
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative w-full flex-grow flex flex-col justify-between overflow-hidden">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0 bg-[#001D4A]">
                    {/* Merch BG Pattern */}
                    <div
                        className="absolute inset-0 z-0 opacity-100"
                        style={{
                            backgroundImage: "url('/unmaad-assets/merch-store/merch-bg.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "60px", // Adjust size as needed for the pattern
                        }}
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

                {/* Top Strip */}
                <div className="relative z-30 w-full transform rotate-180">
                    <Image
                        src="/unmaad-assets/merch-store/blue-strip.svg"
                        alt="Blue Strip Top"
                        width={1920}
                        height={100}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Cards Container */}
                <div className="relative z-20 flex-grow flex flex-col items-center justify-center py-16 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 max-w-6xl w-full place-items-center">
                        {[1, 2, 3].map((cardId) => (
                            <div key={cardId} className="relative w-64 h-80 md:w-80 md:h-96">
                                {/* Stacked Hangers */}
                                {/* Layer 1 (Back) */}
                                <div className="absolute bottom-2 left-2 w-full h-full z-0">
                                    <Image
                                        src="/unmaad-assets/merch-store/hanger.svg"
                                        alt="Merch Hanger 1"
                                        fill
                                        className="object-contain opacity-100"
                                    />
                                </div>
                                {/* Layer 2 (Middle) */}
                                <div className="absolute bottom-1 left-1 w-full h-full z-10">
                                    <Image
                                        src="/unmaad-assets/merch-store/hanger.svg"
                                        alt="Merch Hanger 2"
                                        fill
                                        className="object-contain opacity-100"
                                    />
                                </div>
                                {/* Layer 3 (Front) */}
                                <div className="absolute inset-0 w-full h-full z-20">
                                    <Image
                                        src="/unmaad-assets/merch-store/hanger.svg"
                                        alt="Merch Hanger 3"
                                        fill
                                        className="object-contain drop-shadow-xl"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Enter the Street Button */}
                    <div className="mt-16">
                        <HomeButton
                            href="/pages/events-street"
                            text="Enter the Street"
                            textClassName={baiJamjuree.className}
                        />
                    </div>
                </div>

                {/* Bottom Strip */}
                <div className="relative z-30 w-full">
                    <Image
                        src="/unmaad-assets/merch-store/blue-strip.svg"
                        alt="Blue Strip Bottom"
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

export default MerchStore;
