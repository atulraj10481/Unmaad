"use client";

import React from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import HomeButton from "../../components/HomeButton";
import { Bai_Jamjuree } from 'next/font/google';

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const MerchStore = () => {
    const [isSizeChartOpen, setIsSizeChartOpen] = React.useState(false);
    const [isViewMerchOpen, setIsViewMerchOpen] = React.useState(false);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (isSizeChartOpen || isViewMerchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSizeChartOpen, isViewMerchOpen]);

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
                {/* Background Layer */}
                <div className="absolute inset-0 z-0 bg-[#001D4A]">
                    {/* Merch BG Pattern */}
                    <div
                        className="absolute inset-0 z-0 opacity-100"
                        style={{
                            backgroundImage: "url('/unmaad-assets/merch-store/merch-bg.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "30px", // Scaled down from 60px
                        }}
                    />
                    {/* Pattern Overlay - Changed to repeating background to fix "zoomed in" issue */}
                    <div
                        className="absolute inset-0 z-10 opacity-50 pointer-events-none"
                        style={{
                            backgroundImage: "url('/unmaad-assets/pattern.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "auto"
                        }}
                    />
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

                {/* Top Buttons */}
                <div className="relative z-20 w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 pt-8 px-4 flex-wrap">
                    <div onClick={() => setIsSizeChartOpen(true)}>
                        <HomeButton
                            text="Size Chart"
                            href="#" // Using onClick instead
                            imageSrc="/unmaad-assets/events-street/purple-button.svg"
                            textClassName={`uppercase ${baiJamjuree.className} text-white -translate-x-[3px] -translate-y-[3px]`}
                            shadowColor="white"
                        />
                    </div>

                    <div onClick={() => setIsViewMerchOpen(true)}>
                        <HomeButton
                            text="View Merch"
                            href="#"
                            imageSrc="/unmaad-assets/events-street/purple-button.svg"
                            textClassName={`uppercase ${baiJamjuree.className} text-white -translate-x-[3px] -translate-y-[3px]`}
                            shadowColor="white"
                        />
                    </div>

                    <div>
                        <HomeButton
                            text="Buy Merch"
                            href="#"
                            imageSrc="/unmaad-assets/events-street/purple-button.svg"
                            textClassName={`uppercase ${baiJamjuree.className} text-white -translate-x-[3px] -translate-y-[3px]`}
                            shadowColor="white"
                        />
                    </div>
                </div>

                {/* Cards Container */}
                <div className="relative z-20 flex-grow flex flex-col items-center justify-center py-8 px-4">
                    <div className="relative w-full max-w-7xl flex justify-center items-center">
                        <Image
                            src="/unmaad-assets/merch-store/merch.svg"
                            alt="Merch"
                            width={1800}
                            height={1800}
                            className="w-[150%] sm:w-[130%] md:w-[125%] lg:w-full max-w-none lg:max-w-7xl h-auto object-contain"
                        />
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

            {/* Size Chart Modal */}
            {isSizeChartOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsSizeChartOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-[90%] md:w-full max-w-3xl h-[50vh] md:h-[70vh] rounded-lg shadow-2xl overflow-hidden flex flex-col translate-y-[10px]">
                        {/* Background Layer */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/unmaad-assets/royal-blue.png"
                                alt="Royal Blue Background"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
                            <Image
                                src="/unmaad-assets/pattern.svg"
                                alt="Pattern Overlay"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsSizeChartOpen(false)}
                            className="absolute top-2 right-2 md:top-4 md:right-4 z-20 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Content Container */}
                        <div className="relative z-10 w-full h-full p-8 md:p-12 flex items-center justify-center">
                            <iframe
                                src="/unmaad-assets/merch-store/size-chart.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                                className="w-full h-full rounded bg-transparent"
                                title="Size Chart"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* View Merch Modal */}
            {isViewMerchOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsViewMerchOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-[90%] md:w-full max-w-3xl h-[50vh] md:h-[70vh] rounded-lg shadow-2xl overflow-hidden flex flex-col translate-y-[10px]">
                        {/* Background Layer */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/unmaad-assets/royal-blue.png"
                                alt="Royal Blue Background"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
                            <Image
                                src="/unmaad-assets/pattern.svg"
                                alt="Pattern Overlay"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsViewMerchOpen(false)}
                            className="absolute top-2 right-2 md:top-4 md:right-4 z-20 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Content Container */}
                        <div className="relative z-10 w-full h-full p-8 md:p-12 flex items-center justify-center">
                            <iframe
                                src="/unmaad-assets/merch-store/unmaad-merch.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                                className="w-full h-full rounded bg-transparent"
                                title="View Merch"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MerchStore;
