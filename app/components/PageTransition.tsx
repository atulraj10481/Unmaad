"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Define the order of pages for directional logic
const pageOrder = [
    "/",                        // Home: Index 0
    "/pages/events-street",     // events-street: Index 1
    "/pages/competition-bazaar" // competition-bazaar: Index 2
];

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState(pathname);

    useEffect(() => {
        if (pathname !== prevPathname) {
            setPrevPathname(pathname);
        }
    }, [pathname, prevPathname]);

    // Scroll to top on route change, but respect hash links
    useEffect(() => {
        // Only scroll to top if there's no hash (anchor link)
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    // Get indices to determine direction
    const currentIndex = pageOrder.indexOf(pathname);
    const prevIndex = pageOrder.indexOf(prevPathname);

    // Determine direction: 1 for Right-to-Left (Next), -1 for Left-to-Right (Prev)
    // If route is not in map (e.g. 404), default to 0 or maintain direction
    let direction = 0;
    if (currentIndex !== -1 && prevIndex !== -1 && currentIndex !== prevIndex) {
        direction = currentIndex > prevIndex ? 1 : -1;
    }

    // Variants for the animation
    const variants: Variants = {
        enter: {
            y: "100%", // Enter from Bottom (offscreen positive Y)
            x: 0,
            zIndex: 10,
            opacity: 1,
        },
        center: {
            y: 0,
            x: 0,
            zIndex: 10, // Stay on top
            opacity: 1,
        },
        exit: {
            y: 0, // Stay static (no movement) acting as background
            x: 0,
            zIndex: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        },
    };

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
                key={pathname}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    y: { type: "tween", ease: "easeInOut", duration: 0.5 }, // Faster (0.5s)
                    opacity: { duration: 0.5 }
                }}
                className="w-full min-h-screen absolute top-0 left-0 bg-[#3033C8]" // Added bg color fallback
                style={{
                    position: 'absolute',
                    width: '100%',
                    minHeight: '100vh',
                    top: 0,
                    left: 0
                }}
            >
                {/*
                  Add a padding-top equal to Navbar height because Navbar is fixed/sticky in Layout.
                  However, existing pages might already account for this or have their own containers.
                  Since we are hoisting Navbar, it will sit *above* this PageTransition.
                  If Navbar is sticky in Layout, this div starts at top:0 underneath it?
                  Or if Navbar is in flow?
                  
                  Let's assume Navbar is sticky and has z-index.
                  We need to ensure this container is properly positioned context.
                */}
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
