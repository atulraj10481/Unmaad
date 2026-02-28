"use client";

import Image from "next/image";
import Footer from "../../components/Footer";

type Sponsor = { name: string; title?: string; logo: string; scale?: string };

const TOP_SPONSORS: Sponsor[] = [
    { name: "CBI", title: "Associate Partner", logo: "CBI.png" },
    { name: "SBI", title: "General Sponsor", logo: "SBI.svg" }
];

const PRONITES: Sponsor[] = [
    { name: "Flipkart Minutes", title: "Pronight Sponsor - Seedhe Maut", logo: "Flipkart Minutes.svg" },
    { name: "ACT Fibrenet", title: "Pronight Sponsor - Gajendra Verma", logo: "ACT_Fibernet.svg" }
];

const TITLED_SPONSORS: Sponsor[] = [
    { name: "Wictronix", title: "Digital Solutions Partner", logo: "wxblack.svg", scale: "scale-125" },
    { name: "Campus Express", title: "Student Mobility Partner", logo: "CX_POSTER_REC_LOGO.svg", scale: "scale-150" },
    { name: "Campa", title: "Official Beverages Partner", logo: "campa_energy.svg" },
    { name: "Plum", title: "Bath & Body Partner", logo: "Plum.svg" },
    { name: "MTV", title: "Youth Partner", logo: "MTV.svg" },
    { name: "Klook", title: "Travel Experience Partner", logo: "klook-seeklogo.png" },
    { name: "Axis Bank", title: "Event Sponsor - General Quiz", logo: "Axis Bank Logo Burgundy.jpg.svg" },
    { name: "Kotak", title: "Event Sponsor - Footloose", logo: "kotak_mahindra_bank.svg" }
];

const UNTITLED_SPONSORS: Sponsor[] = [
    { name: "Mykos", logo: "mykos logo.svg", scale: "scale-[2.5]" },
    { name: "Aylence", logo: "Aylence 1.svg" },
    { name: "Avvatar", logo: "Avvatar Logo White.svg" },
    { name: "Pokemon GO", logo: "PokemonGO.svg" },
    { name: "Bistro", logo: "bistro.svg" },
    { name: "Delhivery", logo: "Delhivery.png" },
    { name: "Amul", logo: "Amul-Taste-of-India-Logo.svg" },
    { name: "Cherrysh", logo: "cherrysh.svg" },
    { name: "Apple Store Imagine", logo: "imagine.svg" },
    { name: "Fun88", logo: "Fun88 Logo.svg" }
];

const SponsorCard = ({ logo, title, name, width = 300, height = 300, isLargeTitle = false, scale = "" }: { logo: string, title?: string, name: string, width?: number, height?: number, isLargeTitle?: boolean, scale?: string }) => {
    return (
        <div className="flex flex-col items-center w-full max-w-[380px]">
            {title && (
                <div className="mb-6 flex items-end justify-center min-h-[80px] w-full px-4">
                    <h3 className={`${isLargeTitle ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'} text-white font-samarkan text-center leading-relaxed whitespace-pre-wrap break-words drop-shadow-md`}>
                        {title}
                    </h3>
                </div>
            )}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center p-8 transition-transform hover:scale-105 duration-300">
                <Image
                    src="/unmaad-assets/sponsor-alley/green-frame.svg"
                    alt="Frame"
                    fill
                    className="object-contain"
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4">
                    <Image
                        src={`/unmaad-assets/sponsor-alley/${logo}`}
                        alt={`${name} Logo`}
                        width={width}
                        height={height}
                        className={`object-contain w-auto h-auto max-w-[75%] max-h-[75%] drop-shadow-md ${scale}`}
                    />
                </div>
            </div>
        </div>
    );
};

const SponsorAlley = () => {
    return (
        <section className="w-full bg-[#E6E6FA] min-h-screen flex flex-col items-center overflow-x-hidden">
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

                {/* Main Sponsors Content */}
                <div className="relative w-full py-20 px-4 min-h-screen">
                    {/* Background & Overlay */}
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
                    <div className="relative z-20 flex flex-col items-center max-w-7xl mx-auto w-full gap-24">

                        {/* 1. TOP SPONSORS (CBI & SBI) */}
                        <div className="w-full flex flex-wrap justify-center items-end gap-12 md:gap-24">
                            {TOP_SPONSORS.map((s, i) => (
                                <SponsorCard key={i} name={s.name} title={s.title} logo={s.logo} scale={s.scale} isLargeTitle />
                            ))}
                        </div>

                        {/* 2. PRONITES */}
                        <div className="w-full flex flex-wrap justify-center items-end gap-12 md:gap-24">
                            {PRONITES.map((s, i) => (
                                <SponsorCard key={i} name={s.name} title={s.title} logo={s.logo} scale={s.scale} isLargeTitle />
                            ))}
                        </div>

                        {/* 3. TITLED SPONSORS */}
                        <div className="w-full flex flex-wrap justify-center items-end gap-10 md:gap-16">
                            {TITLED_SPONSORS.map((s, i) => (
                                <SponsorCard key={i} name={s.name} title={s.title} logo={s.logo} scale={s.scale} />
                            ))}
                        </div>

                        {/* 4. UNTITLED SPONSORS */}
                        <div className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-10">
                            {UNTITLED_SPONSORS.map((s, i) => (
                                <SponsorCard key={i} name={s.name} logo={s.logo} scale={s.scale} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Strip */}
                <div className="relative z-30 w-full bg-[#E6E6FA] mt-auto">
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
