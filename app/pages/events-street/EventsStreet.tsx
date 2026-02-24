"use client";

import Image from "next/image";
import { useState } from "react";
import { Bai_Jamjuree } from 'next/font/google';
import { motion } from "framer-motion";
import HomeButton from "../../components/HomeButton";

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const EventsStreet = () => {
    const [activeTab, setActiveTab] = useState("Proshows");
    return (
        <section className="w-full bg-[#001D4A]">
            {/* ... existing code ... */}
            <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
                {/* ... existing code ... */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/unmaad-assets/royal-blue.png"
                        alt="Royal Blue Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                {/* ... existing code ... */}
                <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
                    <Image
                        src="/unmaad-assets/pattern.svg"
                        alt="Pattern Overlay"
                        fill
                        className="object-cover"
                    />
                </div>
                {/* ... existing code ... */}
                <div className="relative z-20 text-center">
                    <h1 className="text-5xl md:text-7xl text-white font-samarkan">
                        events-street
                    </h1>
                </div>
            </div>

            {/* Mandala Section */}
            <div className="relative w-full min-h-[40vh] flex flex-col justify-between overflow-hidden">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/unmaad-assets/events-street/pink-bg.png"
                        alt="Pink Background"
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

                {/* Top Strip */}
                <div className="relative z-30 w-full transform rotate-180">
                    <div className="relative w-full z-20">
                        <Image
                            src="/unmaad-assets/events-street/mandala-strip.svg"
                            alt="Mandala Strip Top"
                            width={1920}
                            height={100}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Content Area - Buttons & Cards */}
                <div className="relative z-20 flex-grow flex flex-col items-center justify-center py-10 gap-10 px-4">

                    {/* Buttons Row - Overlapping Top Strip */}
                    {/* Buttons Row - Overlapping Top Strip */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap md:grid md:grid-cols-2 md:place-items-center lg:flex lg:flex-nowrap items-center justify-center gap-4 md:gap-y-8 lg:gap-y-12 md:gap-x-24 relative z-10 w-full max-w-6xl mx-auto mb-[38px] md:mb-16">
                        {["Proshows", "Comedy + poetry", "Jam nights"].map((text, index) => (
                            <div key={index} className={`relative flex flex-col items-center ${index === 2 ? 'md:col-span-2' : ''}`}>
                                {/* Branch Decoration - Scattered & Behind */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 3, duration: 0.5 }}
                                    className={`absolute -z-10 animate-leaf-fall hidden lg:block
                                    ${index === 0 ? '-top-10 -left-12' : ''}
                                    ${index === 1 ? '-bottom-12 left-10' : ''}
                                    ${index === 2 ? '-top-8 -right-[29px] translate-x-1/2' : ''}
                                `}
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <div className="animate-float-rotate" style={{ animationDelay: `${index * 0.5}s` }}>
                                        <Image
                                            src={index % 2 === 0
                                                ? "/unmaad-assets/events-street/branch1.svg"
                                                : "/unmaad-assets/events-street/branch2.svg"
                                            }
                                            alt="Branch"
                                            width={105}
                                            height={105}
                                            className={`w-[105px] h-[105px] object-contain
                                            ${index === 0 ? '-rotate-[35deg]' : ''}
                                            ${index === 1 ? 'rotate-[20deg]' : ''}
                                            ${index === 2 ? 'rotate-180' : ''}
                                        `}
                                        />
                                    </div>
                                </motion.div>

                                {/* Extra Random Branches */}
                                {index === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 3, duration: 0.5 }}
                                        className="absolute -z-10 -right-16 top-12 animate-leaf-fall hidden lg:block" style={{ animationDelay: '0.4s' }}>
                                        <div className="animate-float-rotate" style={{ animationDelay: '1.2s' }}>
                                            <Image
                                                src="/unmaad-assets/events-street/branch2.svg"
                                                alt="Branch"
                                                width={105}
                                                height={105}
                                                className="w-[105px] h-[105px] object-contain rotate-[70deg]"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                                {index === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 3, duration: 0.5 }}
                                        className="absolute -z-10 -top-16 -left-[75px] animate-leaf-fall hidden lg:block" style={{ animationDelay: '0.5s' }}>
                                        <div className="animate-float-rotate" style={{ animationDelay: '0.8s' }}>
                                            <Image
                                                src="/unmaad-assets/events-street/branch1.svg"
                                                alt="Branch"
                                                width={105}
                                                height={105}
                                                className="w-[105px] h-[105px] object-contain -rotate-[15deg] scale-x-[-1]"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                                {index === 2 && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 3, duration: 0.5 }}
                                            className="absolute -z-10 -bottom-10 -left-20 animate-leaf-fall hidden lg:block" style={{ animationDelay: '0.6s' }}>
                                            <div className="animate-float-rotate" style={{ animationDelay: '2.5s' }}>
                                                <Image
                                                    src="/unmaad-assets/events-street/branch2.svg"
                                                    alt="Branch"
                                                    width={105}
                                                    height={105}
                                                    className="w-[105px] h-[105px] object-contain rotate-[100deg]"
                                                />
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 3, duration: 0.5 }}
                                            className="absolute -z-10 -left-[79px] -top-12 animate-leaf-fall hidden lg:block" style={{ animationDelay: '0.7s' }}>
                                            <div className="animate-float-rotate" style={{ animationDelay: '1.8s' }}>
                                                <Image
                                                    src="/unmaad-assets/events-street/branch1.svg"
                                                    alt="Branch"
                                                    width={105}
                                                    height={105}
                                                    className="w-[105px] h-[105px] object-contain -rotate-[20deg]"
                                                />
                                            </div>
                                        </motion.div>
                                    </>
                                )}

                                <HomeButton
                                    text={text}
                                    imageSrc={activeTab === text
                                        ? "/unmaad-assets/competition-bazaar/yellow-button.svg"
                                        : "/unmaad-assets/events-street/purple-button.svg"
                                    }
                                    textClassName={`uppercase ${baiJamjuree.className} ${activeTab === text ? 'text-black' : 'text-white -translate-x-[3px] -translate-y-[3px]'}`}
                                    shadowColor={activeTab === text ? "black" : "white"}
                                    shadowClassName={activeTab === text ? "hidden" : undefined}
                                    onClick={() => setActiveTab(text)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Window Cards Row */}
                    <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
                        {activeTab === "Proshows" && [
                            { id: 3, src: "/unmaad-assets/events-street/window3.svg", alt: "Window Card 3", link: "https://forms.gle/d3B3C25SsQ5hDWWz7" },
                            { id: 1, src: "/unmaad-assets/events-street/window.svg", alt: "Window Card 1", link: "https://www.skillboxes.com/events/seedhe-maut-unmaad-iim-s-annual-cultural-fest" },
                            { id: 2, src: "/unmaad-assets/events-street/window2.svg", alt: "Window Card 2", link: "https://www.skillboxes.com/events/seedhe-maut-unmaad-iim-s-annual-cultural-fest" }
                        ].map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group transition-transform hover:scale-[1.02] cursor-pointer"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    width={300}
                                    height={400}
                                    className="w-[246px] md:w-80 h-auto object-contain"
                                />
                                {item.id === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 3, duration: 0.5 }}
                                        className="absolute -bottom-8 -right-8 z-10 animate-float-rotate hidden md:block"
                                    >
                                        <Image
                                            src="/unmaad-assets/events-street/branch1.svg"
                                            alt="Branch Decoration"
                                            width={105}
                                            height={105}
                                            className="w-[105px] h-[105px] object-contain rotate-45"
                                        />
                                    </motion.div>
                                )}
                            </a>
                        ))}

                        {activeTab === "Comedy + poetry" && (
                            <div className="relative group transition-transform">
                                <Image
                                    src="/unmaad-assets/events-street/comedy.svg"
                                    alt="Comedy + poetry"
                                    width={300}
                                    height={400}
                                    className="w-[246px] md:w-80 h-auto object-contain"
                                />
                            </div>
                        )}

                        {activeTab === "Jam nights" && (
                            <div className="relative group transition-transform">
                                <Image
                                    src="/unmaad-assets/events-street/coming-soon.svg"
                                    alt="Coming Soon"
                                    width={300}
                                    height={400}
                                    className="w-[246px] md:w-80 h-auto object-contain"
                                />
                            </div>
                        )}
                    </div>

                    {/* Book Your Spot Buttons */}
                    {activeTab === "Proshows" && (
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center">
                            <HomeButton
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdVZix-OCNjIYhh3GbxlZ--D5vFAgx3nc55wdWLveVZ6Mm0KQ/viewform"
                                text="Book Day 2 Pass"
                                imgClassName="w-40 md:w-60 h-auto"
                                textClassName={`text-xs md:text-lg font-bold text-center px-4 ${baiJamjuree.className}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                            <HomeButton
                                href="https://www.skillboxes.com/events/seedhe-maut-unmaad-iim-s-annual-cultural-fest"
                                text="Book Day 3 pass"
                                imgClassName="w-40 md:w-60 h-auto"
                                textClassName={`text-xs md:text-lg font-bold text-center px-4 ${baiJamjuree.className}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        </div>
                    )}

                </div>

                {/* Bottom Strip */}
                <div className="relative z-30 w-full">
                    {/* Left Plant */}
                    <div className="absolute -bottom-[60px] left-[8%] md:left-[22%] z-10 animate-float-rotate">
                        <Image
                            src="/unmaad-assets/events-street/plant.svg"
                            alt="Plant Decoration Left"
                            width={130}
                            height={155}
                            className="w-[110px] md:w-[160px] h-auto object-contain scale-x-[-1]"
                        />
                    </div>

                    {/* Right Plant */}
                    <div className="absolute -bottom-[60px] right-[8%] md:right-[22%] z-10 animate-float-rotate" style={{ animationDelay: '1s' }}>
                        <Image
                            src="/unmaad-assets/events-street/plant.svg"
                            alt="Plant Decoration Right"
                            width={130}
                            height={155}
                            className="w-[110px] md:w-[160px] h-auto object-contain"
                        />
                    </div>

                    <div className="relative z-20">
                        <Image
                            src="/unmaad-assets/events-street/mandala-strip.svg"
                            alt="Mandala Strip Bottom"
                            width={1920}
                            height={100}
                            className="w-full h-auto object-cover block"
                        />
                    </div>
                </div>

                {/* Mobile Only Scattered Branches (Background) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none md:hidden">
                    {[
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "5%", left: "-5%", rotate: "160deg", size: 95 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "15%", right: "-8%", rotate: "-25deg", size: 105 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "32%", left: "2%", rotate: "40deg", size: 85 },
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "48%", right: "5%", rotate: "-15deg", size: 100 },
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "62%", left: "-8%", rotate: "80deg", size: 90 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "70%", right: "-5%", rotate: "130deg", size: 95 },
                    ].map((branch, i) => (
                        <div
                            key={i}
                            className="absolute z-0"
                            style={{
                                top: branch.top,
                                left: branch.left,
                                right: branch.right
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3, duration: 0.5 }}
                                className="animate-float-rotate" style={{ animationDelay: `${i * 0.3}s` }}>
                                <Image
                                    src={branch.src}
                                    alt="Branch"
                                    width={branch.size}
                                    height={branch.size}
                                    className="object-contain opacity-100"
                                    style={{
                                        width: `${branch.size}px`,
                                        height: `${branch.size}px`,
                                        transform: `rotate(${branch.rotate})`
                                    }}
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Tablet Only Scattered Branches (12 Random) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block lg:hidden">
                    {[
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "5%", left: "5%", rotate: "45deg", size: 110 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "15%", right: "8%", rotate: "-30deg", size: 120 },
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "45%", left: "10%", rotate: "135deg", size: 100 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "35%", right: "15%", rotate: "90deg", size: 115 },
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "75%", left: "35%", rotate: "-15deg", size: 105 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "85%", right: "25%", rotate: "60deg", size: 110 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "25%", left: "25%", rotate: "180deg", size: 90 },
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "8%", left: "45%", rotate: "-60deg", size: 95 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "60%", right: "5%", rotate: "20deg", size: 100 },
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "55%", left: "-2%", rotate: "75deg", size: 120 },
                        { src: "/unmaad-assets/events-street/branch2.svg", top: "90%", left: "10%", rotate: "-45deg", size: 85 },
                        { src: "/unmaad-assets/events-street/branch1.svg", top: "2%", right: "30%", rotate: "110deg", size: 115 },
                    ].map((branch, i) => (
                        <div
                            key={i}
                            className="absolute z-0"
                            style={{
                                top: branch.top,
                                left: branch.left,
                                right: branch.right
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3, duration: 0.5 }}
                                className="animate-float-rotate" style={{ animationDelay: `${i * 0.2}s` }}>
                                <Image
                                    src={branch.src}
                                    alt="Branch"
                                    width={branch.size}
                                    height={branch.size}
                                    className="object-contain"
                                    style={{
                                        width: `${branch.size}px`,
                                        height: `${branch.size}px`,
                                        transform: `rotate(${branch.rotate})`,
                                        opacity: 1
                                    }}
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsStreet;
