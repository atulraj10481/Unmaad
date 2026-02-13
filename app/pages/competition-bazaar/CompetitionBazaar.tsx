"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Bai_Jamjuree } from 'next/font/google';
import HomeButton from "../../components/HomeButton";

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const danceTitles = [
    { title: "Footloose", link: "https://unstop.com/events/footloose-group-dance-competition-unmaad-2026-iim-bangalore-1625340", image: "/unmaad-assets/competition-bazaar/comps/Footloose1.jpg" },
    { title: "Echoes of Heritage", link: "https://unstop.com/events/echoes-of-heritage-group-classical-folk-dance-unmaad-2026-iim-bangalore-1625333", image: "/unmaad-assets/competition-bazaar/comps/Echoes of heritage1.jpg" },
    { title: "Soul N Sync", link: "https://unstop.com/events/soul-nsync-solo-duet-dance-unmaad-2026-iim-bangalore-1625318", image: "/unmaad-assets/competition-bazaar/comps/SoulNSync1.jpg" },
    { title: "Street Unleashed", link: "https://unstop.com/events/street-unleashed-dance-battle-face-off-unmaad-2026-iim-bangalore-1625341", image: "/unmaad-assets/competition-bazaar/comps/Street Unleashed1.jpg" }
];

const musicTitles = [
    { title: "Voice of Unmaad", link: "https://unstop.com/events/voice-of-unmaad-solo-singing-unmaad-2026-iim-bangalore-1625461", image: "/unmaad-assets/competition-bazaar/comps/voiceofunmaad1.jpg" },
    { title: "Gully Rap", link: "https://unstop.com/events/rap-sody-solo-rap-event-unmaad-2026-iim-bangalore-1625508", image: "/unmaad-assets/competition-bazaar/comps/gullyrap1.jpg" },
    { title: "Battle of Bands", link: "https://unstop.com/events/b-school-of-rock-battle-of-bands-unmaad-2026-iim-bangalore-1625518", image: "/unmaad-assets/competition-bazaar/comps/battleofbands1.jpg" }
];

const dramaTitles = [
    { title: "Aahwan", link: "https://unstop.com/events/aahwan-the-street-play-unmaad-2026-iim-bangalore-1625715", image: "/unmaad-assets/competition-bazaar/comps/aahwan1.jpg" },
    { title: "Drishya", link: "https://unstop.com/events/drishya-short-film-competition-unmaad-2026-iim-bangalore-1625781", image: "/unmaad-assets/competition-bazaar/comps/drishya1.jpg" },
    { title: "Spotlight", link: "https://unstop.com/events/spotlight-mono-acting-competition-unmaad-2026-iim-bangalore-1625812", image: "/unmaad-assets/competition-bazaar/comps/spotlight1.jpg" },
    { title: "Curtain Call", link: "https://unstop.com/events/curtain-call-stage-play-event-unmaad-2026-iim-bangalore-1625713", image: "/unmaad-assets/competition-bazaar/comps/curtaincall1.jpg" }
];

const informalsTitles = [
    { title: "Food Wars", link: "https://unstop.com/events/food-wars-khao-toh-jaane-unmaad-2026-iim-bangalore-1625483", image: "/unmaad-assets/competition-bazaar/comps/foodwars1.jpg" },
    { title: "Treasure Hunt", link: "https://unstop.com/events/treasure-hunt-kho-gaye-hum-kahan-unmaad-2026-iim-bangalore-1625251", image: "/unmaad-assets/competition-bazaar/comps/treasurehunt1.jpg" },
    { title: "Mr. & Ms. Unmaad", link: "https://unstop.com/events/mr-ms-unmaad-unmaad-2026-iim-bangalore-1625492", image: "/unmaad-assets/competition-bazaar/comps/mrandmsunmaad1.jpg" },
    { title: "Mic Drop", link: "https://unstop.com/events/mic-drop-humor-us-we-dare-you-unmaad-2026-iim-bangalore-1625449", image: "/unmaad-assets/competition-bazaar/comps/micdrop1.jpg" }
];

