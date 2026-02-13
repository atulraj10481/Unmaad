"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 dark:bg-white dark:border-gray-200 font-century-gothic">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">

                    {/* Left Side: IIMB & Address */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 flex-1">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 transition-all">
                            <Image
                                src="/unmaad-assets/IIMB.svg"
                                alt="IIM Bangalore"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className="text-black font-semibold text-lg mb-2">
                                Proudly hosted at IIM Bangalore
                            </h3>
                            <p className="text-gray-600 text-sm max-w-xs">
                                Indian Institute of Management Bangalore, Bannerghatta Road, Bengaluru - 560 076, India
                            </p>
                        </div>
                    </div>

                    {/* Right Side: UnmaadV & Contact */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1 justify-center md:justify-end">
                        {/* Image on the left of text (on desktop) / Top of text (on mobile) */}
                        <div className="relative w-24 h-24 md:w-30 md:h-30 shrink-0 transition-all">
                            <Image
                                src="/unmaad-assets/UnmaadV.svg"
                                alt="Unmaad"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Content on the right of image */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="flex flex-col mb-4 text-sm text-gray-700 items-center md:items-start">
                                <span className="font-semibold mb-1">Email:</span>

                                <a
                                    href="mailto:UnmaadIIMB.Cultural"
                                    className="text-black hover:underline"
                                >
                                    UnmaadIIMB.Cultural
                                </a>
                                <a
                                    href="mailto:CulturalFestival@iimb.ac.in"
                                    className="text-black hover:underline"
                                >
                                    Festival@iimb.ac.in
                                </a>

                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-4">
                                <Link href="https://www.instagram.com/unmaad_iimb/" className="text-gray-500 hover:text-[#FF00A8] transition-colors">
                                    <Instagram size={24} />
                                </Link>
                                <Link href="https://www.facebook.com/unmaad.iimb/" className="text-gray-500 hover:text-blue-600 transition-colors">
                                    <Facebook size={24} />
                                </Link>
                                <Link href="https://www.youtube.com/@unmaad_iimb" className="text-gray-500 hover:text-red-600 transition-colors">
                                    <Youtube size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-6 pt-4 border-t border-gray-300 flex flex-col md:flex-row justify-center items-center gap-4">
                    <p className="text-center text-sm text-gray-500">
                        © 2026 Unmaad. All rights reserved.
                    </p>

                    {/* Center: Powered by Wictronix */}
                    <div className="flex justify-center">
                        <a
                            href="https://www.wictronix.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors text-xs"
                        >
                            <span>Powered by</span>
                            <img
                                src="/wxlogo.png"
                                alt="Wictronix"
                                className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
