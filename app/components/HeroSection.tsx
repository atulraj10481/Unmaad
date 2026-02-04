import Image from "next/image";
import Link from "next/link";
import { Bai_Jamjuree } from 'next/font/google';

const baiJamjuree = Bai_Jamjuree({
    weight: '700',
    subsets: ['latin'],
});

const HeroSection = () => {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-150 pt-20 pb-16 text-center overflow-hidden">
            {/* Background Layer - Royal Blue */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/unmaad assets/royal-blue.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 z-1">
                <Image
                    src="/unmaad assets/pattern.svg"
                    alt="Pattern"
                    fill
                    className="object-cover opacity-50"
                />
            </div>

            {/* Container for the central composition */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Header Text */}
                <div className="-mt-20 mb-2 text-center text-white font-['Century_Gothic']">
                    <p className="text-lg md:text-xl tracking-wider">Annual Cultural Fest | IIM Bangalore</p>
                    <p className="text-base md:text-lg">27 Feb - 1 Mar 2026</p>
                </div>

                {/* 1. Evil Eye (Top) */}
                <div className="-mb-30">
                    <Image
                        src="/unmaad assets/evileye.svg"
                        alt="Evil Eye"
                        width={40}
                        height={40}
                        className="w-17 h-10 object-contain"
                    />
                </div>

                {/* 2. Main Logo & 3. Flanking Flowers */}
                <div className=" flex items-center justify-center">

                    {/* Left Flowers (Stacked to the left edge of logo) */}
                    <div className="flex flex-col gap-0   z-0">
                        <Image
                            src="/unmaad assets/pink1.svg"
                            alt="Flower 1"
                            width={200}
                            height={200}
                            className="w-50 h-50 object-contain"
                        />
                        <Image
                            src="/unmaad assets/pink3.svg"
                            alt="Flower 3"
                            width={200}
                            height={200}
                            className="w-50 h-50 object-contain "
                        />
                    </div>

                    {/* Center Logo */}
                    <div className="z-10 -mt-10">
                        <Image
                            src="/unmaad assets/unm.svg"
                            alt="Unmaad Logo"
                            width={500}
                            height={500}
                            className="w-1000 md:w-180 drop-shadow-lg"
                            priority
                        />
                    </div>

                    {/* Right Flowers (Stacked to the right edge of logo) */}
                    <div className="flex flex-col gap-0  z-0">
                        <Image
                            src="/unmaad assets/pink2.svg"
                            alt="Flower 2"
                            width={200}
                            height={200}
                            className="w-50 h-50 object-contain"
                        />
                        <Image
                            src="/unmaad assets/pink4.svg"
                            alt="Flower 4"
                            width={200}
                            height={200}
                            className="w-50 h-50 object-contain"
                        />
                    </div>
                </div>

                {/* 4. Tagline (Below Logo) */}
                <div className="-mt-40 mb-2 relative z-20">
                    <Image
                        src="/unmaad assets/tag.svg"
                        alt="Tagline"
                        width={400}
                        height={500}
                        className="w-45 md:w-50 h-auto object-contain"
                    />
                </div>

                {/* 5. Action Buttons (Two Home Buttons) */}
                <div className="flex gap-7 mt-12">
                    <Link href="#get-started" className="relative group block hover:scale-105 transition-transform">
                        <Image
                            src="/unmaad assets/home-button.svg"
                            alt="Book your Spot"
                            width={150}
                            height={50}
                            className="w-60 md:w-60 h-auto object-contain"
                        />
                        <span className={`absolute inset-0 flex items-center justify-center text-[#FF00A8] text-lg font-bold  ${baiJamjuree.className}`}>
                            Book your Spot
                        </span>
                    </Link>
                    <Link href="#learn-more" className="relative group block hover:scale-105 transition-transform">
                        <Image
                            src="/unmaad assets/home-button.svg"
                            alt="Enter the Street"
                            width={150}
                            height={50}
                            className="w-60 md:w-60 h-auto object-contain"
                        />
                        <span className={`absolute inset-0 flex items-center justify-center text-[#FF00A8] text-lg font-bold ${baiJamjuree.className}`}>
                            Enter the Street
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