const fashionTitles = [
    { title: "Haute Couture", link: "https://unstop.com/events/haute-couture-indias-biggest-b-school-fashion-show-unmaad-2026-iim-bangalore-1624726", image: "/unmaad-assets/competition-bazaar/comps/hautecouture1.jpg" },
    { title: "Cosplay", link: "https://unstop.com/events/metamorph-a-cosplay-event-unmaad-2026-iim-bangalore-1625008", image: "/unmaad-assets/competition-bazaar/comps/cosplay1.jpg" },
    { title: "Group Canvas", link: "https://unstop.com/events/canvas-collective-group-painting-event-unmaad-2026-iim-bangalore-1624991", image: "/unmaad-assets/competition-bazaar/comps/groupcanvas1.jpg" },
    { title: "Photography", link: "https://unstop.com/events/frames-of-streets-photography-event-unmaad-2026-iim-bangalore-1624994", image: "/unmaad-assets/competition-bazaar/comps/photography1.jpg" },
    { title: "Junk art", link: "https://unstop.com/events/beauty-in-the-broken-a-junk-art-event-unmaad-2026-iim-bangalore-1625030", image: "/unmaad-assets/competition-bazaar/comps/junkart1.jpg" }
];

const litsTitles = [
    { title: "Shabdsaga", link: "https://unstop.com/events/shabd-saga-a-hindi-and-urdu-poetry-competition-unmaad-2026-iim-bangalore-1625309", image: "/unmaad-assets/competition-bazaar/comps/shabdsaga1.jpg" },
    { title: "Just a Minute (JAM)", link: "https://unstop.com/p/just-a-minute-60-second-spotlight-unmaad-2026-iim-bangalore-1625265", image: "/unmaad-assets/competition-bazaar/comps/Jam1.jpg" },
    { title: "Unmaad Quiz", link: "https://unstop.com/events/the-unmaad-quiz-general-open-quiz-unmaad-2026-iim-bangalore-1625490", image: "/unmaad-assets/competition-bazaar/comps/unmaadquiz1.jpg" },
    { title: "Pop Culture Quiz", link: "https://unstop.com/events/once-upon-a-time-in-pop-culture-entertainment-quiz-unmaad-2026-iim-bangalore-1625503", image: "/unmaad-assets/competition-bazaar/comps/popculture1.jpg" }
];

const onlineTitles = [
    { title: "Virtual Expedition", link: "https://unstop.com/events/virtual-expedition-unmaad-2026-iim-bangalore-1625394", image: "/unmaad-assets/competition-bazaar/comps/virtualexpedition1.jpg" },
    { title: "Street Anthem Challenge", link: "https://unstop.com/events/street-anthem-challenge-unmaad-2026-iim-bangalore-1625186", image: "/unmaad-assets/competition-bazaar/comps/streetanthem1.jpg" }
];

interface CardFrameProps {
    className?: string;
    style?: React.CSSProperties;
    title?: string | null;
    link?: string;
    image?: string;
    decoration?: 'deco1' | 'deco2' | null;
    flipDecoration?: boolean;
}

