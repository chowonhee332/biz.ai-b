import React from "react";
import { motion } from "motion/react";

export const LightRays = ({ className }: { className?: string }) => {
    return (
        <div
            className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
        >
            <svg
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-60"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="ray-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[...Array(12)].map((_, i) => (
                    <motion.path
                        key={i}
                        d={`M 50 0 L ${20 + i * 5} 100 L ${25 + i * 5} 100 Z`}
                        fill="url(#ray-grad)"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            x: [Math.random() * 5 - 2, Math.random() * 5 - 2],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F3F5FC]" />
        </div>
    );
};
