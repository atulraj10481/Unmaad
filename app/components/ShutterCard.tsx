"use client";

import Image from "next/image";
import { useState } from "react";

interface ShutterCardProps {
    coverImage?: string;
    contentImage?: string;
    altText?: string;
}

const ShutterCard = ({
    coverImage = "/unmaad assets/shutter.svg",
    contentImage = "/unmaad assets/shutter1.svg",
    altText = "Event details"
}: ShutterCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative w-48 h-[240px] md:w-80 md:h-[360px] cursor-pointer overflow-hidden mx-2 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* Content (In Front) */}
            <div className="absolute inset-1 z-10 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full">
                    <Image
                        src={contentImage}
                        alt={altText}
                        width={300}
                        height={300}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Shutter Cover (Behind) - Slides Up */}
            <div
                className={`absolute inset-1 z-0 flex items-center justify-center transition-transform duration-1000 ease-in-out md:-translate-x-[3px] ${isOpen ? "-translate-y-full" : "translate-y-[10px]"
                    }`}
            >
                <div className="w-[85%] h-[70%]">
                    <Image
                        src={coverImage}
                        alt="Shutter"
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