const CardFrame = ({ className, style, title, link, image, decoration, flipDecoration }: CardFrameProps) => {
    const handleClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <div
            className={`relative ${className?.includes('absolute') ? '' : 'relative'} ${link ? 'cursor-pointer' : ''} ${className || ''}`}
            onClick={handleClick}
            style={style}
        >
            <Image
                src="/unmaad-assets/competition-bazaar/wind.svg"
                alt="Frame"
                width={210}
                height={210}
                className="w-full h-full object-contain"
            />
            {image && (
                <div
                    className={`absolute top-[calc(50%+22px)] md:top-[calc(50%+31px)] lg:top-[calc(50%+38px)] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none ${className?.includes('invisible') ? 'hidden' : ''} w-[73%] h-[62%]`}
                >
                    <Image
                        src={image}
                        alt={title || "Card Image"}
                        fill
                        className="object-contain"
                    />
                </div>
            )}
            {title && (
                <div
                    className={`absolute top-[calc(12%-5px)] md:top-[calc(12%-10px)] left-1/2 -translate-x-1/2 w-[70%] text-center z-40 pointer-events-none ${className?.includes('invisible') ? 'hidden' : ''}`}
                >
                    <span className={`${baiJamjuree.className} text-black font-bold leading-tight block`} style={{ fontSize: 'clamp(8px, 1.2vw, 14px)' }}>
                        {title}
                    </span>
                </div>
            )}
            {decoration === 'deco1' && (
                <Image
                    src="/unmaad-assets/competition-bazaar/frame-deco1.svg"
                    alt="Frame Decoration"
                    width={150}
                    height={70}
                    className={`absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-[85%] h-auto z-40 object-contain pointer-events-none transition-transform duration-300 ${flipDecoration ? '-ml-2 md:-ml-4 scale-x-[-1]' : ''}`}
                // Note: Hover state was complex to replicate inside here without more state or specific parent classes, 
                // but usually the interaction was on the frame. If the frame scales, this absolute child scales with it if contained?
                // Actually previous code had them separate but sibling. 
                // Let's keep it simple: if the parent (this div) scales, everything inside scales.
                // The previous code scaled the *Image* (wind.svg) on hover, and the deco separately.
                // To keep the exact effect, we might need the hover on the parent div to affect children.
                // Tailwind group-hover? Yes, let's add group to container.
                />
            )}
            {decoration === 'deco2' && (
                <Image
                    src="/unmaad-assets/competition-bazaar/frame-deco2.svg"
                    alt="Frame Decoration 2"
                    width={150}
                    height={70}
                    className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-[38%] h-auto z-40 object-contain pointer-events-none"
                />
            )}
        </div>
    );
};

