import Image from "next/image";
import Link from "next/link";
import HomeButton from "../../components/HomeButton";
import { Bai_Jamjuree } from 'next/font/google';

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const HeroSection = () => {
    return (
        <section className="relative flex flex-col items-center justify-center h-[80vh] pb-8 md:pb-16 text-center overflow-hidden">
            {/* Background Layer - Royal Blue */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/unmaad-assets/royal-blue.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 z-1">
                <Image
                    src="/unmaad-assets/pattern.svg"
                    alt="Pattern"
                    fill
                    className="object-cover opacity-50"
                />
            </div>

            {/* Container for the central composition */}
            <div className="relative z-10 flex flex-col items-center mt-0 md:mt-[110px] px-4">

                {/* Mobile Layout: Flower 1 at top */}
                <div className="md:hidden mb-2">
                    <Image
                        src="/unmaad-assets/hero-page/pink1.svg"
                        alt="Flower 1"
                        width={120}
                        height={120}
                        className="w-36 h-36 object-contain"
                    />
                </div>

                {/* Header Text */}
                <div className="mb-2 md:-mt-20 md:mb-2 text-center text-white font-['Century_Gothic']">
                    <p className="text-sm md:text-lg lg:text-xl tracking-wider">Annual Cultural Fest | IIM Bangalore</p>
                    <p className="text-base md:text-lg lg:text-xl font-bold">27 Feb - 1 Mar 2026</p>
                </div>

                {/* Evil Eye */}
                <div className="mb-2 md:-mb-30">
                    <Image
                        src="/unmaad-assets/hero-page/evileye.svg"
                        alt="Evil Eye"
                        width={40}
                        height={40}
                        className="w-8 h-5 md:w-17 md:h-10 object-contain"
                    />
                </div>

                {/* Desktop Layout: Main Logo & Flanking Flowers */}
                <div className="hidden md:flex items-center justify-center">

                    {/* Left Flowers (Stacked to the left edge of logo) */}
                    <div className="flex flex-col gap-0 z-0">
                        <Image
                            src="/unmaad-assets/hero-page/pink1.svg"
                            alt="Flower 1"
                            width={200}
                            height={200}
                            className="w-50 h-50 object-contain"
                        />
                        <Image
                            src="/unmaad-assets/hero-page/pink3.svg"
                            alt="Flower 3"
                            width={200}
                            height={200}
                            className="w-50 h-50 object-contain"
                        />
                    </div>

                    {/* Center Logo */}
                    <div className="z-10 -mt-10">
                        <Image
                            src="/unmaad-assets/unm.svg"
                            alt="Unmaad Logo"
                            width={500}
                            height={500}
                            className="w-180 drop-shadow-lg"
                            priority
                        />
                    </div>

                    {/* Right Flowers (Stacked to the right edge of logo) */}
                    <div className="flex flex-col gap-0 z-0">
                        <Image
                            src="/unmaad-assets/hero-page/pink2.svg"
                            alt="Flower 2"
                            width={200}
                            height={200}
                            className="w-50 h-50 object-contain"
                        />
                        <Image
                            src="/unmaad-assets/hero-page/pink4.svg"
                            alt="Flower 4"
                            width={200}
                            height={200}
                            className="w-50 h-50 object-contain"
                        />
                    </div>
                </div>

                {/* Mobile Layout: Logo only */}
                <div className="md:hidden mb-2">
                    <Image
                        src="/unmaad-assets/unm.svg"
                        alt="Unmaad Logo"
                        width={400}
                        height={400}
                        className="w-80 drop-shadow-lg"
                        priority
                    />
                </div>

                {/* Tagline */}
                <div className="mb-2 md:-mt-40 md:mb-2 relative z-20">
                    <Image
                        src="/unmaad-assets/hero-page/tag.svg"
                        alt="Tagline"
                        width={400}
                        height={500}
                        className="w-32 md:w-45 lg:w-50 h-auto object-contain"
                    />
                </div>

                {/* Mobile Layout: Flower 4 after tagline */}
                <div className="md:hidden mb-4">
                    <Image
                        src="/unmaad-assets/hero-page/pink4.svg"
                        alt="Flower 4"
                        width={120}
                        height={120}
                        className="w-36 h-36 object-contain"
                    />
                </div>

                {/* Action Buttons - Side by side on all screens */}
                <div className="flex flex-row gap-2 md:gap-7 mt-4 md:mt-12">
                    <HomeButton
                        href="https://www.skillboxes.com/events/seedhe-maut-unmaad-iim-s-annual-cultural-fest"
                        text="Book your Spot"
                        textClassName={baiJamjuree.className}
                    />
                    <HomeButton
                        href="/pages/competition-bazaar"
                        text="Enter the Street"
                        textClassName={baiJamjuree.className}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
