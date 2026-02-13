"use client";

import Image from "next/image";
import { useState } from "react";

interface ShutterCardProps {
    coverImage?: string;
    contentImage?: string;
    altText?: string;
}

const ShutterCard = ({
    coverImage = "/unmaad-assets/hero-page/shutter.svg",
    contentImage = "/unmaad-assets/hero-page/shutter1.svg",
    posterImage = "/unmaad-assets/hero-page/poster1.png",
    altText = "Event details"
}: ShutterCardProps & { posterImage?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative w-72 h-[370px] md:w-80 md:h-[370px] cursor-pointer overflow-hidden mx-2 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* Frame/Content (On Top) */}
            <div className="absolute inset-1 z-20 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full">
                    <Image
                        src={contentImage}
                        alt="Frame"
                        width={300}
                        height={300}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Shutter Cover (Middle) - Slides Up */}
            <div
                className={`absolute inset-1 z-10 flex items-center justify-center transition-all duration-1000 ease-in-out md:-translate-x-[3px] ${isOpen ? "-translate-y-[120%] opacity-0" : "translate-y-[10px] md:translate-y-[10px] opacity-100"
                    }`}
            >
                <div className="w-[85%] h-[60%]">
                    <Image
                        src={coverImage}
                        alt="Shutter"
                        width={300}
                        height={300}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Poster (Bottom) - Revealed when shutter opens */}
            <div className="absolute inset-1 z-0 flex items-center justify-center">
                <div className="w-[calc(80%+10px)] md:w-[80%] h-[50%] translate-y-[8px] md:translate-y-[18px] translate-x-[5px] md:translate-x-0">
                    <Image
                        src={posterImage}
                        alt="Poster"
                        width={300}
                        height={300}
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default ShutterCard;