const CompetitionBazaar = () => {
    const [activeTab, setActiveTab] = useState<string | null>("Dance");
    const [scrollOffset, setScrollOffset] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const getCardData = (index: number) => {
        if (activeTab === "Dance" && index < danceTitles.length) {
            return danceTitles[index];
        } else if (activeTab === "Music" && index < musicTitles.length) {
            return musicTitles[index];
        } else if (activeTab === "Dramas" && index < dramaTitles.length) {
            return dramaTitles[index];
        } else if (activeTab === "Informals" && index < informalsTitles.length) {
            return informalsTitles[index];
        } else if (activeTab === "Fashion & Fine arts" && index < fashionTitles.length) {
            return fashionTitles[index];
        } else if (activeTab === "Lits & Quizzes" && index < litsTitles.length) {
            return litsTitles[index];
        } else if (activeTab === "Online" && index < onlineTitles.length) {
            return onlineTitles[index];
        }
        return { title: null, link: undefined, image: undefined };
    };

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const sectionTop = sectionRef.current.offsetTop;
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const relativeScroll = scrollY + windowHeight - sectionTop;

                if (relativeScroll > 0) {
                    setScrollOffset(relativeScroll);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#E5AA38]"> {/* Fallback yellow color */}
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
                        Competition Bazaar
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative w-full min-h-[40vh] flex flex-col justify-between overflow-hidden">
                {/* Background Layer */}
                <div
                    className="absolute inset-0 z-0 bg-[#E5AA38]"
                    style={{
                        backgroundImage: "url('/unmaad-assets/competition-bazaar/yellow-bg.png')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "auto",
                        backgroundPosition: "top center"
                    }}
                >
                    {/* Pattern Overlay */}
                    <div
                        className="absolute inset-0 z-10 opacity-50 pointer-events-none"
                        style={{
                            backgroundImage: "url('/unmaad-assets/pattern.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "auto",
                            backgroundPosition: "top center"
                        }}
                    />
                </div>

                {/* Top Strip */}
                <div className="relative z-30 w-full transform rotate-180">
                    <Image
                        src="/unmaad-assets/competition-bazaar/yellow-strip.svg"
                        alt="Yellow Strip Top"
                        width={1920}
                        height={100}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Content Area */}
                <div className="relative z-20 flex-grow flex flex-col items-center justify-center py-10 px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 max-w-6xl">
                        {["Dance", "Dramas", "Music", "Informals", "Fashion & Fine arts", "Lits & Quizzes", "Online"].map((text, index) => (
                            <div
                                key={index}
                                className={`relative flex justify-center ${index === 6 ? 'col-span-2 lg:col-span-3' : ''}`}
                            >
                                <HomeButton
                                    text={text}
                                    imageSrc={activeTab === text
                                        ? "/unmaad-assets/competition-bazaar/yellow-button.svg"
                                        : "/unmaad-assets/events-street/purple-button.svg"
                                    }
                                    imgWidth={250}
                                    imgHeight={90}
                                    imgClassName="w-40 md:w-60 h-auto"
                                    textClassName={`text-[9px] md:text-xs lg:text-[15px] font-bold text-center px-6 uppercase ${baiJamjuree.className} leading-tight ${activeTab === text ? 'text-black' : 'text-white -translate-y-[5%]'}`}
                                    shadowColor={activeTab === text ? "black" : "white"}
                                    shadowClassName={activeTab === text ? "hidden" : undefined}
                                    onClick={() => setActiveTab(text)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Buildings Section (Desktop Only) */}
                    <div className="hidden lg:flex flex-col items-center gap-[18px] md:gap-[26px] mt-24 mb-24 w-full">
                        {/* Row 1 */}
                        <div className="relative flex justify-center gap-14 md:gap-36 w-full">
                            {/* Middle Frame */}
                            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-20 translate-y-[15%] group">
                                <CardFrame
                                    key={activeTab}
                                    title={getCardData(1).title} // Echoes
                                    link={getCardData(1).link}
                                    image={getCardData(1).image}
                                    decoration="deco2"
                                    className="w-[9.5rem] md:w-[19.1rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer animate-slide-in-bottom"
                                    style={{ animationDelay: '0.1s' }}
                                />
                            </div>

                            {[1, 2].map((i) => (
                                <div key={`row1-${i}`} className="relative flex justify-center">
                                    <Image
                                        src="/unmaad-assets/competition-bazaar/building.svg"
                                        alt="Building"
                                        width={400}
                                        height={400}
                                        className="w-72 md:w-[30rem] h-auto object-contain relative z-10"
                                    />
                                    {/* Building Frame */}
                                    <div className={`absolute bottom-[40px] z-20 translate-y-[15%] group ${activeTab === 'Online' && i === 2 ? 'invisible' : ''}`}>
                                        <CardFrame
                                            key={activeTab}
                                            title={i === 1 ? getCardData(0).title : getCardData(2).title}
                                            link={i === 1 ? getCardData(0).link : getCardData(2).link}
                                            image={i === 1 ? getCardData(0).image : getCardData(2).image}
                                            decoration="deco1"
                                            flipDecoration={i === 2}
                                            className="w-[9.5rem] md:w-[19.1rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer animate-slide-in-bottom"
                                            style={{ animationDelay: i === 1 ? '0s' : '0.2s' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Parallax Carts between rows */}
                        <div className="relative w-full h-24 md:h-32 -my-8 z-50 pointer-events-none overflow-visible">
                            {/* Standard Cart - Moves Left */}
                            <div
                                className="absolute left-[15%] md:left-[28%] -top-[15px] -ml-[20px] transition-transform duration-100 ease-out"
                                style={{ transform: `translateX(calc(-50px + ${scrollOffset * -0.1}px))` }}
                            >
                                <Image
                                    src="/unmaad-assets/hero-page/cart.svg"
                                    alt="Cart"
                                    width={150}
                                    height={120}
                                    className="w-[4.4rem] md:w-[10rem] h-auto object-contain"
                                />
                            </div>

                            {/* Blue Cart - Moves Right */}
                            <div
                                className="absolute right-[5%] md:right-[18%] -top-[80px] mr-[40px] transition-transform duration-100 ease-out"
                                style={{ transform: `translateX(calc(50px + ${scrollOffset * 0.1}px))` }}
                            >
                                <Image
                                    src="/unmaad-assets/competition-bazaar/blue-cart.svg"
                                    alt="Blue Cart"
                                    width={150}
                                    height={120}
                                    className="w-[4.5rem] md:w-[10.8rem] h-auto object-contain"
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className={`relative flex justify-center gap-14 md:gap-36 w-full ${activeTab === 'Music' || activeTab === 'Online' ? 'hidden' : ''}`}>
                            {/* Middle Frame */}
                            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-20 translate-y-[15%] group">
                                <CardFrame
                                    key={activeTab}
                                    title={getCardData(3).title}
                                    link={getCardData(3).link}
                                    image={getCardData(3).image}
                                    decoration="deco2"
                                    className="w-[9.5rem] md:w-[19.1rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer animate-slide-in-bottom"
                                    style={{ animationDelay: '0.4s' }}
                                />
                            </div>

                            {[1, 2].map((i) => (
                                <div key={`row2-${i}`} className="relative flex justify-center">
                                    <Image
                                        src="/unmaad-assets/competition-bazaar/building.svg"
                                        alt="Building"
                                        width={400}
                                        height={400}
                                        className="w-72 md:w-[30rem] h-auto object-contain relative z-10"
                                    />
                                    {/* Building Frame */}
                                    <div className={`absolute bottom-[40px] z-20 translate-y-[15%] ${(['Dance', 'Dramas', 'Informals', 'Lits & Quizzes'].includes(activeTab || '')) || (activeTab === 'Fashion & Fine arts' && i !== 1) ? 'hidden' : ''
                                        }`}>
                                        <CardFrame
                                            key={activeTab}
                                            title={activeTab === 'Fashion & Fine arts' && i === 1 ? getCardData(4).title : null}
                                            link={activeTab === 'Fashion & Fine arts' && i === 1 ? getCardData(4).link : undefined}
                                            image={activeTab === 'Fashion & Fine arts' && i === 1 ? getCardData(4).image : undefined}
                                            className={`w-[9.5rem] md:w-[19.1rem] h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer animate-slide-in-bottom ${i === 2 ? 'invisible' : ''}`}
                                            style={{ animationDelay: i === 1 ? '0.3s' : '0.5s' }}
                                        />
                                        <Image
                                            src="/unmaad-assets/competition-bazaar/frame-deco1.svg"
                                            alt="Frame Decoration"
                                            width={150}
                                            height={70}
                                            className={`absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-[85%] h-auto object-contain pointer-events-none transition-transform duration-300 ${i === 2 ? '-ml-2 md:-ml-4 scale-x-[-1] hover:scale-x-[-1.05] hover:scale-y-[1.05]' : 'hover:scale-105'}`}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Blue Cart - Below Row 2, Moves Right different speed */}
                            <div
                                className="absolute left-[15%] md:left-[28%] -bottom-[80px] -ml-[80px] z-50 transition-transform duration-100 ease-out"
                                style={{ transform: `translateX(calc(-50px + ${scrollOffset * 0.075}px))` }}
                            >
                                <Image
                                    src="/unmaad-assets/competition-bazaar/blue-cart.svg"
                                    alt="Blue Cart"
                                    width={150}
                                    height={120}
                                    className="w-[4.5rem] md:w-[10.8rem] h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buildings Section (Mobile & Tablet) */}
                    <div className="flex lg:hidden flex-col items-center w-full gap-8 md:gap-20 my-8 md:my-16 relative">
                        <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-4 md:gap-y-8 w-full max-w-sm md:max-w-4xl px-4 md:px-8">
                            {/* Frame 1 (With Building) */}
                            <div className="relative flex justify-center items-end">
                                <Image
                                    src="/unmaad-assets/competition-bazaar/building.svg"
                                    alt="Building"
                                    width={400}
                                    height={400}
                                    className="w-[33rem] md:w-[20rem] h-auto object-contain relative z-10"
                                />
                                <div className="absolute bottom-[20px] md:bottom-[40px] z-20 translate-y-[15%] group">
                                    <CardFrame
                                        key={activeTab}
                                        title={getCardData(0).title}
                                        link={getCardData(0).link}
                                        image={getCardData(0).image}
                                        className="w-[9.7rem] md:w-[13rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer animate-slide-in-bottom"
                                        style={{ animationDelay: '0s' }}
                                    />
                                </div>
                            </div>

                            {/* Frame 2 (+ Deco 2) */}
                            <div className="relative flex justify-center items-end pb-[20px] md:pb-[40px]">
                                <div className="relative z-20 translate-y-[15%] group">
                                    <CardFrame
                                        key={activeTab}
                                        title={getCardData(1).title}
                                        link={getCardData(1).link}
                                        image={getCardData(1).image}
                                        decoration="deco2"
                                        className="w-[9.7rem] md:w-[13rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer animate-slide-in-bottom"
                                        style={{ animationDelay: '0.1s' }}
                                    />
                                    {/* Static Cart - Bottom Right, moving right -> Parallax Moving Left */}
                                    <div
                                        className="absolute -bottom-4 md:-bottom-6 -right-8 md:-right-12 z-30 transition-transform duration-100 ease-out"
                                        style={{ transform: `translateX(calc(0px + ${scrollOffset * -0.075}px))` }}
                                    >
                                        <Image
                                            src="/unmaad-assets/hero-page/cart.svg"
                                            alt="Cart"
                                            width={150}
                                            height={120}
                                            className="w-16 md:w-24 h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Frame 3 (+ Deco 1) */}
                            <div className={`relative flex justify-center items-end pb-[20px] md:pb-[40px] ${activeTab === 'Online' ? 'hidden' : ''}`}>
                                <div className="relative z-20 translate-y-[15%] group">
                                    <CardFrame
                                        key={activeTab}
                                        title={getCardData(2).title}
                                        link={getCardData(2).link}
                                        image={getCardData(2).image}
                                        decoration="deco1"
                                        flipDecoration={true}
                                        className="w-[9.7rem] md:w-[13rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer animate-slide-in-bottom"
                                        style={{ animationDelay: '0.2s' }}
                                    />
                                    {/* Static Blue Cart - Bottom Left, moving left -> Parallax Moving Right */}
                                    <div
                                        className="absolute -bottom-4 md:-bottom-6 -left-8 md:-left-12 z-30 transition-transform duration-100 ease-out"
                                        style={{ transform: `translateX(calc(0px + ${scrollOffset * 0.075}px))` }}
                                    >
                                        <Image
                                            src="/unmaad-assets/competition-bazaar/blue-cart.svg"
                                            alt="Blue Cart"
                                            width={150}
                                            height={120}
                                            className="w-16 md:w-24 h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Frame 4 (With Building) */}
                            <div className={`relative flex justify-center items-end ${activeTab === 'Music' || activeTab === 'Online' ? 'hidden' : ''}`}>
                                <Image
                                    src="/unmaad-assets/competition-bazaar/building.svg"
                                    alt="Building"
                                    width={400}
                                    height={400}
                                    className="w-[22rem] md:w-[20rem] h-auto object-contain relative z-10"
                                />
                                <div className="absolute bottom-[20px] md:bottom-[40px] z-20 translate-y-[15%] group">
                                    <CardFrame
                                        key={activeTab}
                                        title={getCardData(3).title}
                                        link={getCardData(3).link}
                                        image={getCardData(3).image}
                                        className="w-[9.7rem] md:w-[13rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer animate-slide-in-bottom"
                                        style={{ animationDelay: '0.3s' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Frame 5 (Centered + Deco 2) */}
                        {activeTab !== 'Dance' && activeTab !== 'Music' && activeTab !== 'Dramas' && activeTab !== 'Informals' && activeTab !== 'Lits & Quizzes' && activeTab !== 'Online' && (
                            <div className="relative flex justify-center mt-[2px] md:-mt-[6px] md:hidden">
                                <div className="relative z-20 group">
                                    <CardFrame
                                        key={activeTab}
                                        title={getCardData(4).title}
                                        link={getCardData(4).link}
                                        image={getCardData(4).image}
                                        decoration="deco2"
                                        className="w-[9.7rem] md:w-[13rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer animate-slide-in-bottom"
                                        style={{ animationDelay: '0.4s' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Enter the Street Button */}
                    <HomeButton
                        className="mt-4 md:mt-8 lg:mt-12 drop-shadow-xl"
                        text="Enter the Street"
                        textClassName={baiJamjuree.className}
                        shadowColor="black"
                        onClick={() => { }} // Optional: handle click if needed
                    />
                </div>

                {/* Bottom Strip */}
                <div className="relative z-30 w-full">
                    <Image
                        src="/unmaad-assets/competition-bazaar/yellow-strip.svg"
                        alt="Yellow Strip Bottom"
                        width={1920}
                        height={100}
                        className="w-full h-auto object-cover block"
                    />
                </div>
            </div>
        </section>
    );
};

export default CompetitionBazaar;
